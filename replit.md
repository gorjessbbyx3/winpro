# Laravel Casino Application - Replit Setup

## Project Overview
This is a Laravel 8 casino/betting application with React components, originally built for MySQL but configured to run on PostgreSQL in the Replit environment.

**Current State**: Application is successfully running on Replit with basic functionality. The landing page loads correctly with the "seibet" branding.

## Recent Changes (November 25, 2025)

### Initial Replit Setup
1. **Environment Configuration**
   - Configured PostgreSQL database connection to use Replit's hosted database
   - Updated `config/database.php` to support both `DB_*` and `PG*` environment variables
   - Set environment variables: `DB_CONNECTION=pgsql`, `APP_ENV=local`, `APP_DEBUG=true`

2. **Dependencies**
   - Installed PHP 8.2 (updated from PHP 7.2 requirement)
   - Installed Node.js 20
   - Updated `composer.json` to support PHP 8.2
   - Installed all PHP dependencies via Composer
   - Installed all Node.js dependencies and built frontend assets

3. **Database Setup**
   - Created basic Laravel tables: `w_sessions`, `w_cache`, `w_cache_locks`, `w_users`
   - Note: Full production schema from `totalbet365.sql` is not yet imported

4. **Bug Fixes**
   - Fixed GeoIP database error by wrapping MaxMind Reader in try-catch in `app/Lib/GeoData.php`
   - Created placeholder GeoIP directory structure
   - Created missing `resources/js/app.js` file for Laravel Mix

5. **Workflow Configuration**
   - Configured Laravel to run on port 5000 with `0.0.0.0` binding
   - Set up autoscale deployment configuration

## Project Architecture

### Backend
- **Framework**: Laravel 8
- **PHP Version**: 8.2
- **Database**: PostgreSQL (Replit hosted)
- **Table Prefix**: `w_`
- **Session Driver**: Database
- **Cache Driver**: Database

### Frontend
- **Build Tool**: Laravel Mix
- **Framework**: React 17
- **UI Library**: Material-UI (MUI)
- **Additional Libraries**: Redux, React Router, Swiper

### Key Features
- User authentication and management
- Casino/slot games
- WebSocket servers (in `PTWebSocket/` directory - not yet configured)
- Payment integration (Coinbase Commerce, Coinpayment)
- GeoIP tracking
- Sports betting data (via betsapi)

## Important Notes

### Security
- The original `.env` file contained production credentials and was backed up to `.env.production.backup`
- All sensitive credentials should be managed through Replit's secrets

### Known Issues
1. **Route Caching**: Cannot run `php artisan route:cache` due to duplicate route names
2. **Full Database Schema**: The complete production schema needs to be imported for full functionality
3. **GeoIP Database**: Missing actual MaxMind GeoIP database file - currently using fallback values
4. **WebSocket Servers**: PM2 servers in `PTWebSocket/` are not configured for Replit environment

### Next Steps for Full Functionality
1. Import complete database schema from `totalbet365.sql` (needs MySQL to PostgreSQL conversion)
2. Obtain and configure MaxMind GeoIP database
3. Fix duplicate route names issue
4. Configure WebSocket servers for Replit environment
5. Set up Redis if needed for better performance

## Running the Application

The application runs automatically via the "Laravel App" workflow on port 5000.

To manually start:
```bash
php -S 0.0.0.0:5000 -t public
```

To rebuild frontend assets:
```bash
npm run dev
```

## Environment Variables

Required environment variables are automatically set:
- `DB_CONNECTION`: pgsql
- `APP_ENV`: local
- `APP_DEBUG`: true
- `APP_URL`: http://localhost:5000
- Database credentials pulled from Replit's `PG*` secrets

## File Structure

- `/app` - Laravel application code
- `/config` - Configuration files
- `/database` - Database migrations and seeds
- `/public` - Public web root
- `/resources` - Frontend resources (views, CSS, JS)
- `/routes` - Application routes
- `/storage` - Storage for logs, cache, sessions
- `/vendor` - PHP dependencies
- `/node_modules` - Node.js dependencies
- `/PTWebSocket` - WebSocket server files (Node.js)

## User Preferences

None documented yet.
