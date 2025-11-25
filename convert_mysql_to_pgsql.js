#!/usr/bin/env node
/**
 * Convert MySQL dump to PostgreSQL format
 */
const fs = require('fs');

function convertMysqlToPostgresql(inputFile, outputFile) {
    console.log(`Reading ${inputFile}...`);
    let content = fs.readFileSync(inputFile, 'utf8');
    
    console.log('Converting MySQL syntax to PostgreSQL...');
    
    // Remove MySQL-specific comments and commands
    content = content.replace(/\/\*!.*?\*\/;/gs, '');
    content = content.replace(/\/\*!.*?\*\//g, '');
    
    // Remove LOCK TABLES and UNLOCK TABLES (more comprehensive)
    content = content.replace(/LOCK\s+TABLES\s+.*?;/gi, '');
    content = content.replace(/UNLOCK\s+TABLES\s*;/gi, '');
    content = content.replace(/\bUNLOCK\s+TABLES\b/gi, '');
    content = content.replace(/\bLOCK\s+TABLES\b/gi, '');
    
    // Remove ALTER TABLE DISABLE/ENABLE KEYS
    content = content.replace(/ALTER TABLE.*?(DISABLE|ENABLE) KEYS;/gi, '');
    
    // Remove ENGINE, CHARSET, COLLATE, ROW_FORMAT from CREATE TABLE
    content = content.replace(/\s*ENGINE\s*=\s*\w+/gi, '');
    content = content.replace(/\s*DEFAULT\s+CHARSET\s*=\s*\w+/gi, '');
    content = content.replace(/\s*COLLATE\s*=\s*\w+/gi, '');
    content = content.replace(/\s*ROW_FORMAT\s*=\s*\w+/gi, '');
    
    // Remove backticks
    content = content.replace(/`/g, '"');
    
    // Remove 'unsigned' keyword (PostgreSQL doesn't support it)
    content = content.replace(/\s+unsigned\b/gi, '');
    
    // Convert AUTO_INCREMENT to SERIAL
    content = content.replace(
        /"(\w+)"\s+int\(\d+\)\s+NOT NULL\s+AUTO_INCREMENT/gi,
        '"$1" SERIAL'
    );
    
    // Convert int(X) to INTEGER
    content = content.replace(/\bint\(\d+\)/gi, 'INTEGER');
    content = content.replace(/\btinyint\(\d+\)/gi, 'SMALLINT');
    content = content.replace(/\bbigint\(\d+\)/gi, 'BIGINT');
    
    // Convert varchar to VARCHAR
    content = content.replace(/\bvarchar\b/gi, 'VARCHAR');
    
    // Convert text types
    content = content.replace(/\btext\b/gi, 'TEXT');
    content = content.replace(/\blongtext\b/gi, 'TEXT');
    content = content.replace(/\bmediumtext\b/gi, 'TEXT');
    
    // Convert datetime to TIMESTAMP
    content = content.replace(/\bdatetime\b/gi, 'TIMESTAMP');
    
    // Convert double to DOUBLE PRECISION
    content = content.replace(/\bdouble\b/gi, 'DOUBLE PRECISION');
    
    // Convert enum to VARCHAR
    content = content.replace(/enum\([^)]+\)/gi, 'VARCHAR(50)');
    
    // Remove COLLATE from column definitions
    content = content.replace(/\s+COLLATE\s+\w+/gi, '');
    
    // Remove COMMENT directives (PostgreSQL uses different syntax)
    content = content.replace(/\s+COMMENT\s+'[^']*'/gi, '');
    content = content.replace(/\s+COMMENT\s+"[^"]*"/gi, '');
    
    // Convert DEFAULT CURRENT_TIMESTAMP ON UPDATE to just DEFAULT
    content = content.replace(
        /DEFAULT\s+CURRENT_TIMESTAMP\s+ON\s+UPDATE\s+CURRENT_TIMESTAMP/gi,
        'DEFAULT CURRENT_TIMESTAMP'
    );
    
    // Remove AUTO_INCREMENT settings after closing parenthesis
    content = content.replace(/\)\s*AUTO_INCREMENT\s*=\s*\d+\s*;/gi, ');');
    
    // Remove standalone AUTO_INCREMENT keyword
    content = content.replace(/\s+AUTO_INCREMENT\b/gi, '');
    
    // Remove KEY definitions from CREATE TABLE
    const lines = content.split('\n');
    const newLines = [];
    let inCreateTable = false;
    
    for (const line of lines) {
        if (/CREATE TABLE/i.test(line)) {
            inCreateTable = true;
            newLines.push(line);
        } else if (inCreateTable && line.trim().startsWith(');')) {
            inCreateTable = false;
            newLines.push(line);
        } else if (inCreateTable && 
                   (/^\s*KEY\s+/i.test(line) || 
                    /^\s*UNIQUE KEY\s+/i.test(line) || 
                    /^\s*INDEX\s+/i.test(line))) {
            // Skip KEY/INDEX definitions
            continue;
        } else {
            newLines.push(line);
        }
    }
    
    content = newLines.join('\n');
    
    // Clean up trailing commas before closing parenthesis
    content = content.replace(/,\s*\n\s*\)/g, '\n)');
    
    // Convert DROP TABLE IF EXISTS
    content = content.replace(
        /DROP TABLE IF EXISTS "(\w+)";/gi,
        'DROP TABLE IF EXISTS "$1" CASCADE;'
    );
    
    // Add IF NOT EXISTS to CREATE TABLE
    content = content.replace(
        /CREATE TABLE "(\w+)"/gi,
        'CREATE TABLE IF NOT EXISTS "$1"'
    );
    
    // Write output
    console.log(`Writing ${outputFile}...`);
    const header = `-- Converted from MySQL to PostgreSQL
-- Original database: winnerslots
-- Conversion date: ${new Date().toISOString()}

SET CLIENT_ENCODING TO 'UTF8';

`;
    
    fs.writeFileSync(outputFile, header + content, 'utf8');
    console.log('Conversion complete!');
    console.log(`Output file: ${outputFile}`);
}

// Run conversion
convertMysqlToPostgresql('totalbet365.sql', 'totalbet365_pgsql.sql');
