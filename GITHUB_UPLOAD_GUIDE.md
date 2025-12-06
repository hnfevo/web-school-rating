# 📤 Panduan Upload Proyek ke GitHub

Panduan lengkap step-by-step untuk meng-upload proyek CAZH School Rating System ke GitHub.

## 📋 Persiapan Sebelum Upload

### ✅ Checklist Sebelum Upload

- [ ] Pastikan file `.env` **TIDAK** akan ter-upload (sudah ada di `.gitignore`)
- [ ] Pastikan `node_modules/` **TIDAK** akan ter-upload (sudah ada di `.gitignore`)
- [ ] File `.env.example` sudah dibuat sebagai template
- [ ] README.md sudah lengkap dan informatif
- [ ] Kode sudah berfungsi dengan baik di local

## 🚀 Step-by-Step Upload ke GitHub

### 1️⃣ Buat Repository di GitHub

1. Buka browser dan login ke [GitHub](https://github.com)
2. Klik tombol **"+"** di pojok kanan atas → pilih **"New repository"**
3. Isi form repository:
   - **Repository name**: `cazh-school-rating` (atau nama lain yang Anda inginkan)
   - **Description**: `School rating system with admin dashboard and public rating features`
   - **Visibility**: Pilih **Public** atau **Private** sesuai kebutuhan
   - **❌ JANGAN** centang "Initialize this repository with a README" (karena kita sudah punya)
4. Klik **"Create repository"**

### 2️⃣ Inisialisasi Git di Proyek Lokal

Buka terminal/command prompt di folder proyek `d:\Coding\cazh-school`:

```bash
# Masuk ke folder proyek
cd d:\Coding\cazh-school

# Inisialisasi git repository
git init

# Tambahkan semua file ke staging
git add .

# Cek status (pastikan .env tidak masuk)
git status

# Commit pertama
git commit -m "Initial commit: School rating system with React frontend and Express backend"
```

> **⚠️ PENTING**: Pastikan file `.env` **TIDAK** muncul di `git status`. Jika muncul, berarti ada masalah dengan `.gitignore`.

### 3️⃣ Hubungkan dengan GitHub Repository

```bash
# Ganti URL dengan URL repository GitHub Anda
git remote add origin https://github.com/USERNAME/cazh-school-rating.git

# Verifikasi remote sudah terhubung
git remote -v
```

**Ganti `USERNAME`** dengan username GitHub Anda!

### 4️⃣ Push ke GitHub

```bash
# Rename branch ke main (jika masih master)
git branch -M main

# Push ke GitHub
git push -u origin main
```

**Jika diminta login:**
- Masukkan username GitHub Anda
- Untuk password, gunakan **Personal Access Token** (bukan password akun)

### 5️⃣ Membuat Personal Access Token (Jika Diperlukan)

Jika diminta password dan gagal, Anda perlu membuat Personal Access Token:

1. Buka GitHub → **Settings** (pojok kanan atas)
2. Scroll ke bawah → klik **Developer settings**
3. Klik **Personal access tokens** → **Tokens (classic)**
4. Klik **Generate new token** → **Generate new token (classic)**
5. Isi form:
   - **Note**: `CAZH School Project`
   - **Expiration**: Pilih durasi (misal: 90 days)
   - **Scopes**: Centang **repo** (semua sub-checkbox)
6. Klik **Generate token**
7. **COPY TOKEN** (hanya muncul sekali!)
8. Gunakan token ini sebagai password saat `git push`

### 6️⃣ Verifikasi Upload Berhasil

1. Buka repository GitHub Anda di browser
2. Refresh halaman
3. Pastikan semua file sudah ter-upload
4. Pastikan **`.env` TIDAK ada** di repository
5. Pastikan **`node_modules/` TIDAK ada** di repository

## 📝 Update Proyek di Masa Depan

Setelah melakukan perubahan pada kode:

```bash
# Cek file yang berubah
git status

# Tambahkan file yang berubah
git add .

# Atau tambahkan file spesifik
git add backend/controllers/newController.js

# Commit dengan pesan yang jelas
git commit -m "Add new feature: Email notification for ratings"

# Push ke GitHub
git push
```

## 🌿 Bekerja dengan Branches (Opsional)

Untuk development yang lebih terorganisir:

```bash
# Buat branch baru untuk fitur baru
git checkout -b feature/email-notifications

# Lakukan perubahan dan commit
git add .
git commit -m "Implement email notifications"

# Push branch ke GitHub
git push -u origin feature/email-notifications

# Setelah selesai, merge ke main via Pull Request di GitHub
```

## 🔒 Keamanan: Yang TIDAK Boleh Di-Upload

**❌ JANGAN UPLOAD:**
- File `.env` (berisi kredensial database dan secret keys)
- Folder `node_modules/` (terlalu besar, bisa di-install ulang)
- File backup database (`.sql.backup`)
- File log (`*.log`)
- File IDE settings (`.vscode/`, `.idea/`)

**✅ YANG HARUS DI-UPLOAD:**
- Semua source code (`.js`, `.jsx`, `.css`, dll)
- File konfigurasi (`package.json`, `vite.config.js`, dll)
- File `.env.example` (template tanpa nilai sensitif)
- File dokumentasi (`README.md`, dll)
- File `.gitignore`

## 🎯 Tips & Best Practices

### 1. Commit Messages yang Baik
```bash
# ❌ Buruk
git commit -m "update"
git commit -m "fix bug"

# ✅ Baik
git commit -m "Add validation for rating input"
git commit -m "Fix: Weighted score calculation error"
git commit -m "Update: Improve dashboard UI responsiveness"
```

### 2. Commit Secara Berkala
- Jangan menunggu terlalu banyak perubahan
- Commit setiap kali menyelesaikan satu fitur kecil
- Lebih mudah untuk tracking dan rollback

### 3. Gunakan .gitignore dengan Benar
- Selalu cek `git status` sebelum commit
- Pastikan file sensitif tidak masuk

### 4. Tulis README yang Informatif
- Jelaskan cara setup dan menjalankan proyek
- Dokumentasikan API endpoints
- Sertakan screenshot jika perlu

## 🆘 Troubleshooting

### Problem: File .env ter-upload

**Solusi:**
```bash
# Hapus dari git tracking (tidak menghapus file lokal)
git rm --cached backend/.env

# Commit perubahan
git commit -m "Remove .env from repository"

# Push
git push
```

### Problem: node_modules ter-upload

**Solusi:**
```bash
# Hapus dari git tracking
git rm -r --cached node_modules

# Pastikan node_modules ada di .gitignore
echo "node_modules/" >> .gitignore

# Commit
git commit -m "Remove node_modules from repository"

# Push
git push
```

### Problem: Git push ditolak

**Solusi:**
```bash
# Pull dulu untuk sinkronisasi
git pull origin main --rebase

# Lalu push lagi
git push
```

### Problem: Lupa Personal Access Token

**Solusi:**
- Buat token baru di GitHub Settings → Developer settings
- Atau gunakan GitHub CLI atau GitHub Desktop

## 🔗 Alternatif: Menggunakan GitHub Desktop

Jika tidak nyaman dengan command line:

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install dan login dengan akun GitHub
3. Klik **File** → **Add Local Repository**
4. Pilih folder `d:\Coding\cazh-school`
5. Klik **Publish repository**
6. Pilih nama dan visibility
7. Klik **Publish**

## 📚 Referensi

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Selamat! Proyek Anda sudah siap di GitHub! 🎉**

Jangan lupa untuk:
- ⭐ Star repository Anda sendiri
- 📝 Update README jika ada perubahan
- 🔄 Commit dan push secara berkala
- 🔒 Jaga keamanan kredensial Anda
