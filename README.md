# 🏫 Multi-Tenant Bangladeshi School & College Management System (SaaS)

A production-ready, highly responsive Multi-Tenant School & College Management SaaS platform tailored for the Bangladeshi education ecosystem (NCTB Curriculum, Primary, High School, College / HSC, and Madrasah).

---

## 🌟 Key Features

- **🏛️ Multi-Tenancy Architecture:** Single Database with `tenant_id` row-level isolation, dynamic subdomain (`subdomain.edumanage.bd`) & custom domain (`maneschool.site.je`) routing.
- **👑 Role-Based Access Control (RBAC):** Super Admin (SaaS Platform), School Admin (Principal), Teacher, Accountant, Student, Guardian.
- **🎓 Bangladesh NCTB GPA 5.0 Grading Engine:**
  - Standard scale: A+ (5.0), A (4.0), A- (3.5), B (3.0), C (2.0), D (1.0), F (0.0).
  - Creative (CQ), MCQ, Practical (PR), Continuous Assessment (CA) breakdown.
  - **4th Subject Bonus Point Rule:** Points above 2.0 GPA added as bonus to total GPA.
  - Printable official Tabulation Sheets and Examination Admit Cards.
- **👥 Student Management & Dual-Sided ID Cards:** Student admission registry, roll number generation, and printable PVC/A4 ID card generator with barcode, photo, blood group, and principal signature.
- **📅 Daily Attendance & 1-Click Absent SMS:** Classroom roll call matrix with automated Bangla SMS alerts sent directly to absent students' guardians.
- **💳 Fees POS & 3-Part Money Receipts:** Fast student fee collection counter supporting Cash, bKash Merchant Checkout, and Nagad with printable 3-part vouchers (Student Copy, School Copy, Bank Copy).
- **⏰ Weekly Class Routine Matrix:** 6-day period schedule matrix (Saturday to Thursday).
- **📢 Notice Board & Bulk SMS Portal:** GreenwebBD / BulkSMSBD masking & non-masking SMS gateway with live Bangla Unicode character counter.
- **💰 Faculty Payroll & Accounts:** Staff salary disbursement, payslip generator, and institutional income/expense cash book ledger.

---

## 📁 Repository Structure

```
├── backend/                  # Modular PHP REST API Backend
│   ├── config/               # Database & Gateway credentials
│   ├── database/             # schema.sql & seeder.sql
│   ├── public/               # API Gateway entrypoint (.htaccess, index.php)
│   └── src/                  # Core, Middleware, Services, Controllers
│
├── frontend/                 # Modern React 18 + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/       # Common UI, Printables (ID cards, Tabulation, Receipts)
│   │   ├── pages/            # Dashboards (Super Admin, Principal, POS, Routine, etc.)
│   │   ├── services/         # Axios API client & Zustand state store
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── cpanel_ready/             # Pre-configured build ready for direct upload to cPanel / htdocs
│   ├── index.html            # Production React SPA
│   ├── .htaccess             # Apache API & SPA rewrite rules
│   ├── import_to_phpmyadmin.sql # 1-Click phpMyAdmin database import
│   ├── api/                  # PHP API Gateway
│   ├── config/               # Pre-configured database connections
│   └── src/                  # PHP Modular Core & Controllers
│
└── demo_standalone_preview.html # Instant zero-dependency browser preview
```

---

## 🚀 Live Hosting Configuration (`maneschool.site.je`)

- **Domain:** `https://maneschool.site.je`
- **MySQL Host:** `sql101.infinityfree.com`
- **Database:** `if0_42784359_myscmanagement`

---

## 💻 Local Development Setup

### 1. Backend (PHP)
```bash
cd backend
php -S localhost:8000 -t public
```

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 📜 License
MIT License. Developed for Bangladeshi Educational Institutions.
