# winpro
Script cassino online 1win goldsvet - fonte - nullcave script laravel + php mysql database characteristics

Specially designed 1win design. Advanced admin panel. Online or cash payments.. Cryptographic payments. Easy to use. It can serve thousands of players with its advanced database. Sports betting data is updated and updated automatically with the betsapi bot. installation

Dedicated/VDS/VPS/Cloud (not shared hosting) OS: Linux Ubuntu 20 or 22 Disk: minimum 180 GB+ (SSD is recommended but not required) Bandwidth: 1TB+

Set up your server with the following components: Apache MySQL PHP 7.3 Laravel 7 Node.js 16 PM2 Redis

Enforce SSL for the domain. Extract/Clone this repo into public_html folder Enable PHP Extension : Fileinfo, Imagick, Redis Create a new email and set a password. Create a new database and grant full access. Import the SQL file db.sql directory. Ensure SSL is enforced for the domain. Run on terminal under public_html folder : composer install Generate SSL CRT, KEY, and BUNDLE. Copy the contents of your CRT/KEY/BUNDLE to files in the /casino/PTwebsocket/ssl/ folder. Create a new email and password. For file uploads: //**** Additional tip: As it includes demo user accounts, generate a new password hash for existing users and execute the following in phpMyAdmin (replace the hash) https://bcrypt-generator.com/. If you need to hash a new word, for example, run this in phpMyAdmin: UPDATE w_users SET password = '$2a$12$s1RpwEx/oTL3vYQGZjC33eBHECRJb7gkjmAk9Tmyefub7gQ4nh8XS'; // This ensures all users' passwords are set to: Test123 ********/// SSL Instructions Delete any self-signed certificates. Generate or install the Lets Encrypt one if available. Save the text file via notepad or directly as follows: Certificate (CRT) ==> crt.crt Private Key (KEY) --> key.key Go to the folder PTWebSocket/ssl and replace those three files. Edit .env and /config/app.php (URL line 65) for domain, database, user/password, email, and password. File Edits​Edit / Socket File Changes in *json files. in folder public

PM2 Commands​PM2 COMMANDS https://pm2.keymetrics.io/docs/usage/quick-start/

FROM INSIDE PTWEBSOCKET web folder COMMANDS:

pm2 start Arcade.js --watch pm2 start Server.js --watch pm2 start Slots.js --watch OR if you tested before and not expecting errors, all in one command:

pm2 start Arcade.js --watch && pm2 start Server.js --watch && pm2 start Slots.js --watch SAMPLE USEFUL COMMANDS

pm2 stop all pm2 delete all pm2 flush pm2 logs All commands on https://pm2.keymetrics.io/docs/usage/quick-start/

An extra tool called wscat can be used (install via SSH):

wscat -c "wss://127.0.0.1: PORT /slots" Example to make sure you get connected.

Open ports in Firewall: 22154, 22188, 22197 (or whatever you set your Socket file ports to).

Run the site: It should work now if everything was set up correctly.

Troubleshooting​Minor troubleshooting if your composer/artisan did not run correctly:

php artisan cache:clear && php artisan view:clear && php artisan config:clear && phpartisan event:clear && php artisan route:clear

< DOWNLOAD On Pixeldrain >

1winpro games3-001 games2-002 games1-003

Total Size >50,56 GB Demo website - https://pucsr.com/home
