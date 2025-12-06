# Backend Express MySQL - School Rating System

Backend API untuk sistem penilaian lembaga sekolah dengan Express.js dan MySQL.

## Prerequisites

- Node.js (v18 atau lebih baru)
- MySQL Server
- npm atau yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure database:
   - Buat database MySQL dengan nama `cazh_school`
   - Update file `.env` sesuai konfigurasi MySQL Anda

3. Seed database dengan data awal:
```bash
npm run seed
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server akan berjalan di `http://localhost:5000`

## Default Admin Credentials

- Email: `admin@example.com`
- Password: `admin123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin baru
- `POST /api/auth/login` - Login admin
- `GET /api/auth/me` - Get current user (protected)

### Institutions
- `GET /api/institutions` - Get all institutions (public)
- `GET /api/institutions/:id` - Get single institution (public)
- `POST /api/institutions` - Create institution (admin only)
- `PUT /api/institutions/:id` - Update institution (admin only)
- `DELETE /api/institutions/:id` - Delete institution (admin only)

### Criteria
- `GET /api/criteria` - Get all criteria (public)
- `POST /api/criteria` - Create criterion (admin only)
- `PUT /api/criteria/:id` - Update criterion (admin only)
- `DELETE /api/criteria/:id` - Delete criterion (admin only)

### Ratings
- `POST /api/ratings/admin` - Submit admin ratings (admin only)
- `GET /api/ratings/admin/:institutionId` - Get admin ratings
- `POST /api/ratings/public` - Submit public rating (public)
- `GET /api/ratings/public/:institutionId` - Get public ratings

## Environment Variables

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cazh_school
DB_PORT=3306
JWT_SECRET=cazh-school-secret-key-2025
PORT=5000
NODE_ENV=development
```
