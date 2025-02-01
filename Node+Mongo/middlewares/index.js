const FS = require('fs')
function logReqRes(fileName){
    return (req,res,next)=>{
        const start = Date.now(); // Start time for response time calculation

        res.on('finish', () => { // Listen for the finish event to log after response is sent
            const duration = Date.now() - start; // Calculate response time
            FS.appendFile(
                fileName,
                `\n ${Date.now()} : ${req.ip} | ${req.method} : ${req.path} | Status: ${res.statusCode} | Duration: ${duration}ms \n`,
                (err,data)=>{
                    if (err) {
                        console.error('Error writing to log file', err);
                    }
                }
            )
        });

        next();
    }
}

module.exports = {
    logReqRes
}