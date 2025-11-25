# WebSocket Servers Setup Notes

## Important: Replit Environment Limitations

The README instructions require PM2 WebSocket servers running on specific ports (22154, 22188, 22197) with SSL certificates. **This setup is designed for traditional VPS/VDS/Cloud servers as stated in the README.**

### Replit Constraints:
1. **Port Limitations**: Replit only exposes specific ports (primarily 5000 for web traffic)
2. **SSL Management**: SSL is handled by Replit's infrastructure, not user-managed certificates
3. **Process Persistence**: PM2 processes don't survive Replit's sleep mode
4. **No Root Access**: Cannot configure custom SSL certificates or open arbitrary firewall ports

### What Works in Replit:
✅ Core Laravel casino application
✅ 3,276 slot games (via HTTP)
✅ PostgreSQL database with full schema  
✅ Redis caching and sessions
✅ User authentication and management
✅ Payment integration support
✅ Sports betting data
✅ Admin panel

### What Requires VPS/VDS (as per README):
⚠️ WebSocket game servers (Arcade.js, Server.js, Slots.js)
⚠️ Live dealer games
⚠️ Real-time multiplayer casino features

## Directory Structure

Each WebSocket server now runs in its own directory:

```
PTWebSocket/
├── Arcade/
│   ├── index.js           # Arcade game server
│   ├── package.json       # Dependencies
│   ├── Queue.js           # Queue management
│   ├── System.js          # System utilities
│   ├── Utils.js           # Utility functions
│   ├── games/             # Game files
│   └── mod/               # Arcade mods
├── Server/
│   ├── index.js           # Main WebSocket server
│   └── package.json       # Dependencies
├── Slots/
│   ├── index.js           # Slots game server
│   └── package.json       # Dependencies
├── modules/               # Shared modules
└── ssl/                   # SSL certificates (see below)
```

## To Use WebSocket Servers (Production Deployment):

Follow the README instructions on a VPS/VDS/Cloud server:

1. **Server Requirements** (from README):
   - Dedicated/VDS/VPS/Cloud (not shared hosting)
   - Linux Ubuntu 20 or 22
   - Minimum 180GB+ disk
   - Full root access

2. **Install Dependencies & Run with PM2** (on VPS):
   ```bash
   # Install dependencies for each server
   cd PTWebSocket/Arcade && npm install && cd ../..
   cd PTWebSocket/Server && npm install && cd ../..
   cd PTWebSocket/Slots && npm install && cd ../..
   
   # Start with PM2
   cd PTWebSocket
   pm2 start Arcade/index.js --name "arcade-server" --watch
   pm2 start Server/index.js --name "main-server" --watch
   pm2 start Slots/index.js --name "slots-server" --watch
   
   # Or use the package.json scripts directly
   pm2 start "npm --prefix Arcade start" --name "arcade-server" --watch
   pm2 start "npm --prefix Server start" --name "main-server" --watch
   pm2 start "npm --prefix Slots start" --name "slots-server" --watch
   ```

3. **Configure SSL**: Place your SSL certificates in `PTWebSocket/ssl/`
   - `crt.crt` - Certificate file
   - `key.key` - Private key
   - `bundle.crt` - Bundle file (if applicable)

4. **Open Firewall Ports**: 22154, 22188, 22197

## Current Replit Setup:

The application is fully functional for standard slot games and casino operations. WebSocket servers are **optional advanced features** for live dealer games and require deployment to a traditional server environment.
