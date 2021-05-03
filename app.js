const express = require("express");
const app = express();
const PORT = 3005;
// const { spawn } = require('child_process');
// const ls = spawn('ffmpeg', ['-i', 'https://tempusipsum.com:8081/hls/777.m3u8', '-c', 'copy', 'output.mp4']);
const i18n = require("i18n");
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '500mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));
app.use(cors())
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '500mb'
}));

i18n.configure({
  locales: ['en', 'de'],
  directory: __dirname + '/locales'
});

var setLocalization = function (req, res, next) {
  if (req.query.lang) {
    i18n.setLocale(req.query.lang);
  } else if (req.header('Accept-Language')) {
    i18n.setLocale(req.header('Accept-Language'));
  } else {
    i18n.setLocale('en');
  }
  next();
};

app.use(express.static('public'));
app.use(setLocalization);

const apiV1 = require("./api/");
app.use('/api/', apiV1);

app.use(function (req, res, next) {
  var err = "Page not found";
  err.status = 404;
  res.status(404).json({ "failed": "404" });
  next(err);
});

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });


// setTimeout(() => {
//   ls.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
//     //ls.stdin.setEncoding('utf8');
//     //setTimeout(() => {
//     console.log(`10s have passed since I was scheduled`);
//     ls.stdin.write('q');
//     //process.exit();
//     //}, 10000);;
//     //process.exit();
//   });
// }, 10000);;
// ls.on('close', (code) => {
//   //ls.stdin.write('q');  
//   console.log(`child process exited with code ${code}`);
// });

const server = app.listen(PORT, () => {
  console.log(`HTTP: Server listening on port ${PORT}`);
})
