const { io } = require('socket.io-client');

console.log('⏳ Connecting to http://localhost:3000...');

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  reconnection: true
});

socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO server');
  console.log('📡 Subscribing to shipment: S-1001');
  socket.emit('join-shipment', 'S-1001');
});

socket.on('tracking-update', (data) => {
  console.log('📍 Update:', JSON.stringify(data, null, 2));
});

socket.on('connect_error', (err) => {
  console.error('❌ Connection error:', err.message);
  process.exit(1);
});

socket.on('disconnect', (reason) => {
  console.log('❌ Disconnected:', reason);
});

setTimeout(() => {
  console.log('⚠️ No updates received in 15 seconds. Check simulator.');
}, 15000);

setTimeout(() => {}, 9999999);
