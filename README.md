<<<<<<< HEAD
# 🏫 School Rating System 
=======
# 🏫 CAZH School Rating System
>>>>>>> c1fe075 (first)

Sistem penilaian sekolah berbasis web yang memungkinkan admin untuk mengelola institusi dan kriteria penilaian, serta memungkinkan publik untuk memberikan rating terhadap sekolah.

## 📋 Fitur

### 🔐 Admin Dashboard
- **Autentikasi**: Login/Register untuk admin
- **Manajemen Institusi**: CRUD (Create, Read, Update, Delete) untuk data sekolah
<<<<<<< HEAD
- **Penilaian Admin**: Input nilai berdasarkan kriteria yang telah ditentukan
=======
- **Manajemen Kriteria**: Kelola kriteria penilaian dinamis
- **Penilaian Admin**: Input nilai berdasarkan kriteria yang telah ditentukan
- **Dashboard Analytics**: Lihat statistik dan perbandingan nilai
>>>>>>> c1fe075 (first)

### 🌐 Public Dashboard
- **Akses Tanpa Login**: Siapa saja dapat mengakses
- **Daftar Institusi**: Tampilan semua sekolah yang terdaftar
- **Rating Publik**: Berikan rating bintang 1-5 untuk setiap sekolah
<<<<<<< HEAD
=======
- **Dual Score Display**: 
  - **Nilai Admin**: Total dari kriteria yang dinilai admin
  - **Nilai Publik**: Rata-rata rating dari masyarakat
>>>>>>> c1fe075 (first)

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI Library
- **Vite** 7.1.7 - Build Tool
- **Axios** 1.13.2 - HTTP Client
- **Lucide React** - Icon Library
- **TailwindCSS** 4.1.14 - Styling

### Backend
- **Node.js** - Runtime
- **Express** 5.1.0 - Web Framework
- **MySQL** - Database
- **Sequelize** 6.37.7 - ORM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing

## 📦 Struktur Proyek

```
cazh-school/
├── backend/              # Backend API (Express + MySQL)
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   ├── .env             # Environment variables (tidak di-commit)
│   ├── .env.example     # Template environment variables
│   ├── server.js        # Entry point
│   ├── seed.js          # Database seeder
│   └── package.json     # Dependencies
│
└── frontend/            # Frontend React App
    ├── src/
    │   ├── components/  # React components
    │   ├── services/    # API services
    │   ├── App.jsx      # Main app component
    │   └── main.jsx     # Entry point
    ├── index.html
    └── package.json     # Dependencies
```

## 🚀 Cara Menjalankan Proyek

### Prerequisites
Pastikan sudah terinstall:
- **Node.js** (v18 atau lebih baru)
- **MySQL** (v8 atau lebih baru)
- **npm** atau **yarn**

### 1️⃣ Setup Database

```bash
# Login ke MySQL
mysql -u root -p

# Jalankan script create database
mysql -u root -p < backend/create-database.sql

# Atau manual:
CREATE DATABASE cazh_school;
```

### 2️⃣ Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Copy dan edit file .env
cp .env.example .env

# Edit .env dengan kredensial MySQL Anda:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=cazh_school
# JWT_SECRET=your_secret_key
# PORT=5000

# Jalankan seeder untuk data awal (opsional)
npm run seed

# Jalankan backend
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

### 3️⃣ Setup Frontend

```bash
# Buka terminal baru, masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Jalankan frontend
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### 4️⃣ Akses Aplikasi

- **Public Dashboard**: `http://localhost:5173/`
<<<<<<< HEAD
- **Admin Login**: `http://localhost:5173/#/login`

**Default Admin Account** (jika menjalankan seeder):
- Email: `admin@example.com`
=======
- **Admin Login**: `http://localhost:5173/login`

**Default Admin Account** (jika menjalankan seeder):
- Email: `admin@cazh.com`
>>>>>>> c1fe075 (first)
- Password: `admin123`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin baru
- `POST /api/auth/login` - Login admin

### Institutions
- `GET /api/institutions` - Get semua institusi
- `POST /api/institutions` - Tambah institusi baru (admin)
- `PUT /api/institutions/:id` - Update institusi (admin)
- `DELETE /api/institutions/:id` - Hapus institusi (admin)

### Criteria
- `GET /api/criteria` - Get semua kriteria
- `POST /api/criteria` - Tambah kriteria baru (admin)
- `PUT /api/criteria/:id` - Update kriteria (admin)
- `DELETE /api/criteria/:id` - Hapus kriteria (admin)

### Ratings
- `GET /api/ratings/institution/:id` - Get rating institusi
- `POST /api/ratings` - Submit rating (public/admin)

## 🔧 Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cazh_school
JWT_SECRET=your_secret_key_here
PORT=5000
```

## 📊 Database Schema

### Users
- id, username, email, password, role, createdAt, updatedAt

### Institutions
- id, name, address, description, createdAt, updatedAt

### Criteria
- id, name, weight, maxScore, createdAt, updatedAt

### Ratings
- id, institutionId, criterionId, userId, score, isPublic, createdAt, updatedAt

<<<<<<< HEAD
---

**❤️**
=======
## 🎨 Fitur Unggulan

1. **Dynamic Criteria System**: Admin dapat menambah/edit kriteria penilaian sesuai kebutuhan
2. **Dual Rating System**: Menampilkan nilai dari admin dan publik secara terpisah
3. **Weighted Scoring**: Nilai admin dihitung berdasarkan bobot kriteria
4. **Public Access**: Dashboard publik dapat diakses tanpa login
5. **Responsive Design**: Tampilan optimal di desktop dan mobile

## 🤝 Kontribusi

Silakan fork repository ini dan buat pull request untuk kontribusi Anda.

## 📄 License

ISC License

## 👨‍💻 Author

CAZH School Rating System

---

**Dibuat dengan ❤️ menggunakan React & Express**
>>>>>>> c1fe075 (first)
