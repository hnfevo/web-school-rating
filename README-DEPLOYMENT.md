# 🚀 Panduan Deployment ke Vercel - Firebase Edition

Panduan lengkap untuk deploy aplikasi School Rating System ke Vercel dengan Firebase Firestore.

---

## 📋 Prerequisites

- Akun GitHub (untuk push code)
- Akun Vercel (gratis) - [vercel.com](https://vercel.com)
- Akun Firebase (gratis) - [firebase.google.com](https://firebase.google.com)
- Node.js terinstall di komputer lokal

---

## 🔥 Step 1: Setup Firebase

### 1.1 Buat Project Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik **"Add project"** atau **"Create a project"**
3. Nama project: `cazh-school` (atau nama lain)
4. Disable Google Analytics (opsional, tidak diperlukan)
5. Klik **Create project**

### 1.2 Enable Firestore Database

1. Di sidebar, klik **"Build"** → **"Firestore Database"**
2. Klik **"Create database"**
3. Pilih **"Start in production mode"**
4. Pilih location: `asia-southeast1` (Singapore) atau terdekat
5. Klik **Enable**

### 1.3 Generate Service Account Key

1. Klik ⚙️ (Settings) → **"Project settings"**
2. Tab **"Service accounts"**
3. Klik **"Generate new private key"**
4. Klik **"Generate key"** → File JSON akan terdownload
5. **PENTING**: Rename file menjadi `firebase-service-account.json`
6. **PENTING**: Simpan file ini di `backend/firebase-service-account.json`
7. **JANGAN** commit file ini ke Git (sudah ada di .gitignore)

### 1.4 Setup Firestore Security Rules (Opsional)

Di Firestore → Rules, ganti dengan:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: true;
      allow write: if request.auth != null;
    }
  }
}
```

**Publish** rules tersebut.

---

## 📦 Step 2: Push Code ke GitHub

### 2.1 Initialize Git (jika belum)

```bash
cd d:\Coding\cazh-school

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Firebase migration - ready for deployment"
```

### 2.2 Push ke GitHub

1. Buat repository baru di GitHub (nama: `cazh-school` atau sesuai keinginan)
2. **JANGAN** centang "Initialize with README"
3. Copy commands yang diberikan GitHub:

```bash
git remote add origin https://github.com/username/cazh-school.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Deploy ke Vercel

### 3.1 Import Project

