//webhook.js
const fs = require('fs');
const http = require('http');
const crypto = require('crypto');
const spawn = require('child_process').spawn;


const secret = fs.readFileSync("./secret.txt").toString();
const triggerBranch = "main";

console.log("Created server on port 8100");
http.createServer(function (req, res) {
    
    let data = '';
    let sig = '';

    req.on('data', function(chunk) {
        data += chunk;
        if (sig === '') {
            sig += "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        }
    });
    
    req.on('end', function() {
        let parsedData = JSON.parse(data);
        if (req.headers['x-hub-signature'] == sig) {
            const branch = parsedData.ref.split("/")[2];
            if (branch !== triggerBranch) {
                console.log(`Branch ${branch} is not ${triggerBranch}, ignoring.`);
                res.writeHead("406");
                res.end("Didn't match trigger branch, not deploying.");
                return;
            }
            console.log("Received pull signal, updating");
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
        res.end();
    });

}).listen(8100);