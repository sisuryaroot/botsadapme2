# Dual-Platform Bot (Telegram + WhatsApp) - Replit Compatible Version

Dokumentasi penggunaan bot sadap dual-platform yang mendukung Telegram dan WhatsApp secara bersamaan, dengan versi khusus untuk Replit.

## Deskripsi

Bot ini adalah solusi dual-platform yang memungkinkan pengguna untuk mengendalikan perangkat target melalui Telegram dan WhatsApp. Versi ini telah dimodifikasi khusus untuk berjalan di platform Replit.

## Perbedaan Versi Replit

Versi Replit memiliki beberapa perbedaan dari versi lengkap:

1. **Telegram**: Berfungsi penuh dengan semua fitur
2. **WhatsApp**: Berjalan dalam mode kompatibilitas terbatas
   - Tidak menggunakan Puppeteer/Chrome (yang menyebabkan error di Replit)
   - Pesan dan file dari perangkat target akan diteruskan ke Telegram
   - Perintah WhatsApp tidak tersedia dalam mode Replit

## Fitur Utama

- Mendukung Telegram secara penuh
- WhatsApp dalam mode kompatibilitas
- Memantau informasi perangkat (model, baterai, versi, provider)
- Mengakses kamera depan dan belakang
- Merekam suara
- Mengakses dan menghapus file
- Mengirim SMS dan melihat riwayat SMS
- Melihat kontak dan riwayat panggilan
- Menampilkan notifikasi dan pesan di layar
- Mengirim getaran ke perangkat
- Memutar audio
- Dan banyak lagi

## Instalasi di Replit

1. Buat project baru di Replit dengan template Node.js
2. Upload semua file dari zip ini ke project Replit
3. Di Replit, buka Shell dan jalankan:
   ```
   npm install express ws http node-telegram-bot-api uuid multer body-parser axios
   ```
4. Edit file `config.js` dan sesuaikan dengan kebutuhan Anda:
   ```javascript
   const config = {
     // Telegram configuration
     token: 'YOUR_TELEGRAM_BOT_TOKEN',
     id: 'YOUR_TELEGRAM_USER_ID',
     
     // WhatsApp configuration (tidak digunakan dalam mode Replit)
     nomerwa: '',
     
     // Shared configuration
     surya: 'ADDITIONAL_ADMIN_ID',
     address: 'https://www.google.com',
     
     // Bot settings
     prefix: '.',
     botName: 'DualBot',
     ownerName: 'YourName',
     
     // Server settings (Replit akan menggunakan process.env.PORT)
     port: process.env.PORT || 8999
   };
   ```
5. Jalankan bot dengan mengklik tombol Run di Replit

## Penggunaan di Replit

### Telegram

1. Mulai bot dengan mengirim perintah `/start`
2. Gunakan tombol "📖 DAFTAR KORBAN" untuk melihat perangkat yang terhubung
3. Gunakan tombol "☠️ SADAP KORBAN" untuk memilih perangkat dan mengakses fitur-fitur sadap
4. Pilih perangkat yang ingin disadap dari daftar yang muncul
5. Pilih fitur yang ingin digunakan dari menu yang tersedia
6. Ikuti instruksi yang muncul untuk menggunakan fitur-fitur tertentu

### WhatsApp (Mode Kompatibilitas)

Dalam mode kompatibilitas Replit, WhatsApp hanya berfungsi sebagai penerima notifikasi. Semua interaksi dengan perangkat target harus dilakukan melalui Telegram.

## Catatan Penting untuk Replit

- Bot ini dimodifikasi khusus untuk berjalan di Replit dengan menghilangkan dependensi pada Puppeteer/Chrome
- Untuk fungsionalitas WhatsApp penuh, gunakan versi non-Replit di lingkungan server yang mendukung
- Pastikan token Telegram dan ID Telegram sudah dikonfigurasi dengan benar
- Replit akan menyediakan URL publik yang dapat diakses untuk server bot Anda

## Menggunakan Versi Lengkap (Non-Replit)

Jika Anda ingin menggunakan versi lengkap dengan fungsionalitas WhatsApp penuh:

1. Gunakan versi non-Replit di server lokal atau hosting yang mendukung
2. Pastikan sistem memiliki dependensi yang diperlukan untuk Puppeteer/Chrome
3. Ikuti petunjuk instalasi di README.md versi lengkap

## Troubleshooting di Replit

- Jika bot tidak berjalan, periksa log error di konsol Replit
- Pastikan semua dependensi terinstal dengan benar
- Jika ada error terkait port, pastikan menggunakan `process.env.PORT` di Replit
- Jika perangkat target tidak muncul, pastikan aplikasi target sudah berjalan dengan benar

## Kontak

Jika Anda mengalami masalah atau memiliki pertanyaan, silakan hubungi @SisuryaOfficial.
