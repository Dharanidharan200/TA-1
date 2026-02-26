# POSTMORTEM.md

## What Went Well


* Successfully delivered Level 1 core modules:

  * Auth + RBAC
  * Learning system
  * Quiz engine
  * Scheduling workflow
* Conflict detection implemented reliably
* Clean DB schema with relational integrity
* Role enforcement at API level

---

## Technical Challenges Faced

### 1. RBAC Enforcement

Ensuring permissions were enforced not only in middleware but also at service/query level required careful handling.

---

### 2. Booking Conflict Detection

Handling overlapping instructor availability required precise time-range validation queries.

---

### 3. Quiz Attempt Modeling

Designing attempts to support:

* Score calculation
* Incorrect answer review
* Multiple attempts

---

## What Went Wrong / Constraints

* Limited working hours (~6 hrs/day after office)
* Could not implement automated tests
* CI/CD pipeline not completed
* Docker setup pending

Time had to be optimized for functional delivery over infrastructure maturity.

---

## If Given One More Week

I would implement:

### Testing

* Unit tests (Auth, Booking conflicts)
* Integration tests with test DB

### DevOps

* Docker Compose
* GitHub Actions CI
* Lint + test + build pipeline

### Enhancements

* Redis caching
* Rate limiting
* Audit logs foundation (for Level 2)

---

## Key Learnings

* Importance of prioritizing acceptance criteria
* Designing RBAC early simplifies scaling
* Scheduling systems require strong conflict logic
* Timeboxing is critical in real-world delivery
