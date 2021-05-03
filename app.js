const { spawn } = require('child_process');
const ls = spawn('ffmpeg', ['-i', 'https://tempusipsum.com:8081/hls/777.m3u8','-c','copy','output.mp4']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});


setTimeout(() => {
ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
    //ls.stdin.setEncoding('utf8');
//setTimeout(() => {
	console.log(`10s have passed since I was scheduled`);
    ls.stdin.write('q');
	//process.exit();
//}, 10000);;
    //process.exit();
});
}, 10000);;
ls.on('close', (code) => {
//ls.stdin.write('q');  
console.log(`child process exited with code ${code}`);
});

