# 🚀 Quick Start - Deployment ke Vercel (Firebase)

## Ringkasan Singkat

Proyek Anda sudah **siap deploy** dengan Firebase Firestore!

---

## ✅ Yang Sudah Dikonfigurasi

- ✅ Backend dikonversi ke Vercel Serverless Functions
- ✅ Database migrasi dari MySQL → Firebase Firestore
- ✅ Frontend dikonfigurasi dengan environment variables
- ✅ Vercel configuration (`vercel.json`)
- ✅ Environment templates (`.env.example`)

---

## 📝 Langkah Deployment (5 Steps)

### 1️⃣ Setup Firebase (10 menit)
- Buat project di [firebase.google.com](https://firebase.google.com)
- Enable Firestore Database
- Download service account JSON
- Simpan ke `backend/firebase-service-account.json`

### 2️⃣ Push ke GitHub (2 menit)
```bash
git init
git add .
git commit -m "Ready for deployment with Firebase"
git remote add origin https://github.com/username/cazh-school.git
git push -u origin main
```

### 3️⃣ Deploy ke Vercel (3 menit)
- Login ke [vercel.com](https://vercel.com)
- Import GitHub repository
- Vercel auto-detect configuration ✅

### 4️⃣ Set Environment Variables (5 menit)
Di Vercel Dashboard → Environment Variables:
- `FIREBASE_PROJECT_ID` → dari service account JSON
- `FIREBASE_CLIENT_EMAIL` → dari service account JSON
- `FIREBASE_PRIVATE_KEY` → dari service account JSON (copy semua)
- `JWT_SECRET` → generate random string
- `NODE_ENV` → `production`

### 5️⃣ Deploy! (2 menit)
- Klik "Deploy"
- Tunggu build selesai
- Akses URL: `https://your-app.vercel.app` 🎉

---

## 📚 Dokumentasi Lengkap

Lihat **[README-DEPLOYMENT.md](./README-DEPLOYMENT.md)** untuk:
- Panduan detail setiap step
- Troubleshooting
- Custom domain setup
- Verification checklist

---

## 🆘 Butuh Bantuan?

**Common Issues**:
- Firebase connection error → Cek environment variables
- Build failed → Cek build logs di Vercel
- API not working → Verify `vercel.json` ada di root

**Dokumentasi**:
- [Vercel Docs](https://vercel.com/docs)
- [Firebase Docs](https://firebase.google.com/docs/firestore)

---

**Total Time**: ~20 menit ⏱️

**Cost**: $0 (100% gratis dengan free tier) 💰

**Database**: Firebase Firestore (50K reads/day, 20K writes/day - GRATIS SELAMANYA!)
