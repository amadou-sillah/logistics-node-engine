const { io } = require('socket.io-client');

const socket = io('https://logistics-backend-node.onrender.com', {
  transports: ['websocket'],
  reconnection: true,
});

socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO server');
  socket.emit('join-shipment', 'S-1001');
});

socket.on('tracking-update', (data) => {
  console.log('📍 Update:', JSON.stringify(data, null, 2));
});

socket.on('connect_error', (err) => {
  console.error('❌ Connection error:', err.message);
  process.exit(1);
});

setTimeout(() => {
  console.log('⚠️ No updates after 15 seconds. Check if server is sending.');
}, 15000);
