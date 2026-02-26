# PLAN.md

## 72-Hour Execution Plan

**Work Constraint:**
I am currently employed full-time and worked on this assessment after 7 PM daily.

**Average time spent:** ~6 hours/day
**Total effective hours:** ~18–20 hours

---

## Day 1 — Architecture & Auth Foundation

**Time Spent:** 6 hrs

### Completed

* Project setup (Monorepo structure)
* Backend: Node.js + Express initialization
* PostgreSQL schema design
* ORM setup (Prisma/Sequelize)
* Authentication:

  * JWT login
  * Password hashing (bcrypt)
  * Refresh token flow
* RBAC middleware
* Role seeding (Admin / Instructor / Student)

### Notes

Auth + RBAC were prioritized first as they are the foundation for all modules.

---

## Day 2 — Learning Module (Maverick-lite)

**Time Spent:** 6 hrs

### Completed

* Course → Module → Lesson hierarchy
* Lesson types:

  * Text lessons
  * MCQ quizzes
* Quiz attempt storage
* Score calculation
* Incorrect answers review
* Pagination on course/module lists
* Search by title

### Notes

Focused on making quiz flow fully functional end-to-end.

---

## Day 3 — Scheduling Module (Skynet-lite)

**Time Spent:** 6–8 hrs

### Completed

* Instructor availability management
* Student booking requests
* Admin approval flow
* Conflict detection logic
* Weekly calendar API
* Role-based booking visibility

---

## What Was Shipped

* Full Auth + RBAC
* Learning module with quizzes
* Scheduling with conflict detection
* Clean REST APIs
* PostgreSQL integration
* Role-aware backend guards

---

## What Was Not Covered

Due to time constraints:

* Automated testing
* CI/CD pipeline
* Docker Compose
* Cloud deployment

These are documented in CUTS.md and POSTMORTEM.md.
