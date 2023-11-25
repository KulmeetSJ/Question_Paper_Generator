# Question_Paper_Generator

This is a web application for generating and previewing question papers.

## Prerequisites

- Node.js: Ensure you have Node.js installed. You can download it from [https://nodejs.org/](https://nodejs.org/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Question_Paper_Generator.git
```

### 2. Navigate to the project directory

```
cd Question_Paper_Generator
```

### 3. Navigate to the frontend and backend separately in different terminals

```
cd frontend_question_paper_gen
cd backend_question_paper_gen

```

### 4. Install dependencies

Run npm install in both directories to install all the dependencies 
```
npm install
```

Make sure to add ```nodemon server.js``` inside scripts in /backend_question_paper_gen/package.json
Your scripts should be similar to this -> 
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  },
  
### 5 . Run the development server

Now in  /backend_question_paper_gen , to start the server run this command to start backend server 

```
nodemon server
```
This will start the backend server. If start is successful , it will display 

Server up and running on port 5000 !
MongoDB successfully connected

And to start frontend server , navigate to /frontend_question_paper_gen simply run this command:

```
npm start 
```
This will start the development server. Open http://localhost:3000 in your web browser to view the app.


### Additional Scripts
### Build the app for production

```
npm run build
```
This will create a build directory with the optimized and production-ready build of your app.


### Contributing
Feel free to contribute to this project by opening issues or submitting pull requests.




