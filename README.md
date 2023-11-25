# BlockBuster

Backend server for movie rental management .
The server was developed in Node.js and Express. The architecture is divided into Business
and Data Layers and is implemented by REST API calls with CRUD.
The server manages a log File (using FS) and a Database in MongoDB which is accessed with Mongoose ODM.
The routers were secured with the use of JWT for authentication and authorization.
Automation tests were performed (unit and integration tests) and Features were built using TDD.
Currently working on a client side using React.
