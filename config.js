const config = {
  // Telegram configuration
  token: '7589486253:AAFdcQZDDevBa8Qwf8rQW6XWfW2D9bY4Mt4',
  id: '7570665912',
  
  // WhatsApp configuration
  nomerwa: '6281944144314', // Admin WhatsApp number with country code (e.g. '6281234567890')
  
  // Shared configuration
  surya: '', // Additional admin ID
  address: 'https://www.google.com',
  
  // Bot settings
  prefix: '.',
  botName: 'DualBot',
  ownerName: 'SisuryaOfficial',
  
  // Server settings
  port: process.env.PORT || 8999
};

module.exports = config;
