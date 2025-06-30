// backend/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Ganti sesuai user MySQL kamu
  password: '',      // Ganti sesuai password
  database: 'web_pribadi'  // Ganti sesuai nama database kamu
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal:', err);
  } else {
    console.log('Terhubung ke MySQL');
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Selamat datang di backend Website MY-PORTFOLIO');
});

// API utama
app.get('/api/data', (req, res) => {
  res.json({ message: 'Halo dari backend!' });
});

// Home
app.get('/api/home', (req, res) => {
  res.json({
    title: "Selamat Datang di Website Portofolio",
    content: "MYHOME."
  });
});

// Profile
app.get('/api/profile', (req, res) => {
  res.json({
    name: "Tarso_STI202202649",
    bio: "Mahasiswa STI yang sedang belajar membuat aplikasi full-stack menggunakan React dan Node.js.",
    universitas: "STMIK Widya Utama"
  });
});

// Berita
app.get('/api/berita', (req, res) => {
  res.json([
    { id: 1, title: "React & Node.js", content: "React cocok digunakan untuk frontend modern." },
    { id: 2, title: "Express JS", content: "Express adalah framework minimalis untuk backend Node.js." }
  ]);
});

// Galeri endpoint
app.get('/api/galeri', (req, res) => {
    res.json([
        {
            image: '/assets/images/frontend.jpg',
            caption: 'Frontend Development',
            description: 'Membangun antarmuka pengguna menggunakan React JS dan teknologi modern.'
        },
        {
            image: '/assets/images/backend.jpg',
            caption: 'Backend Development',
            description: 'Mengembangkan API menggunakan Node.js dan Express untuk komunikasi data.'
        }
    ]);
});


// Kontak Info
app.get('/api/kontak', (req, res) => {
  res.json({
    phone: "+6285729670954", 
  });
});

// Kontak Form (POST)
app.post('/api/kontak', (req, res) => {
  const { nama, email, pesan } = req.body;
  const sql = 'INSERT INTO pesan_kontak (nama, email, pesan) VALUES (?, ?, ?)';
  db.query(sql, [nama, email, pesan], (err, result) => {
    if (err) {
      console.error('Gagal menyimpan pesan:', err);
      res.status(500).json({ message: 'Gagal menyimpan pesan' });
    } else {
      res.status(200).json({ message: 'Pesan berhasil disimpan' });
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Terjadi kesalahan di server!');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
