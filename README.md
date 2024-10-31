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

## Database Structure

The application uses a JSON file (`db.json`) to store user data. Below is the structure of the database:

```json
{
    "users": [
        {
            "id": "1",
            "email": "user1@example.com",
            "password": "$2a$12$aiHm9iwDV3Fjuwz4cE5avOh9n3kvYNQJgMQ0he2x8NNV1HGPlm4mK", // Password: "password1"
            "name": "Usuario Uno",
            "balance": 100
        },
        {
            "id": "2",
            "email": "user2@example.com",
            "password": "$2a$12$0p0Bdb/Fjv9XDSayMlJgHuQwo.86HKFzEyDcRKHi9cvtGjn5NKkmG", // Password: "password2"
            "name": "Usuario Dos",
            "balance": 200
        },
        {
            "id": "3",
            "email": "user3@example.com",
            "password": "$2a$12$MdvhFbyMnaNxQkyTE/nSP.VBypgqXi3lQ.EIVpdWF9fgte/Ijo27i", // Password: "password3"
            "name": "Usuario Tres",
            "balance": 300
        }
    ]
}
```

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
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000`.

## Testing

To run the tests, use the following command:

```bash
npm test
```

The tests are structured to validate the login functionality using the users defined in `db.json`. You can use the following credentials for testing:

- **User 1**:
  - Email: `user1@example.com`
  - Password: `password1`
  
- **User 2**:
  - Email: `user2@example.com`
  - Password: `password2`
  
- **User 3**:
  - Email: `user3@example.com`
  - Password: `password3`

## Contributions

If you would like to contribute to the project, feel free to submit a pull request or open an issue.

## Contact

- **Name**: Roberto Erick Alcántar Rodríguez
- **Email**: robertoe.alcantara@gmail.com
- **GitHub**: [mowgly77](https://github.com/mowgly77)

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

