//webhook.js
const fs = require('fs');
const http = require('http');
const crypto = require('crypto');
const spawn = require('child_process').spawn;


const secret = fs.readFileSync("./secret.txt").toString();
const triggerBranch = "main";

console.log("Created server on port 8100");
http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
	console.log("Received pull signal, updating");
        if (req.headers['x-hub-signature'] == sig) {

            //get branch from request body
            let branch = req.body.ref.split("/")[2];
            if (branch !== triggerBranch) {
                res.writeHead("406");
                res.end("Didn't match trigger branch, not deploying.");
                return
            }
            const cmd = spawn('update.bat');
            cmd.stdout.on("data", x => {
                console.log(`stdout: ${x}`);
            })
            cmd.stderr.on("data", x => {
                console.log(`stderr: ${x}`);
            })
            
            cmd.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        }
    });

    res.end();
}).listen(8100);