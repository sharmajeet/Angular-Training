const File = require("../models/Files.Js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');

exports.uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "File upload failed." });
        }
        const newFile = new File({ FileName: req.file.originalname });
        await newFile.compressFile(req.file);
        await newFile.save();
        res.status(200).json({ message: "File uploaded and compressed successfully.", compressedFilePath: newFile.CompressedFilePath });
    });
};

exports.getCompressedFile = (req, res) => {
    const filePath = path.join(__dirname, '../uploads/', req.params.filename);
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send("File not found.");
        }
    });
};