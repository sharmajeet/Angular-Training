//packages
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
require('dotenv').config()
const {ConnectDB} = require("./Config/DB")
const {fileRoutes} = require("./routes/fileRoutes")

URL = process.env.DB_URL;
if (!URL) {
    console.error("DB_URL is not defined. Please check your .env file.");
    process.exit(1); 
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve static files from uploads directory
// Routes
app.use("/api/files", fileRoutes);

ConnectDB(URL).catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
});

app.listen(process.env.PORT || 4000,()=>{
    console.log("Server is Running..")
});
