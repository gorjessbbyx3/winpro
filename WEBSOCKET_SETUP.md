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

## To Use WebSocket Servers (Production Deployment):

Follow the README instructions on a VPS/VDS/Cloud server:

1. **Server Requirements** (from README):
   - Dedicated/VDS/VPS/Cloud (not shared hosting)
   - Linux Ubuntu 20 or 22
   - Minimum 180GB+ disk
   - Full root access

2. **Install PM2** (on VPS):
   ```bash
   npm install -g pm2
   cd PTWebSocket
   pm2 start Arcade.js --watch
   pm2 start Server.js --watch
   pm2 start Slots.js --watch
   ```

3. **Configure SSL**: Place your SSL certificates in `PTWebSocket/ssl/`

4. **Open Firewall Ports**: 22154, 22188, 22197

## Current Replit Setup:

The application is fully functional for standard slot games and casino operations. WebSocket servers are **optional advanced features** for live dealer games and require deployment to a traditional server environment.

