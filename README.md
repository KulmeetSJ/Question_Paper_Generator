# Question_Paper_Generator

This is a web application for generating and previewing question papers. I have created a question_bank.json file currently having 4 subjects only , which are :
Maths , Physics , Chemistry , English . All these subjects have variety of questions all Easy , Medium & Hard Difficulty. Easy questions is of 2 marks each , Medium question is of 5 marks each and Hard question is of 10 marks each. 

## Prerequisites

- Node.js: Ensure you have Node.js installed. You can download it from [https://nodejs.org/](https://nodejs.org/)
- MongoDB: Set up a MongoDB database and obtain the connection URL. [https://cloud.mongodb.com/v2/64ca7e9876e97705c73ebf32#/clusters]

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/Question_Paper_Generator.git
```

### 2. Set up MongoDB

- Create a MongoDB database and obtain the connection URL.
- Paste the MongoDB connection URL in the backend_question_paper_gen/config/keys.js file with your username and password.
- Also add a secretKey in backend_question_paper_gen/config/keys.js file like this one "nQkP30sR6tUkA5vI7yGpN3sZ6wB8gA1v" , it can be anything , you can also use this in your project.



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
In server.js file , we have set the PORT = 5000 , hence this server will start at localhost:5000 , incase if your port 5000 is busy you can change it to some other port as per your choice.
Note: If you change the port here , then you will also have to change port in /frontend_question_paper_gen/src/actions/authActions.js -> line no. 11 &  /frontend_question_paper_gen/src/actions/questionPaperAction.js  -> line no.10 . Although we recommend you to not change the port as you might face difficulties in connecting it with backend .

```
nodemon server
```
This will start the backend server. If start is successful , it will display 

Server up and running on port 5000 !
MongoDB successfully connected

Now to verify different routes , you can also use postman [https://web.postman.co/workspace/My-Workspace~feaa9999-54e7-486f-851b-4c70cfde8654/request/create?requestId=6c8d6e1d-ac5f-4ece-ae10-e1932e045e8a] .This way you can ensure that backend is working properly or not. 

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


Live Demo of this project will be available soon. 


### Contributing
Feel free to contribute to this project by opening issues or submitting pull requests.


