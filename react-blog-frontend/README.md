# Nodejs Blog REST API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This repository contains a straightforward React blog application with a RESTful API integration, designed specifically for educational purposes, particularly for teaching on Udemy. It serves as a practical example of how to integrate React with a backend API built using Node.js.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technology](#technology)
- [Decision](#decision)
- [License](#license)

## Installation

Install MongoDb Database

```bash
git clone git@github.com:jahidhiron/raect-blog-app.git
cd raect-blog-app
npm install
```

## Usage

```bash
npm start
```

## Features

- Authentication and Authorization
- Add, Update, Delete blog posts
- Search and filter blogs with pagination
- Sending email
- Scalable and well-documented codebase


## Technology

1. I have used `react.js` to handle client side UI
2. Used `axios`. It is a promised-based HTTP client for JavaScript.
3. For client side route management I have used `react-router-dom`
4. `react-toastify` is used to show success/error message
5. `react-bootstrap` is used to show modal


## Decision

1. `Why react.js?: ` It provides state-of-the-art functionality and is an excellent choice for developers looking for an easy-to-use and highly productive JavaScript framework. Using React, you can build complex UI interactions that communicate with the server in record time with JavaScript-driven pages. It also provide `virtual DOM` which provides more performant.
2. I have used pagination instead of loading all data at a time. Initially, it loads 10 items
3. Authentication, authorization, user verify, recover password are added to this app


## License

This project is licensed under the MIT License.






react-blog-app/
│
├── public/                      # Public assets
│   ├── vite.svg                 # Vite logo
│   
│__react-blog-backend/
│   ├── routes/
│   │   ├── posts.js
│   │   └── ...           # Other routes
│   ├── server.js
│   ├── .env.development
│   └── ...              # Other files
│
├── src/                         # Source code
│   ├── assets/                  # Static assets like images and styles
│   │   ├── css/                 # CSS files
│   │   │   ├── main.css         # Main styles
│   │   │   ├── form.css         # Form styles
│   │   │   └── post.css         # Post styles
│   │   └── ...                  # Other assets
│   │
│   ├── components/              # Reusable components
│   │   ├── context/             # Context providers
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── layout/              # Layout components
│   │   │   └── PublicLayout.jsx # Public layout component
│   │   └── ...                  # Other components
│   │
│   ├── pages/                   # Page components
│   │   ├── Home.jsx             # Home page
│   │   ├── Login.jsx            # Login page
│   │   ├── Signup.jsx           # Signup page
│   │   ├── ForgotPassword.jsx   # Forgot password page
│   │   ├── Profile.jsx          # Profile page
│   │   ├── Setting.jsx          # Settings page
│   │   ├── VerifyUser.jsx       # User verification page
│   │   ├── category/            # Category-related pages
│   │   │   ├── CategoryList.jsx # List categories
│   │   │   └── NewCategory.jsx  # Create new category
│   │   ├── post/                # Post-related pages
│   │   │   ├── NewPost.jsx      # Create new post
│   │   │   ├── PostList.jsx     # List posts
│   │   │   ├── DetailPost.jsx   # Post details
│   │   │   └── UpdatePost.jsx   # Update post
│   │   └── ...                  # Other pages
│   │
│   ├── utils/                   # Utility functions
│   │   └── axiosInstance.js     # Axios instance with interceptors
│   │
│   ├── validators/              # Form validation functions
│   │   ├── loginValidator.js    # Login form validation
│   │   ├── signupValidator.js   # Signup form validation
│   │   ├── profileValidator.js  # Profile form validation
│   │   ├── sendCodeValidator.js # Send code form validation
│   │   └── addPostValidator.js  # Add post form validation
│   │
│   ├── App.jsx                  # Main application component
│   └── main.jsx                 # Application entry point
│
├── .gitignore                   # Git ignore file
├── .eslintrc.cjs                # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # NPM package configuration
├── package-lock.json            # NPM lock file
├── README.md                    # Project documentation
└── vite.config.js               # Vite configuration
