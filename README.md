# The MERN Stack Blogify Project: Full Web Development Unleashed

## Description

Welcome to 'The MERN Stack Blogify Project: Full Web Development Unleashed' - an exhaustive course aimed at making you a proficient full-stack developer. This course is meticulously designed to teach you how to create a feature-rich blogging platform from the ground up using MongoDB, Express.js, React.js, and Node.js (MERN).

**Note:** This repository contains the backend codebase for the application. You can find the frontend repository [here](https://github.com/tweneboah/mern-blogify-frontend).

By working hands-on and integrating pivotal web application features using state-of-the-art technologies, you will gain practical knowledge about user authentication, file uploading, social features (following/unfollowing users), user blocking, post scheduling, and more.

As you progress, you'll learn to build robust user profiles with update capabilities and manage user-to-user interactions, along with understanding data security and user experience as you implement password reset and account verification features.

In addition, the course also encompasses advanced features like hiding posts from blocked users and obscuring scheduled posts until the specified publishing time. You will be trained in best coding practices to write efficient and maintainable code, effectively troubleshoot, and debug your application, and understand the nuances of deploying a MERN stack application to the cloud.

## Learning Outcomes

Upon course completion, you'll be equipped with the skills necessary to create and deploy web applications using the MERN stack. You would have built a fully-functional, real-world blogging platform and be well on your way to achieving your career aspirations in web development.

## Course Outline

In this course, you'll learn about:

1. **User Authentication:** Implementing secure user registration and login processes.
2. **File Upload:** Enabling users to upload files securely and efficiently.
3. **User Relationships:** Implementing social features like following/unfollowing users.
4. **User Blocking:** Creating a user blocking/unblocking system.
5. **Post Scheduling:** Enabling post scheduling for automated future publishing.
6. **User Profile:** Creating a comprehensive user profile system.
7. **Password Reset:** Securely implementing password reset functionality.
8. **Account Verification:** Implementing a user verification system.
9. **Profile Update:** Allowing users to update their profile information.
10. **Post Visibility Rules:** Modifying application visibility rules to hide posts from blocked users and scheduled posts until their publishing time.
11. **Pagination:** Implementing pagination in a web application.
12. **Filtering & Searching:** Integrating data filtering and robust search functionality.

## Prerequisites

Before you begin, ensure you have:

1. Solid understanding of React.js and its core principles.
2. Familiarity with state management using Redux.
3. Comfort with Node.js, asynchronous programming, and Express.js.
4. Familiarity with MongoDB, including CRUD operations and using MongoDB driver or Mongoose.
5. Basic understanding of RESTful APIs.
6. Proficiency in JavaScript, including ES6 features.

## Who Should Attend?

- **Frontend and Backend Developers:** Looking to expand their skillset to full-stack development.
- **Current MERN Stack Developers:** Wishing to deepen their practical experience.
- **Web Development Students:** Looking to gain hands-on experience with building a real-world application.
- **Career Switchers:** Those considering a career transition into web development.
- **Entrepreneurs and Business Owners:** Wishing to understand the mechanics behind a blogging system.
- **Coding Bootcamp Students or Graduates:** Looking for a practical, in-depth project experience.
- **Aspiring Full-Stack Developers:** Keen on learning full-stack development, particularly using MERN stack.

Join us in the MERN Blogify Project Course and

 harness the power of full-stack development to bring your innovative ideas to life!

# Installation and Setup

Here are the steps to get the backend of the MERN Stack Blogify Project up and running on your local machine:

## Prerequisites

- Node.js and npm installed on your machine.
- A MongoDB Atlas account or MongoDB installed locally.

## Steps

1. **Clone the Repository**

    Clone the backend repository from GitHub. 

    ```bash
    git clone [https://github.com/yourusername/blogify-backend.git](https://github.com/tweneboah/mern-blogify-project-course-backend)
    ```

2. **Install the Dependencies**

    Navigate into the cloned project directory and install the necessary packages using npm.

    ```bash
    cd blogify-backend
    npm install
    ```

3. **Set Up Environment Variables**

    Create a new file named `.env` in the root directory and set up your environment variables. For example:

    ```bash
    PORT=9080
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

    Replace `your_mongodb_uri` with the connection string to your MongoDB database, and `your_jwt_secret` with a secret string of your choice to be used for signing JSON Web Tokens.

4. **Start the Server**

    Now, you can start the server by running the start script defined in `package.json`.

    ```bash
    npm start
    ```

    The server should start running on http://localhost:5000 or your specified PORT, and connect to the MongoDB database.

Congrats! You have successfully set up the backend of the MERN Stack Blogify Project on your local machine. For details on the API routes you can use, refer to the API Documentation section.

## Contributing

For contribution guidelines, refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

The project is licensed under the MIT license. For more details, refer to [LICENSE.md](./LICENSE.md).
