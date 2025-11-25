#!/usr/bin/env python3
"""
Convert MySQL dump to PostgreSQL format
"""
import re
import sys

def convert_mysql_to_postgresql(input_file, output_file):
    """Convert MySQL dump to PostgreSQL"""
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove MySQL-specific comments and commands
    content = re.sub(r'/\*!.*?\*/;', '', content, flags=re.DOTALL)
    content = re.sub(r'/\*!.*?\*/', '', content)
    
    # Remove LOCK TABLES and UNLOCK TABLES
    content = re.sub(r'LOCK TABLES.*?;', '', content, flags=re.IGNORECASE)
    content = re.sub(r'UNLOCK TABLES;', '', content, flags=re.IGNORECASE)
    
    # Remove ALTER TABLE DISABLE/ENABLE KEYS
    content = re.sub(r'ALTER TABLE.*?(DISABLE|ENABLE) KEYS;', '', content, flags=re.IGNORECASE)
    
    # Remove ENGINE, CHARSET, COLLATE, ROW_FORMAT from CREATE TABLE
    content = re.sub(r'\s*ENGINE\s*=\s*\w+', '', content, flags=re.IGNORECASE)
    content = re.sub(r'\s*DEFAULT\s+CHARSET\s*=\s*\w+', '', content, flags=re.IGNORECASE)
    content = re.sub(r'\s*COLLATE\s*=\s*\w+', '', content, flags=re.IGNORECASE)
    content = re.sub(r'\s*ROW_FORMAT\s*=\s*\w+', '', content, flags=re.IGNORECASE)
    
    # Remove backticks
    content = content.replace('`', '"')
    
    # Convert AUTO_INCREMENT to SERIAL
    # Pattern: id int(X) NOT NULL AUTO_INCREMENT
    content = re.sub(
        r'"(\w+)"\s+int\(\d+\)\s+NOT NULL\s+AUTO_INCREMENT',
        r'"\1" SERIAL',
        content,
        flags=re.IGNORECASE
    )
    
    # Convert int(X) to INTEGER
    content = re.sub(r'\bint\(\d+\)\b', 'INTEGER', content, flags=re.IGNORECASE)
    content = re.sub(r'\btinyint\(\d+\)\b', 'SMALLINT', content, flags=re.IGNORECASE)
    content = re.sub(r'\bbigint\(\d+\)\b', 'BIGINT', content, flags=re.IGNORECASE)
    
    # Convert varchar to VARCHAR (case consistency)
    content = re.sub(r'\bvarchar\b', 'VARCHAR', content, flags=re.IGNORECASE)
    
    # Convert text types
    content = re.sub(r'\btext\b', 'TEXT', content, flags=re.IGNORECASE)
    content = re.sub(r'\blongtext\b', 'TEXT', content, flags=re.IGNORECASE)
    content = re.sub(r'\bmediumtext\b', 'TEXT', content, flags=re.IGNORECASE)
    
    # Convert datetime to TIMESTAMP
    content = re.sub(r'\bdatetime\b', 'TIMESTAMP', content, flags=re.IGNORECASE)
    
    # Convert double to DOUBLE PRECISION
    content = re.sub(r'\bdouble\b', 'DOUBLE PRECISION', content, flags=re.IGNORECASE)
    
    # Convert enum - PostgreSQL doesn't have enum in the same way, convert to VARCHAR
    # This is a simplified conversion - ideally we'd create ENUM types
    content = re.sub(
        r'enum\([^)]+\)',
        'VARCHAR(50)',
        content,
        flags=re.IGNORECASE
    )
    
    # Remove COLLATE from column definitions
    content = re.sub(r'\s+COLLATE\s+\w+', '', content, flags=re.IGNORECASE)
    
    # Convert DEFAULT CURRENT_TIMESTAMP to DEFAULT CURRENT_TIMESTAMP
    # (already compatible, but ensure consistency)
    content = re.sub(
        r'DEFAULT\s+CURRENT_TIMESTAMP\s+ON\s+UPDATE\s+CURRENT_TIMESTAMP',
        'DEFAULT CURRENT_TIMESTAMP',
        content,
        flags=re.IGNORECASE
    )
    
    # Fix KEY definitions - PostgreSQL uses CREATE INDEX separately
    # Remove KEY lines from CREATE TABLE (we'll handle indexes separately)
    lines = content.split('\n')
    new_lines = []
    in_create_table = False
    
    for line in lines:
        if 'CREATE TABLE' in line.upper():
            in_create_table = True
            new_lines.append(line)
        elif in_create_table and line.strip().startswith(');'):
            in_create_table = False
            new_lines.append(line)
        elif in_create_table and (line.strip().upper().startswith('KEY ') or 
                                   line.strip().upper().startswith('UNIQUE KEY ') or
                                   line.strip().upper().startswith('INDEX ')):
            # Skip KEY/INDEX definitions inside CREATE TABLE
            continue
        else:
            new_lines.append(line)
    
    content = '\n'.join(new_lines)
    
    # Clean up trailing commas before closing parenthesis
    content = re.sub(r',\s*\n\s*\)', '\n)', content)
    
    # Convert DROP TABLE IF EXISTS to PostgreSQL format
    content = re.sub(
        r'DROP TABLE IF EXISTS "(\w+)";',
        r'DROP TABLE IF EXISTS "\1" CASCADE;',
        content,
        flags=re.IGNORECASE
    )
    
    # Add IF NOT EXISTS to CREATE TABLE (safer)
    content = re.sub(
        r'CREATE TABLE "(\w+)"',
        r'CREATE TABLE IF NOT EXISTS "\1"',
        content,
        flags=re.IGNORECASE
    )
    
    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        # Add PostgreSQL header
        f.write("-- Converted from MySQL to PostgreSQL\n")
        f.write("-- Original database: winnerslots\n\n")
        f.write("SET CLIENT_ENCODING TO 'UTF8';\n\n")
        f.write(content)
    
    print(f"Conversion complete: {input_file} -> {output_file}")

if __name__ == '__main__':
    convert_mysql_to_postgresql('totalbet365.sql', 'totalbet365_pgsql.sql')
