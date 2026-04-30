# NG Acharya Codebase Graph 📊

This document provides a visual and structural representation of the **NG Acharya & DK Marathe College** repository.

## 🏗️ Technical Stack

```mermaid
graph TD
    A["Vite 6"] --> B["React 19"]
    B --> C["TypeScript 5"]
    B --> D["Tailwind CSS 4"]
    B --> E["Framer Motion"]
    B --> F["Lucide React Icons"]
    B --> G["React Router 7"]
    B --> H["Radix UI Primitives"]
```

---

## 📂 File System Structure

```text
d:\NG Acharya\
├── dist/                    # Production build output
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── CourseCard.tsx
│   │   │   ├── EventCard.tsx
│   │   │   └── NoticeCard.tsx
│   │   └── layout/
│   │       ├── Breadcrumb.tsx
│   │       ├── Footer.tsx
│   │       ├── Navbar.tsx
│   │       ├── PageLayout.tsx
│   │       └── SocialSidebar.tsx
│   ├── lib/
│   ├── pages/
│   │   ├── HomePage.tsx          (27.8 KB — largest page)
│   │   ├── AboutOverviewPage.tsx
│   │   ├── AboutPages.tsx        (Principal, Secretary, Founders, Council, Inspiration)
│   │   ├── ContactPage.tsx
│   │   ├── CourseDetailPage.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── DepartmentDetailPage.tsx
│   │   ├── DepartmentsPage.tsx
│   │   ├── EventDetailPage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── FeeStructurePage.tsx
│   │   ├── InfrastructurePage.tsx
│   │   ├── NoticeDetailPage.tsx
│   │   ├── NoticesPage.tsx
│   │   ├── PlaceholderPages.tsx  (Admissions, Academics, Scholarships, Library, Alumni, Gallery)
│   │   ├── PlacementsPage.tsx
│   │   ├── StaffPages.tsx
│   │   └── StudentZonePage.tsx
│   ├── types/
│   ├── utils/
│   ├── App.tsx              # Root component & routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🗺️ Routing Map

All 28 routes defined in `App.tsx`:

```mermaid
graph LR
    ROOT(("/")) --- ABOUT["/about"]
    ROOT --- COURSES["/courses"]
    ROOT --- NOTICES["/notices"]
    ROOT --- EVENTS["/events"]
    ROOT --- DEPTS["/departments"]
    ROOT --- INFRA["/infrastructure"]
    ROOT --- SZ["/student-zone"]
    ROOT --- PLACE["/placements"]
    ROOT --- FEE["/fee-structure"]
    ROOT --- STAFF["/staffs"]
    ROOT --- CONTACT["/contact"]
    ROOT --- ADM["/admissions"]
    ROOT --- ACAD["/academics"]
    ROOT --- SCHOL["/scholarships"]
    ROOT --- LIB["/library"]
    ROOT --- ALUM["/alumni"]
    ROOT --- GAL["/gallery"]

    subgraph About_Section
        ABOUT --- INS["/about/inspiration"]
        ABOUT --- FND["/about/founders"]
        ABOUT --- GC["/about/governing-council"]
        ABOUT --- SM["/about/secretary-message"]
        ABOUT --- PR["/about/principal"]
    end

    subgraph Dynamic_Detail_Routes
        COURSES --- CD["/courses/:slug"]
        NOTICES --- ND["/notices/:slug"]
        EVENTS --- ED["/events/:slug"]
        DEPTS --- DD["/departments/:slug"]
        STAFF --- SD["/staffs/:slug"]
    end
```

---

## 🧩 Component Hierarchy

```mermaid
graph TD
    App["App.tsx"] --> Nav["Navbar"]
    App --> SS["SocialSidebar"]
    App --> Router["Routes (28 routes)"]
    App --> Foot["Footer"]

    Router --> HP["HomePage"]
    Router --> CP["CoursesPage"]
    Router --> EP["EventsPage"]
    Router --> NP["NoticesPage"]
    Router --> AOP["AboutOverviewPage"]
    Router --> AP["AboutPages (5 sub-pages)"]
    Router --> SP["StaffPages (list + detail)"]
    Router --> PP["PlaceholderPages (6 pages)"]
    Router --> OTH["Other Pages (8)"]

    subgraph Card_Components
        CP --> CC["CourseCard"]
        EP --> EC["EventCard"]
        NP --> NC["NoticeCard"]
    end

    subgraph Layout_Components
        Nav
        Foot
        SS
        BRD["Breadcrumb"]
        PL["PageLayout"]
    end
```

---

## 📊 Page Size Distribution

| Page | Size | Notes |
|------|------|-------|
| `HomePage.tsx` | 27.8 KB | Hero, stats, feature sections — largest file |
| `PlaceholderPages.tsx` | 16.0 KB | 6 placeholder pages bundled |
| `AboutPages.tsx` | 14.1 KB | 5 about sub-pages |
| `StaffPages.tsx` | 13.6 KB | Staff list + detail views |
| `FeeStructurePage.tsx` | 12.5 KB | Fee tables & filters |
| `StudentZonePage.tsx` | 12.4 KB | Student resources hub |
| `PlacementsPage.tsx` | 10.8 KB | Placement stats & companies |
| `CourseDetailPage.tsx` | 10.5 KB | Individual course view |
| `EventDetailPage.tsx` | 10.4 KB | Individual event view |
| `ContactPage.tsx` | 9.8 KB | Contact form & map |
| `NoticeDetailPage.tsx` | 8.2 KB | Individual notice view |
| `CoursesPage.tsx` | 7.7 KB | Courses listing |
| `AboutOverviewPage.tsx` | 5.8 KB | About landing page |
| `EventsPage.tsx` | 4.9 KB | Events listing |
| `NoticesPage.tsx` | 4.5 KB | Notices listing |
| `DepartmentsPage.tsx` | 4.4 KB | Departments listing |
| `DepartmentDetailPage.tsx` | 3.9 KB | Department detail |
| `InfrastructurePage.tsx` | 2.4 KB | Infrastructure overview |

---

## 🛠️ Key Dependencies

| Category | Libraries |
|----------|-----------|
| **Core** | React 19, Vite 6, TypeScript 5.7 |
| **Styling** | Tailwind CSS 4, `clsx`, `tailwind-merge`, `class-variance-authority` |
| **Animation** | Framer Motion 11 |
| **UI Primitives** | Radix UI (13 components: Accordion, Dialog, Tabs, Tooltip, etc.) |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod validation |
| **Data Fetching** | TanStack React Query + Axios |
| **Data Viz** | Recharts |
| **Carousel** | Embla Carousel |
| **Toasts** | Sonner |
| **Routing** | React Router DOM 7 |
| **SEO** | React Helmet Async |

---

## 🔗 Data Flow

```mermaid
flowchart LR
    subgraph Client
        UI["React Components"] --> RQ["React Query"]
        RQ --> AX["Axios"]
    end
    AX --> API["Backend API"]
    API --> DB["Database"]

    subgraph Forms
        RHF["React Hook Form"] --> ZOD["Zod Schema"]
        ZOD --> AX
    end
```
