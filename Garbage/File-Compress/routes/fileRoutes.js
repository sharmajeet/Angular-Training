const express = require("express");
const { uploadFile, getCompressedFile } = require("../controllers/fileController");

const router = express.Router();

// Middleware function to log requests
const logRequest = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Call the next middleware or route handler
};

// Use the middleware for all routes in this router
router.use(logRequest);

router.post("/upload", uploadFile); // Endpoint for file upload
router.get("/download/:filename", getCompressedFile); // Endpoint for downloading compressed file

router.get('/', (req, res) => {
    res.send('File routes working!');
});

module.exports = router;