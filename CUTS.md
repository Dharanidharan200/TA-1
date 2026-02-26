# CUTS.md

## Features Intentionally Not Implemented

### 1. Automated Testing

**Reason:**
Given limited time (~18–20 hrs total), priority was given to delivering functional backend APIs and business logic.

**Impact:**
Core flows were manually tested, but unit/integration automation is pending.

---

### 2. CI/CD Pipeline

**Reason:**
CI requires test suites to provide value. Since automated tests were not completed, CI implementation was deprioritized.

---

### 3. Docker Compose Setup

**Reason:**
Local development environment was stable. Containerization was planned but cut to prioritize feature completion.

---

### 4. Frontend UI Polish

**Reason:**
Focus remained on backend architecture and API correctness rather than advanced UX refinement.

---

### 5. Email Notifications (Scheduling)

**Reason:**
Not part of Level 1 mandatory scope. Stubbed for future implementation.

---

## Prioritization Strategy

Order of importance:

1. Authentication + RBAC
2. Learning module quiz engine
3. Scheduling conflict detection
4. API completeness
5. DevOps & testing (cut)

This ensured all acceptance criteria logic was functionally implemented.
