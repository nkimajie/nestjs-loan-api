
# NestJS Loan API

This is a simple RESTful API built with NestJS to handle loan data with role-based authentication. It uses local JSON files (`staff.json` and `loan.json`) to simulate a database.

## Getting Started

### 1. Clone or Unzip

Unzip the project or clone it from the repository.

```
git clone nest-loan-api
cd nest-loan-api
```

### 2. Install Dependencies

Make sure Node.js is installed.

```
npm install
```

### 3. Start the Server

```
npm run start
```

By default, the API will run on http://localhost:3000

## Authentication

To access protected endpoints, you must log in via the `/login` route and use the returned JWT token in the `Authorization` header.

### Sample Staff Credentials

 Role        Email                    Password       
 superAdmin  edwinjohn@example.com    12345Pass      
 admin       jp@example.com           1234567Pass    
 staff       ladam@example.com        123456789Pass  

## API Endpoints

### POST /login

Logs in a staff member and returns a JWT token.

Request:
```
POST http://localhost:3000/login
Content-Type: application/json

{
  "email": "edwinjohn@example.com",
  "password": "12345Pass"
}
```

Response:
```
{
  "access_token": "<JWT_TOKEN>"
}
```

Use the token in the Authorization header for subsequent requests:
```
Authorization: Bearer <JWT_TOKEN>
```

### POST /logout

Logs out the user. No token is required.

```
POST http://localhost:3000/logout
```

### GET /loans

Returns all loan records.

- Staff will not see the `totalLoan` field.
- Admin and SuperAdmin will see all details.

Optional query:
```
GET /loans?status=active
GET /loans?status=pending
```

### GET /loans/:userEmail/get

Returns all loans associated with the given user's email.

Example:
```
GET /loans/michaelbrown@example.com/get
```

If the user has no loans:
```
{
  "loans": []
}
```

### GET /loans/expired

Returns all loans where the maturity date is in the past.

```
GET /loans/expired
```

### DELETE /loan/:loanId/delete

Deletes a loan by ID.

- Only SuperAdmin can perform this action.
- All other roles will receive a forbidden response.

Example:
```
DELETE /loan/900199/delete
```

Response:
```
{
  "message": "Loan deleted"
}
```

If not found:
```
{
  "message": "Loan not found"
}
```