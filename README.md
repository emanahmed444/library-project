# 📚 Secure Library Management System (Human Security Project)

## 👥 Team Members
1. Eman Ahmed Ali (2205143) — Team Leader
2. Sara Nabil Tahawy (2205224)
3. Salma Mohamed Ali (2205216)
4. Hagar Abdelhamid Eissa (2205239)
5. Ahmed Mostafa El-Rouby (2205157)
6. Nadine Ehab Fekry (2205081)
7. Mazen Hossam (2205041)
---

## 🛠️ 1. System Architecture (Section 2.0)
[cite_start]The system is designed following a multi-layer secured architecture[cite: 12]:
* [cite_start]**Frontend Layer:** Built with React.js, handles user interaction and redirects to Keycloak for authentication using **Authorization Code Flow**[cite: 13, 18].
* [cite_start]**Security Layer (IAM):** Keycloak acts as the centralized Digital Identity and Access Management server[cite: 16].
* [cite_start]**Backend Layer (Resource Server):** Node.js (Express) responsible for validating JWT tokens, verifying expiration, and enforcing **RBAC**[cite: 14, 20].
* [cite_start]**Data Layer:** PostgreSQL database, accessible only through validated backend requests[cite: 15, 21].



---

## 🔐 2. Security Implementation (Section 4.0 & 5.0)
* [cite_start]**Identity Management:** Full Keycloak Realm (`LibraryRealm`) with dedicated clients for frontend and backend[cite: 35, 37].
* [cite_start]**Excel-Based User Import (4.2):** Automated user provisioning from `users.csv` using a custom Node.js script and **Keycloak Admin REST API** to prevent manual entry errors[cite: 41, 46].
* [cite_start]**Custom Login Theme (4.3):** A personalized login interface featuring the Library logo, specific color palette, and system name[cite: 48, 49, 50].
* [cite_start]**Role-Based Access Control (RBAC):** Three distinct roles (`admin`, `librarian`, `student`) managed in Keycloak and enforced at the API level[cite: 51, 52, 53].

---

## 📊 3. Database Schema (Section 6.0)
[cite_start]The relational database consists of three interconnected tables to manage library operations[cite: 68]:
1.  **Books:** Stores title and author information.
2.  **Categories:** Manages book classifications with unique naming constraints.
3.  **Borrows:** Tracks user borrowing history, linked to the `preferred_username` extracted from the **JWT**.

---

## 🚀 4. Setup and Run Instructions (Section 10.0)
[cite_start]Follow these steps to deploy the full system[cite: 119]:
1.  **Infrastructure:** Run `docker-compose up -d` to start Keycloak and PostgreSQL.
2.  **User Provisioning:** Run `node import-users.js` to import team members and test users.
3.  **Backend Services:** Navigate to `/backend` and run `node server.js`.
4.  **Frontend Interface:** Navigate to `/library-frontend` and run `npm start`.

---

## 🔑 5. Test Credentials (Section 11.0)
| Username | Password | Assigned Role | Permissions |
| :--- | :--- | :--- | :--- |
| `admin_lib` | `admin` | **Admin** | [cite_start]Full CRUD Operations [cite: 121, 122] |
| `librarian1`| `pass123` | **Librarian** | [cite_start]Read, Update records [cite: 121, 122] |
| `student1` | `pass123` | **Student** | [cite_start]Read-Only / Borrowing [cite: 121, 122] |

---
[cite_start]**Note:** Grading focuses on security, identity, and authorization as per project requirements[cite: 65, 125].