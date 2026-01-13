# Student Management System

A full-stack web application for managing university student records with a RESTful API backend and React frontend.

## Technology Stack

**Backend:**
- Spring Boot 3.2.1
- Spring Data JPA
- MySQL Database
- Maven

**Frontend:**
- React 18
- JavaScript ES6
- CSS3

## Features

- Create, read, update, and delete student records
- Filter students by active status
- Email uniqueness validation
- Form validation with error messages
- Responsive user interface
- RESTful API design

## Project Structure

```
TestJava/
├── backend/                 # Spring Boot REST API
│   ├── src/main/java/
│   │   └── com/example/backend/
│   │       ├── entity/      # JPA entities (Student)
│   │       ├── repository/  # Data access layer
│   │       ├── controller/  # REST endpoints
│   │       └── exception/   # Error handling
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/               # React application
    └── src/
        ├── components/     # StudentList, StudentForm
        ├── services/       # API service layer
        └── App.js         # Main application
```

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven
- Node.js and npm
- MySQL 8.1

### Database Setup

1. Create a MySQL database:

```sql
CREATE DATABASE student_management;
```

2. Update database credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Running the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Running the Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## API Documentation

### Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| POST | `/api/students` | Create a new student | 201 Created |
| GET | `/api/students` | Get all students | 200 OK |
| GET | `/api/students?active=true` | Filter students by status | 200 OK |
| GET | `/api/students/{id}` | Get student by ID | 200 OK / 404 Not Found |
| PUT | `/api/students/{id}` | Update student | 200 OK / 404 Not Found |
| DELETE | `/api/students/{id}` | Delete student | 204 No Content / 404 Not Found |

### Student Data Model(examle of body its accepts)

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@university.com",
  "enrollmentYear": 2024,
  "active": true
}
```

### Field Requirements

| Field | Type | Constraints |
|-------|------|-------------|
| id | Long | Auto-generated primary key |
| firstName | String | Required, not blank |
| lastName | String | Required, not blank |
| email | String | Required, not blank, valid email format, unique |
| enrollmentYear | Integer | Required |
| active | Boolean | Required |

## Validation & Error Handling

### Validation Rules

- First name, last name, and email are required
- Email must be in valid format
- Email must be unique across all students
- Enrollment year and active status are required

### Error Responses

The API returns appropriate HTTP status codes with JSON error messages:

**404 Not Found** - Student doesn't exist:
```json
{
  "error": "Student not found with id: 123"
}
```

**400 Bad Request** - Validation errors:
```json
{
  "firstName": "First name is required",
  "email": "Email should be valid"
}
```

**400 Bad Request** - Duplicate email:
```json
{
  "email": "Email already exists. Please use a different email address."
}
```

## Frontend Usage

1. **Add Student**: Fill in the form at the top and click "Create"
2. **View Students**: All students are displayed in the table below
3. **Filter Students**: Use the dropdown to filter by active/inactive status
4. **Edit Student**: Click "Edit" button, modify the form, and click "Update"
5. **Delete Student**: Click "Delete" button (confirmation required)

## Development Notes

- Backend uses Spring Data JPA for database operations
- Frontend uses React Hooks (useState, useEffect) for state management
- CORS is enabled for local development
- Database schema is auto-created by Hibernate on first run

## License

I have used Claude Code to work on this project!Specifically I asked it questions regarding the architecture I wanted to follow and the database connection.
