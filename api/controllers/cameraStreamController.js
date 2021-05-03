const responseHandler = require("../../utils/responseHandler");
const filessystem = require('fs');
const { spawn } = require('child_process');

var cams = new Array();
const cutStream = async (req, res) => {
    try {
        console.log("API called!");
        console.log(req.body)
        // console.log("in cut camera", req.body.urls);
        //const ls = spawn('ffmpeg', ['-i', 'https://tempusipsum.com:8081/hls/777.m3u8','-c','copy','output.mp4']);

        req.body.urls.forEach(element => {
            console.log(element);
            cams[element.camid] = spawn('ffmpeg', ['-i', element.resource, '-c', 'copy', element.camid + 'output.mp4']);
            cams[element.camid].stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                console.log(`10s have passed since I was scheduled`);
            });
            cams[element.camid].on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        });
        module.exports = { cams }
        return res.json(responseHandler.send("Success", 200, "Recording Started!"));
    }
    catch (err) {
        return res.json(responseHandler.send("failed", 500, err.message));
    }
}

const endCamStream = async (req, res) => {
    try {
        console.log("API called!");
        req.body.urls.forEach(element => {
            cams[element.camid].stdin.write('q');
        });
        console.log(cams);

        return res.json(responseHandler.send("Success", 200, "Recording Stopped!"));
    }
    catch (err) {
        return res.json(responseHandler.send("failed", 500, err.message));
    }
}

module.exports = {
    cutStream,
    endCamStream
}