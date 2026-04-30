# PRD: Institutional Backend — Laravel & MySQL

## 1. Executive Summary
This document outlines the requirements for the backend of the N. G. Acharya & D. K. Marathe College portal. The backend will provide a secure RESTful API to manage institutional data, authentication, and media assets, serving both the public frontend and the administrative dashboard.

## 2. Technology Stack
- **Framework**: Laravel 11 (PHP 8.2+)
- **Database**: MySQL 8.0
- **Authentication**: Laravel Sanctum (Token-based SPA Authentication)
- **API Specification**: JSON:API style (using Laravel Resources)
- **File Storage**: Laravel Filesystem (Local/S3)
- **Image Processing**: Intervention Image (for thumbnail generation)

## 3. Core Modules & Entities

### 3.1 Authentication & User Management
- **Admin Users**: Exclusive access to the dashboard.
- **Roles**: Super Admin (full access), Editor (content only).
- **Features**: Login, Password Reset, Profile Management.

### 3.2 Content Management (CRUD)
The backend must provide endpoints for managing the following entities:

| Entity | Key Fields | Relationships |
| :--- | :--- | :--- |
| **Notices** | Title, Category, Content, Slug, Attachment URL, Published At, Expires At, Is Important | N/A |
| **Events** | Title, Category, Date, Venue, Image, Registration Link, Highlights (JSON) | N/A |
| **Courses** | Title, Level, Duration, Seats, Eligibility, Fees, Admission Status, Active Status | BelongsTo(Department) |
| **Departments** | Name, Vision, Mission, Head Info, Establishment Year, Achievements, Facilities | HasMany(Staff, Courses) |
| **Staff/Faculty** | Name, Designation, Qualification, Experience, Bio, Email, Image | BelongsTo(Department) |
| **Infrastructure** | Name, Category, Description, Area, Capacity, Features, Gallery Images | N/A |
| **Governing Body** | Name, Designation, Image | N/A |

### 3.3 Enquiry Management
- **Contact Forms**: Store and notify admin of general enquiries.
- **Admission Enquiries**: Specialized data collection for prospective students.

## 4. API Endpoints

### 4.1 Public Endpoints (Read-Only)
- `GET /api/notices` (Paginated, filtered by category)
- `GET /api/notices/{slug}`
- `GET /api/events` (Upcoming/Past filtering)
- `GET /api/courses` (Filtered by level)
- `GET /api/departments`
- `GET /api/staff` (Filtered by department)
- `POST /api/enquiries`

### 4.2 Admin Endpoints (Protected)
- `POST /api/login`
- `POST /api/logout`
- `GET /api/admin/stats` (Dashboard overview metrics)
- `POST/PUT/DELETE /api/notices`
- `POST/PUT/DELETE /api/events`
- `POST/PUT/DELETE /api/courses`
- `POST/PUT/DELETE /api/departments`
- `POST/PUT/DELETE /api/staff`
- `POST/PUT/DELETE /api/infrastructure`
- `POST /api/media/upload` (Universal file/image uploader)

## 5. Database Schema (Draft)

### `users`
- `id`, `name`, `email`, `password`, `role`, `remember_token`, `timestamps`

### `notices`
- `id`, `slug`, `title`, `category`, `content`, `published_at`, `expires_at`, `is_important`, `attachment_path`, `attachment_name`, `posted_by`, `timestamps`

### `departments`
- `id`, `slug`, `name`, `short_name`, `description`, `vision`, `mission`, `head_name`, `head_designation`, `head_image_path`, `established`, `achievements` (JSON), `facilities` (JSON), `image_path`, `timestamps`

### `courses`
- `id`, `slug`, `department_id`, `title`, `short_title`, `level`, `duration`, `seats`, `eligibility`, `description`, `highlights` (JSON), `career_prospects` (JSON), `fees_per_year`, `image_path`, `is_active`, `admission_open`, `timestamps`

### `staff`
- `id`, `slug`, `department_id`, `name`, `designation`, `qualification`, `experience`, `specialization` (JSON), `email`, `image_path`, `publications`, `awards` (JSON), `bio`, `timestamps`

### `events`
- `id`, `slug`, `title`, `category`, `description`, `date`, `end_date`, `venue`, `image_path`, `registration_link`, `is_upcoming`, `highlights` (JSON), `timestamps`

## 6. Non-Functional Requirements
- **Performance**: API responses < 200ms.
- **Security**: 
    - CORS policy restricted to frontend domain.
    - Rate limiting (Sanctum default).
    - SQL Injection protection (Eloquent/Query Builder).
    - File upload validation (MIME types, size limits).
- **Maintainability**: PSR-12 coding standards, Feature tests for all CRUD operations.

## 7. Migration Plan
1. **Infrastructure**: Setup Laravel + MySQL.
2. **Models & Migrations**: Create tables based on schema.
3. **Seeding**: Create a `DataImporter` command to migrate current `seedData.ts` to MySQL.
4. **Auth**: Implement Sanctum for admin login.
5. **API Development**: Develop endpoints in logical order (Departments -> Staff -> Courses -> Notices/Events).
6. **Media**: Implement image upload handling with optimization.
7. **Integration**: Connect React frontend to the new API.

---

**Approval Status**: ⬜ Pending  
**Version**: 1.0.0  
**Date**: April 30, 2026
