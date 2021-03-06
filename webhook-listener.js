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
            exec("git pull", {cwd: repoPath}, function(err, stdout, stderr) {
                if (err) {
                    Log("Error running git pull, not deploying.");
                    return;
                }
                const git = spawn('git', ['diff', '--name-only', 'main~1', 'origin/main'], {cwd: repoPath});
                let output = "";
                Log("Running git diff...");
                git.stdout.on('data', function(data) {
                    output += data.toString();
                    Log(data.toString());
                })            
    
                git.on('close', (code) => {
                    
                    var shouldUpdate = {};

                    if (output.indexOf("package.json") !== -1) {
                        shouldUpdate.site = true;
                    }
                    if (output.indexOf("webhook-listener.js") !== -1) {
                        shouldUpdate.webhookListener = true;
                    }
                    Log(`Will perform update for: ${Object.keys(shouldUpdate).join(", ")}`);
    
                    if (shouldUpdate.site) {
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
        
                    if (shouldUpdate.webhookListener){
                        fs.copyFile(`${repoPath}\\webhook-listener.js`, ".\\webhook-listener.js", (err) => {
                            if (err) throw err;
                            res.end(); //You could consider this duplicate code, but the call further down won't run if we update the listener.
                            Log("Updated webhook-listener.js, restarting via pm2");
                            exec("pm2 restart webhook-listener");
                        });
                    }
                })
            });
        }
        res.end();
    });

}).listen(8100);