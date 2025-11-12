//1 import express
const express = require('express');

//5 import db connection
const db=require('./config/db');

//6 import cors
const cors = require('cors');

//7 import routes
const router = require('./router/route');


//2 app creation
const bookstoreServer = express();

//8 use cors
bookstoreServer.use(cors());

//9 use json
bookstoreServer.use(express.json());

//10 use routes
bookstoreServer.use(router);

//3 port connect
const port =3000;

//4 start the server
bookstoreServer.listen(port,()=>{
    console.log("Server started on port",port);
});