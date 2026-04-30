# N. G. Acharya & D. K. Marathe College — Institutional Portal

A modern, high-performance institutional portal built for **N. G. Acharya & D. K. Marathe College of Arts, Science and Commerce**, Chembur, Mumbai. This platform features a public-facing website and a comprehensive **Admin Management System**.

## 🎯 Project Overview

**Status**: Production-Ready Frontend with Integrated Admin Management  
**Tech Stack**: React 19, Vite 6, TypeScript, Tailwind CSS v4, Framer Motion, Radix UI  
**Deployment**: Optimized for Vercel, Netlify, or AWS  
**Core Features**: Dynamic Academic Programmes, Real-time Notices, Event Management, Faculty Directory, and a full Admin Dashboard.

---

## 📋 Key Features

### 🌐 Public Portal
- **Modern Institutional Presence**: Sleek design featuring NAAC 'A' Grade accreditation and campus highlights.
- **Academic Directory**: Browse 25+ programmes across UG, PG, PhD, and Junior College with advanced filtering.
- **Dynamic Notices & Events**: Categorized communication hub for admissions, exams, and campus activities.
- **Department Showcases**: Detailed profiles for all academic departments, including vision, mission, and faculty.
- **Infrastructure Gallery**: High-fidelity showcase of college facilities (IT Labs, Library, Sports, etc.).
- **Responsive & Accessible**: Mobile-first design optimized for all devices and network conditions.

### 🔐 Admin Management System
- **Institutional Intelligence Dashboard**: At-a-glance metrics for faculty, courses, and student-facing communications.
- **Full CRUD Support**: Create, Read, Update, and Delete capabilities for:
  - **Notices & Circulars** (with attachment support)
  - **Campus Events** (scheduling and venue management)
  - **Faculty Members** (profile and achievement management)
  - **Academic Courses** (fee structures, eligibility, and curriculum)
  - **Departments** (infrastructure and departmental data)
- **Hardened Access Control**: Admin-only authentication system with student portal toggles for secure management.
- **Persistent Data Store**: Integrated `localStorage` persistence layer that bridges the gap between static seed data and real API integration.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18.0.0 or higher
- **Package Manager**: npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd acharya-marathe-college

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build

```bash
# Type check and build
npm run build

# Preview the production build
npm run preview
```

---

## 📁 Project Architecture

```
src/
├── app/                    # Application routes and main entry points
├── components/
│   ├── layout/            # Navigation, Footer, and Page Shells
│   ├── ui/                # shadcn/ui and Radix primitives
│   └── cards/             # Specialized display cards (Course, Notice, Event)
├── pages/
│   ├── admin/             # Full Admin Management Suite
│   └── public/            # Student and Visitor facing pages
├── lib/
│   └── data/              # Persistence layer (Stores, Seed Data, DataStore)
├── context/               # Global state (Auth, UI preferences)
├── hooks/                 # Custom domain hooks
├── types/                 # TypeScript interfaces and domain models
└── styles/                # Tailwind v4 configuration and global CSS
```

---

## 🎨 Design System

### Technology Stack
- **Tailwind CSS v4**: Utilizing the latest CSS-first configuration and modern utility patterns.
- **Framer Motion**: Smooth page transitions, staggered reveals, and interactive micro-animations.
- **Geist Variable Font**: Clean, modern typography for maximum readability.

### Branding
- **Primary Navy (`#003087`)**: Trust, excellence, and institutional heritage.
- **Accent Teal (`#00A86B`)**: Growth, energy, and digital modernization.
- **NAAC Gold (`#FFC107`)**: Recognition of excellence and accreditation.

---

## 🔌 Backend & Persistence

The project utilizes a **Baton-Ready Architecture** for backend integration:

### 1. Current State: `DataStore` (localStorage)
The application currently uses a custom `DataStore` class (located in `src/lib/data/dataStore.ts`) that persists admin changes to `localStorage`. This allows for a fully functional demo and testing environment without an active backend.

### 2. Future State: API Integration
The architecture is designed for a seamless transition to a RESTful API (e.g., Laravel, Node.js). To migrate:
1. Update `src/lib/data/stores.ts` to swap `DataStore` with an API-based repository.
2. Configure environment variables in `.env`.

### Environment Configuration
Copy `.env.example` to `.env`:
```env
VITE_API_URL=http://localhost:8000/api
VITE_ENABLE_STUDENT_LOGIN=false  # Set to true to enable student portal
```

---

## 🧪 Testing & Quality

```bash
# Run type checking
npm run type-check

# Linting
npm run lint

# Build verification
npm run build
```

---

## 🎓 Support & Contacts

**College Contact**:
- **Phone**: +91 22 2522 4175
- **Email**: principal@ngacharya.edu.in
- **Address**: Chembur, Mumbai – 400 071

---

## 📄 License

© 2025 N. G. Acharya & D. K. Marathe College. All rights reserved.

---

**Developed with ❤️ for Academic Excellence.** 🚀
