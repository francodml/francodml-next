//webhook.js
const fs = require('fs');
const http = require('http');
const crypto = require('crypto');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

const settings = JSON.parse(fs.readFileSync("./settings.json").toString());
const secret = settings.secret;
const repoPath = settings.repoPath;
const triggerBranch = "main";

function Log(message){
    const t = new Date();
    console.log(`[${t.toISOString()}] ${message}`);
}

Log("Created server on port 8100");
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
                Log(`Branch ${branch} is not ${triggerBranch}, ignoring.`);
                res.writeHead("406");
                res.end("Didn't match trigger branch, not deploying.");
                return;
            }
            Log("Received pull signal, determining if we should deploy...");
            //determine if there were changes to package.json using git
            exec("git fetch", {cwd: repoPath});
            const git = spawn('git', ['diff', '--name-only', 'main', 'origin/main'], {cwd: repoPath});
            let output = "";
            git.stdout.on('data', function(data) {
                output += data.toString();
            })
            const shouldUpdate = []
            git.on('close', (code) => {
                if (output.indexOf("package.json") !== -1) {
                    shouldUpdate['site'] = true;
                }
                if (output.indexOf("webhook-listener.js") !== -1) {
                    shouldUpdate['webhook-listener'] = true;
                }
            })
            if (shouldUpdate['site']) {
                const cmd = spawn("update.bat");
                Log("Launched update.bat");
                cmd.stdout.on('data', x => {
                    Log(`stdout: ${x}`);
                })
                cmd.stderr.on('data', x => {
                    Log(`stderr: ${x}`);
                })
                
                cmd.on('close', (code) => {
                    Log(`update.bat exited with code ${code}`);
                });
            }

            if (shouldUpdate['webhook-listener']){
                fs.copyFile(`${repoPath}\\webhook-listener.js`, ".\\webhook-listener.js", (err) => {
                    if (err) throw err;
                    Log("Updated webhook-listener.js, restarting via pm2");
                    exec("pm2 restart webhook-listener");
                });
            }
        }
        res.end();
    });

}).listen(8100);