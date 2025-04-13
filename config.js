const config = {
  // Telegram configuration
  token: '8104760803:AAHqG1nL1vyYDAZePvXZqObU5u19p1zgGd0',
  id: '7656811758',
  
  // WhatsApp configuration
  nomerwa: '', // Admin WhatsApp number with country code (e.g. '6281234567890')
  
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
