const express =require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const {connection} = require("./connection")
const {logReqRes} = require("./middlewares/index")


const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON request bodies
const userRoute = require("./routes/user");

//concection
connection("mongodb://127.0.0.1:27017/my-app");
app.use("/",userRoute);
app.use(logReqRes('log.txt'));
app.use(express.json()); // Parse JSON request bodies
 // Add CORS middleware before other router.use statements
// CORS Configuration (Add credentials if needed)
app.use(cors({
    origin: 'http://localhost:4200/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true // If using cookies/auth headers
  }));
  app.options('*', cors()); // Enable preflight for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen( PORT , ()=>{
    console.log(`Server Listen On PORT : ${PORT}`)
}

)