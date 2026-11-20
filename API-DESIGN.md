QA Hub – REST API Design (v1)
Conventions
Base path: /api
Resource names: plural nouns, kebab-case (/test-cases)
Auth: Authorization: Bearer <JWT> header on every endpoint except register/login
Content type: application/json
IDs: every resource has a globally unique id
Response envelope

Success:

json
{ "success": true, "message": "OK", "data": { } }

Error:

json
{ "success": false, "message": "Validation failed", "errors": [{ "field": "title", "message": "Title is required" }] }
Paginated list
json
{
"success": true,
"message": "OK",
"data": { "items": [], "page": 1, "limit": 20, "total": 57 }
}

1. Auth
   Method Endpoint Description Success Possible errors
   POST /api/auth/register Register a new user 201 Created 400 invalid input, 409 email already exists
   POST /api/auth/login Log in, returns JWT + user 200 OK 400 invalid input, 401 wrong email or password
   GET /api/auth/me Current logged-in user 200 OK 401 missing/expired token
2. Projects
   Method Endpoint Description Success Possible errors
   GET /api/projects?page=1&limit=20 List projects 200 OK 400 invalid query, 401
   GET /api/projects/:projectId Get one project 200 OK 401, 404
   POST /api/projects Create a project 201 Created 400, 401, 403 (Admin only), 409 name exists
   PATCH /api/projects/:projectId Update some fields 200 OK 400, 401, 403, 404, 409
   DELETE /api/projects/:projectId Delete a project 204 No Content 401, 403, 404
3. Test Cases

Collection is nested under its project; a single test case is addressed by its own id (shallow nesting).

Method Endpoint Description Success Possible errors
GET /api/projects/:projectId/test-cases?status=Fail&priority=High&page=1&limit=20 List test cases of a project, filterable 200 OK 400 invalid filter value, 401, 404 project not found
POST /api/projects/:projectId/test-cases Create a test case in a project 201 Created 400, 401, 403, 404 project not found
GET /api/test-cases/:testCaseId Get one test case 200 OK 401, 404
PATCH /api/test-cases/:testCaseId Update fields, e.g. { "status": "Fail" } 200 OK 400 invalid status, 401, 403, 404
DELETE /api/test-cases/:testCaseId Delete a test case 204 No Content 401, 403, 404
Example – create a test case

Request:

POST /api/projects/100/test-cases
Authorization: Bearer eyJ...
Content-Type: application/json

{ "title": "Login with valid account", "priority": "High" }

Response 201 Created:

json
{
"success": true,
"message": "Test case created",
"data": { "id": 6, "projectId": 100, "title": "Login with valid account", "priority": "High", "status": "Untested" }
}
Example – validation error

Request body { "priority": "Urgent" } → 400 Bad Request:

json
{
"success": false,
"message": "Validation failed",
"errors": [
{ "field": "title", "message": "Title is required" },
{ "field": "priority", "message": "Priority must be one of High, Medium, Low" }
]
} 4. Status code rules
Code When
200 Successful GET / PATCH
201 Resource created (POST)
204 Successful DELETE, no body
400 Request body / query / param is invalid
401 Not logged in, or token missing / expired / invalid
403 Logged in but role not allowed
404 Resource (or its parent project) does not exist
409 Conflict with existing data (duplicate email, duplicate project name)
500 Unexpected server error – always a backend bug 5. Role permissions (draft)
Action Admin QA Dev
Create / update / delete project ✅ ❌ (403) ❌ (403)
Read projects & test cases ✅ ✅ ✅
Create / update / delete test case ✅ ✅ ❌ (403)
Update test case status ✅ ✅ ❌ (403)
Open questions
Should deleting a project also delete its test cases (cascade) or be blocked while it has test cases (409)?
Default status of a new test case: Untested (add to the Status union)?
Test Runs and Bugs endpoints – to be designed in Phase 5.
