# Class Management Backend

This Flask application serves as a backend for managing classes, users, subjects, schedules, messages, and grades. The application utilizes Flask, SQLAlchemy, and Flask JWT Extended to provide a RESTful API for performing various operations related to class management.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Configure the environment variables by creating a `.env` file and adding the following:

   ```env
   FLASK_SECRET_KEY=JNDJKFJKLJJKJK
   FLASK_DEBUG=True
   FLASK_SQLALCHEMY_ECHO=True
   FLASK_JWT_SECRET_KEY=3ea06dc2676c46bbc91d8a63
   ```

4. Run the application:

   ```bash
   python app.py

   ```

5. Run the front-end
    ```bash
    npm start

    ```

   The application will be accessible at [http://127.0.0.1:5000/](http://127.0.0.1:5000/).

## Table of Contents

1. Routes
2. Authentication Blueprint
3. Dependencies
4. Usage
5. Contributing
6. License

## Routes

### User Routes
1. Get a list of all users - GET /users
Returns a list of all users.
`Sample Response:`
[
  {
    "id": 1,
    "name": "John Doe",
    "username": "john_doe",
    "email": "john@example.com",
    "is_instructor": false
  },
]
###  Get details of a specific user - GET /users/<username>
Returns details of a specific user.
`Sample Response:`
{
  "id": 1,
  "name": "John Doe",
  "username": "john_doe",
  "email": "john@example.com",
  "is_instructor": false,
  // Other user details...
}
### Create a new user - POST /users
Creates a new user based on the provided data.
`Sample Response:`
{
  "message": "User created successfully",
  "user": {
    "id": 3,
    "name": "New User",
    "username": "new_user",
    "email": "new@example.com",
    "is_instructor": false
  }
}
### Subject Routes
### Get a list of all subjects - GET /subjects
Returns a list of all subjects.
`Sample Response:`
[
  {
    "id": 1,
    "name": "Math",
    "code": "MATH101",
    "year": 2023,
    "compulsory": true,
    "addedby": 2
  },
  // Other subjects...
]
###  Get details of a specific subject - GET /subjects/<id>
Returns details of a specific subject.
`Sample Response:`
{
  "id": 1,
  "name": "Math",
  "code": "MATH101",
  "year": 2023,
  "compulsory": true,
  "addedby": 2
}
### Create a new subject - POST /subjects
Creates a new subject based on the provided data.
`Sample Response:`
{
  "message": "Subject created successfully",
  "subject": {
    "id": 3,
    "name": "Physics",
    "code": "PHYS101",
    "year": 2023,
    "compulsory": true,
    "addedby": 1
  }
}
###  Schedule Routes
1. Get a list of all schedules - GET /schedule
Returns a list of all schedules.
`Sample Response:`
[
  {
    "id": 1,
    "day": "Monday",
    "starttime": "09:00 AM",
    "endtime": "11:00 AM",
    "subject": "Math",
    "user_id": 1
  },
  // Other schedules...
]
###  Get details of a specific schedule - GET /schedule/<id>
Returns details of a specific schedule.
`Sample Response:`
{
  "id": 1,
  "day": "Monday",
  "starttime": "09:00 AM",
  "endtime": "11:00 AM",
  "subject": "Math",
  "user_id": 1
}
### Create a new schedule - POST /schedule
Creates a new schedule based on the provided data.
`Sample Response:`
{
  "message": "Schedule created successfully",
  "schedule": {
    "id": 3,
    "day": "Wednesday",
    "starttime": "02:00 PM",
    "endtime": "04:00 PM",
    "subject": "History",
    "user_id": 1
  }
}
### Authentication Routes
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in a user and obtain access and refresh tokens.
- `GET /auth/whoami`: Get details of the currently authenticated user.
- `GET /auth/refresh`: Refresh the access token.
- `GET /auth/logout`: Log out and revoke the token.

## Authentication Blueprint

The `auth_bp` Blueprint provides endpoints for user registration, login, token refresh, and logout. It handles user authentication using JSON Web Tokens (JWT). Additionally, it includes routes for obtaining information about the currently authenticated user.

# Dependencies

This Blueprint assumes the presence of the following dependencies:

- `db`: SQLAlchemy instance for database operations.
- `jwt`: JWTManager for handling JSON Web Tokens.

## Usage
Usage
`Create a new user`:

Send a POST request to /register with the user's registration data in the request body.

`Log in:`
Send a POST request to /login with the user's login credentials in the request body.

`Retrieve user details:`
After logging in, send a GET request to /whoami to get details of the authenticated user.

`Create a new subject:`
Send a POST request to /subjects with subject data in the request body.

`Retrieve a list of subjects:`
Send a GET request to /subjects to get a list of all subjects.

`Create a new schedule:`
Send a POST request to /schedule with schedule data in the request body.

`Retrieve a list of schedules:`
Send a GET request to /schedule to get a list of all schedules.

`Refresh access token:`
Send a GET request to /refresh to refresh the access token.
Logout:

Send a GET request to /logout to log out the currently authenticated user.


## Contributing

If you'd like to contribute to contribute to the project, please follow these guidelines:

-Fork the repository.
-Clone your forked repository to your local machine.
-Create a new branch for your feature.
-git checkout -b feature/your-feature-name
-Make your changes and commit them.
-Push your changes to your fork.
-git push origin feature/your-feature-name
-Open a pull request on the main repository.

Clearly describe the purpose of your pull request.
Provide steps to test your changes if applicable.
Wait for the maintainers to review and merge your pull request.


Frontend link- https://classmanagement.onrender.com/


Backend link- https://class-5x22.onrender.com/

## License

This project is licensed under the MIT License - see the LICENSE file for details.

