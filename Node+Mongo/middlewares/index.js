const FS = require('fs')
function logReqRes(fileName){
    return (req,res,next)=>{
        FS.appendFile(
            fileName,
            `\n ${Date.now()} : ${req.ip} | ${req.method} : ${req.path} \n`,
            (err,data)=>{
                next();
            }
        )
    }
}

module.exports = {
    logReqRes
}