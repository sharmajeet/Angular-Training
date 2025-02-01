const express = require('express');
const mongoose = require('mongoose');
const { connection } = require("./connection")
const { logReqRes } = require("./middlewares/index")
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:4200', // Replace with your Angular app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Allow credentials if needed
}));

const PORT = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON request bodies
const userRoute = require("./routes/user");

//concection
connection("mongodb://127.0.0.1:27017/my-app");
app.use("/", userRoute);
app.use(logReqRes('log.txt'));
app.use(express.json());
// app.options('*', cors()); 

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server Listen On PORT : ${PORT}`)
}

)