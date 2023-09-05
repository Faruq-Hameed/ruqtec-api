# Ruqtec Backend API

## Summary
This is the backend API for Ruqtec, a web application. It provides various endpoints for user authentication and other functionalities.

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- bcrypt for password hashing
- cors for Cross-Origin Resource Sharing
- dotenv for environment variables
- Joi for data validation
- mailgen for email generation
- nodemailer for sending emails
- morgan for HTTP request logging
- nodemon for development server auto-reloading

## Endpoints
### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate and log in a user.
- `POST /api/auth/forgot-password`: Request a password reset email.
- `POST /api/auth/reset-password/:token`: Reset the user's password using a token.

### Other Endpoints
- `GET /`: Redirects to the Ruqtec website.
- `GET /api/*`: Returns a 404 error for invalid API endpoints.

## Getting Started
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file with your environment variables.
4. Run the development server using `npm run dev`.
5. Access the API at `http://localhost:3000`.


## Contributing
Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) for this project.

## License
This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
