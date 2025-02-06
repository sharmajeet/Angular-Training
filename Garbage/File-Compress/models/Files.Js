const { required } = require("joi")
const mongoose = require("mongoose")
const multer = require("multer")
const pdfCompressor = require("pdf-compressor")

const FileSchema = new mongoose.Schema(
    {
        FileName : {
            type : String,
        },
        CompressedFilePath: {
            type: String,
        }
    }
)

FileSchema.methods.compressFile = async function(file) {
    const compressedFile = await pdfCompressor.compress(file.path);
    this.CompressedFilePath = compressedFile.path;
}