# Challenge Code

## Description

Challenge Code is a web application that allows users to log in, check their balance, and update their personal details. It is developed using Node.js, Next.js, and LowDB, providing an API to manage user operations.

## Features

- Log in using email and password.
- Check user balance.
- Update user details.
- RESTful API to handle user operations.

## Technologies Used

- **Frontend**: React (Next.js)
- **Backend**: Node.js
- **Database**: LowDB
- **Authentication**: bcrypt for password encryption.

## URLs

- **Application on Vercel**: [challengecode-eight.vercel.app](https://challengecode-eight.vercel.app/)
- **API**: 
  - `GET /api/test` - Verifies that the API is working.
  - `POST /api/users` - Logs in or registers a new user.
  - `GET /api/users?id={userId}` - Retrieves user details.
  - `PUT /api/users?id={userId}` - Updates user details.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mowgly77/challenge-code.git
   cd challenge-code