1. Login ke [vercel.com](https://vercel.com)
2. Klik **"Add New Project"**
3. Import repository GitHub Anda (`cazh-school`)
4. Vercel akan auto-detect configuration dari `vercel.json`

### 3.2 Configure Project

**Framework Preset**: Other (sudah dikonfigurasi di vercel.json)

**Root Directory**: `.` (root)

**Build Command**: 
```bash
cd frontend && npm install && npm run build
```

**Output Directory**: `frontend/dist`

**Install Command**:
```bash
npm install --prefix backend && npm install --prefix frontend
```

### 3.3 Set Environment Variables

Klik **"Environment Variables"** dan tambahkan:

**Dari Firebase Service Account JSON** (buka file yang didownload):

| Name | Value | Environment |
|------|-------|-------------|
| `FIREBASE_PROJECT_ID` | `your-project-id` | Production |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com` | Production |
| `FIREBASE_PRIVATE_KEY` | Copy seluruh private_key (termasuk `-----BEGIN...END-----`) | Production |
| `JWT_SECRET` | `random_secret_key_here` | Production |
| `NODE_ENV` | `production` | Production |

**PENTING untuk FIREBASE_PRIVATE_KEY**:
- Copy seluruh value dari `private_key` di JSON
- Termasuk `-----BEGIN PRIVATE KEY-----` dan `-----END PRIVATE KEY-----`
- Paste langsung ke Vercel (dengan `\n` di dalamnya)

**Generate JWT Secret**:
```bash
# Di terminal, jalankan:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3.4 Deploy

1. Klik **"Deploy"**
2. Tunggu proses build (2-5 menit)
3. Jika sukses, Anda akan dapat URL: `https://cazh-school-xxxxx.vercel.app`

---

## ✅ Step 4: Verification

### 4.1 Test API Health

Buka di browser:
```
https://your-app.vercel.app/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-03T08:30:00.000Z"
}
```

### 4.2 Test Frontend

1. Buka `https://your-app.vercel.app`
2. Seharusnya muncul landing page (kosong karena belum ada data)

### 4.3 Create Admin Account

Buat admin account pertama via API:

```bash
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@example.com",
    "password": "your_password"
  }'
```

Response akan berisi token. Simpan token ini.

### 4.4 Test Admin Login

1. Buka `https://your-app.vercel.app/#/login`
2. Login dengan email dan password yang dibuat
3. Seharusnya masuk ke admin dashboard

### 4.5 Add Sample Data

Di admin dashboard:
1. **Add Criteria** (contoh: Fasilitas, Pengajar, Kurikulum)
2. **Add Institution** (contoh: SMA Negeri 1, SMP Swasta ABC)
3. **Submit Admin Ratings** untuk setiap institution
4. Verify data muncul di public landing page

### 4.6 Verify di Firebase Console

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Klik **Firestore Database**
4. Seharusnya ada collections: `users`, `institutions`, `criteria`, `adminRatings`, `publicRatings`

---

## 🔄 Step 5: Update dan Redeploy

Setiap kali ada perubahan code:

```bash
# Commit changes
git add .
git commit -m "Update: description of changes"

# Push to GitHub
git push

# Vercel akan otomatis redeploy!
```

---

## 🛠️ Troubleshooting

### Firebase Connection Error

**Error**: `Firebase initialization error`

**Solution**:
1. Cek environment variables di Vercel dashboard
2. Pastikan `FIREBASE_PRIVATE_KEY` di-paste dengan benar (termasuk `\n`)
3. Verify Firebase project ID benar
4. Cek di Firebase Console → Firestore → Data (apakah ada collections?)

### Build Failed

**Error**: `Build failed`

**Solution**:
1. Cek build logs di Vercel dashboard
2. Pastikan `package.json` di frontend dan backend valid
3. Test build lokal: `cd frontend && npm run build`

### API Routes Not Working

**Error**: `404 Not Found` untuk `/api/*`

**Solution**:
1. Verify `vercel.json` ada di root directory
2. Verify `api/index.js` ada dan benar
3. Redeploy: `vercel --prod`

### Empty Data / No Institutions

**Solusi**:
- Data di Firestore kosong saat pertama kali deploy
- Tambahkan data via admin dashboard
- Atau import data dari MySQL lokal (jika ada)

---

## 📱 Custom Domain (Opsional)

1. Di Vercel dashboard → Settings → Domains
2. Klik **"Add Domain"**
3. Masukkan domain Anda (contoh: `school-rating.com`)
4. Follow DNS configuration instructions
5. Tunggu DNS propagation (5-60 menit)

---

## 💰 Pricing Info

**Vercel Free Tier**:
- ✅ 100GB bandwidth/month
- ✅ Unlimited requests
- ✅ Automatic HTTPS
- ✅ Unlimited deployments

**Firebase Free Tier (Spark Plan)**:
- ✅ 1GB storage
- ✅ 50,000 reads/day
- ✅ 20,000 writes/day
- ✅ 20,000 deletes/day
- ✅ **GRATIS SELAMANYA!**

**Cukup untuk aplikasi dengan traffic moderate!**

---

## 🔐 Security Best Practices

1. **Service Account JSON**:
   - JANGAN commit ke Git
   - JANGAN share ke siapapun
   - Simpan di tempat aman

2. **Firestore Rules**:
   - Update rules untuk production
   - Restrict write access dengan authentication

3. **JWT Secret**:
   - Use random string yang kuat
   - Jangan hardcode di code

---

## 📞 Support

Jika ada masalah:
1. Cek Vercel deployment logs
2. Cek Firebase Console → Firestore → Usage
3. Test API dengan Postman/curl
4. Cek browser console untuk frontend errors

---

## 🎉 Selesai!

Aplikasi Anda sekarang live di internet dengan Firebase Firestore! 🚀

**Next Steps**:
- Add data via admin dashboard
- Share URL ke pengguna
- Monitor usage di Firebase Console
- Setup custom domain (opsional)
