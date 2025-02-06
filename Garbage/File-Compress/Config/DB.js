const mongoose = require('mongoose');

async function ConnectDB(URL) {
    try {
        return  mongoose.connect(URL);
    } catch (error) {
        console.error("Database connection error:", error);
        throw error; 
    }
}

module.exports = 
{
    ConnectDB
}