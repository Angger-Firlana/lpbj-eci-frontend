# LPBJ/IPBJ Frontend - Build & Deployment Guide

## Project Overview
Frontend aplikasi LPBJ/IPBJ menggunakan React + TypeScript + Vite untuk mengelola permintaan barang/jasa dengan sistem approval.

---

## Prerequisites
Pastikan sudah terinstall:
- **Node.js** (v16 atau lebih baru) - [Download](https://nodejs.org/)
- **npm** atau **yarn**
- **Git**

---

## Development Setup

### 1. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 2. Run Development Server
```bash
npm run dev
# atau
yarn dev
```
Akses aplikasi di: `http://localhost:5173`

---

## Build untuk Production

### Build Web App
```bash
npm run build
# atau
yarn build
```

Output akan ada di folder `dist/`

### Preview Production Build
```bash
npm run preview
# atau
yarn preview
```

---

## Deploy ke Mobile (APK)

**Catatan**: Project ini adalah **React Web App**, bukan React Native. Untuk membuat APK, ada beberapa opsi:

### Opsi 1: Capacitor (Recommended)

Capacitor memungkinkan web app dijalankan sebagai native mobile app.

#### Install Capacitor
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npx cap init
```

Saat init, masukkan:
- **App name**: LPBJ ECI
- **App ID**: com.eci.lpbj
- **Web directory**: dist

#### Setup Android
```bash
npx cap add android
```

#### Build dan Sync
```bash
# Build web app dulu
npm run build

# Sync ke Android
npx cap sync
```

#### Generate APK
```bash
# Buka Android Studio
npx cap open android
```

Di Android Studio:
1. Tunggu Gradle sync selesai
2. Pilih **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**
3. APK ada di: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Update APK di HP
1. Copy `app-debug.apk` ke HP via USB/email/cloud
2. Install APK (enable "Install from unknown sources" jika perlu)
3. Buka aplikasi LPBJ ECI

---

### Opsi 2: Progressive Web App (PWA)

Akses via browser mobile dengan install icon di home screen.

#### Setup PWA
1. Build web app: `npm run build`
2. Deploy ke hosting (Vercel, Netlify, Firebase Hosting, dll)
3. Di HP, buka URL di browser
4. Tap menu browser > "Add to Home Screen"

---

### Opsi 3: Akses via Browser Local Network

Untuk testing cepat tanpa build APK:

```bash
# Start dev server
npm run dev -- --host
```

Aplikasi akan accessible di network local:
```
Local:   http://localhost:5173
Network: http://192.168.x.x:5173
```

Buka `http://192.168.x.x:5173` di browser HP (pastikan HP dan laptop di WiFi yang sama)

---

## Quick Update Workflow

### Jika sudah setup Capacitor:
```bash
# 1. Pull latest changes
git pull

# 2. Install dependencies (jika ada perubahan package.json)
npm install

# 3. Build web app
npm run build

# 4. Sync ke Android
npx cap sync

# 5. Open di Android Studio
npx cap open android

# 6. Build APK baru
# Build > Build APK

# 7. Transfer & install APK baru di HP
```

### Jika pakai browser (opsi 3):
```bash
# 1. Pull latest changes
git pull

# 2. Install dependencies (jika ada perubahan)
npm install

# 3. Start dev server
npm run dev -- --host

# 4. Refresh browser di HP
```

---

## Project Structure
```
lpbj-eci-frontend/
├── src/
│   ├── components/
│   │   ├── Header/              # Top navigation bar
│   │   ├── Sidebar/             # Admin sidebar
│   │   ├── PemohonSidebar/      # Pemohon sidebar
│   │   ├── AtasanSidebar/       # Atasan sidebar (new)
│   │   ├── StatCard/            # Dashboard stat cards
│   │   ├── TokenModal/          # Token approval modal (new)
│   │   └── ProtectedRoute.tsx   # Route protection
│   ├── contexts/
│   │   └── AuthContext.tsx      # Auth state management
│   ├── layouts/
│   │   ├── AdminLayout.tsx      # Admin layout wrapper
│   │   ├── PemohonLayout.tsx    # Pemohon layout wrapper
│   │   └── AtasanLayout.tsx     # Atasan layout wrapper (new)
│   ├── pages/
│   │   ├── admin/               # Admin pages
│   │   ├── pemohon/             # Pemohon pages
│   │   ├── atasan/              # Atasan pages (new)
│   │   │   ├── AtasanDashboard/
│   │   │   ├── AtasanInbox/
│   │   │   ├── LpbjDetail/
│   │   │   ├── QuotationDetail/
│   │   │   ├── AtasanHistory/
│   │   │   ├── HistoryLpbjDetail/
│   │   │   └── HistoryQuotationDetail/
│   │   └── LoginPage/
│   ├── App.tsx                  # Main app & routing
│   └── main.tsx                 # Entry point
├── public/                      # Static assets
├── dist/                        # Production build output
├── FLOW.md                      # Business flow documentation
├── AGENTS.md                    # Implementation status
├── README.md                    # This file
└── package.json
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Roles & Access

### Pemohon
- Create & submit IPBJ/LPBJ
- View own IPBJ only
- Cannot approve
- **Status**: ✅ UI Complete

### Admin
- View all IPBJ/LPBJ
- Create IPBJ, Quotation, PO
- Cannot approve
- Manage approvers
- **Status**: ⚠️ Quotation page needs UI revision

### Atasan (Approver)
- View IPBJ/Quotation waiting for approval
- Approve/Reject with token input
- View approval history
- Cannot create/edit
- **Status**: ✅ UI Complete (backend pending)

---

## Flow Overview
```
Pemohon/Admin → Create LPBJ (DRAFT)
              → Submit LPBJ
              → WAITING_APPROVAL_IPBJ
              → 4x Approval (Atasan)
              → APPROVED
              → Admin creates Quotation
              → Submit Quotation
              → WAITING_APPROVAL_QUOTATION
              → 4x Approval (Atasan)
              → APPROVED
              → Admin creates PO
              → FINAL
```

---

## Troubleshooting

### Build Errors
```bash
# Clear cache & reinstall
rm -rf node_modules package-lock.json
npm install
```

### Capacitor Sync Issues
```bash
# Clean & rebuild
npx cap sync
npx cap copy
```

### Android Studio Gradle Error
- Update Android Studio ke versi terbaru
- Update Gradle wrapper di `android/gradle/wrapper/gradle-wrapper.properties`
- Sync Project with Gradle Files

### Port already in use
```bash
# Ganti port
npm run dev -- --port 3000
```

---

## Documentation
- **FLOW.md** - Business flow & ERD summary
- **AGENTS.md** - Implementation status & context

---

## Tech Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS Modules** - Styling
- **ESLint** - Code linting

---

## Support
Untuk issue atau pertanyaan, silakan buat issue di repository ini.
