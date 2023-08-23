# Mern Stack CRUD Web Application

## Backend Development

The backend of this application is built using Node.js, Express.js, and Mongoose. The MongoDB database is used to store and manage user data. The backend provides RESTful API endpoints to perform CRUD operations on the "users" collection in the database.

### Endpoints:

- **GET /users**: Get all users.
- **POST /users**: Create a new user.

### Input Validation and Error Handling:

- The API endpoints perform input validation to ensure that the provided data meets the required criteria.
- Proper error handling is implemented to provide appropriate error responses to the frontend.

## Frontend Development

The frontend of this application is built using React.js. It allows users to interact with the backend API endpoints through a user interface.

### Features:

- Display a list of users retrieved from the backend API.
- Implement a form to create a new user and send the data to the backend API.
- Allow updating and deleting users from the frontend interface.

### Client-Side Input Validation and Error Handling:

- Client-side input validation is implemented to validate user input before sending it to the backend.
- Error messages are displayed to the user in case of invalid input or API errors.

## Additional Tasks

The application includes optional tasks that, if completed, will earn bonus points:

- **User Authentication using JWT**: Implement user authentication using JSON Web Tokens to secure the API endpoints.
- **Pagination and Sorting**: Add pagination and sorting functionality to the user listing page.
- **Search Functionality**: Implement search functionality to filter users based on specific criteria.

## Submission Guidelines

1. Create a Git repository and commit your code regularly as you work on the assignment.
2. Include this README file with clear instructions on how to set up and run your project.
3. Push your code to a public repository (GitHub, GitLab, etc.).
4. Share the repository URL with us via email at hr@digisidekick.com.

## Evaluation Criteria

Your submission will be evaluated based on the following criteria:

- Understanding of the MERN stack and ability to set up the development environment.
- Implementation of a RESTful API with proper input validation and error handling.
- Frontend development skills using React.js, including proper state management and UI implementation.
- Code organization, clarity, and adherence to best practices.
- Completion of optional tasks for bonus points (if applicable).
