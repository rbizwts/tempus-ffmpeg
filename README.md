# tempus-ffmpeg
Tempus ffmpeg code. 

## Prerequsites
- ffmpeg extension should be installed on the local system to manipulate the streams.
- OBS studio for commencing live stream

## Intallation steps

1. clone the repository
2. npm install
3. npm start

## How this code works

1. import **tempus-ffmpeg.postman_collection.json** postman collection.
2. start stream from the OBS studio
    - Go to preferences/settings
    - Choose Stream option
    - Choose custom stream and set below details
    - server = rtmp://13.68.138.193/live
    - Stream Key = 777
3. Once streaming commenced and node server is running then call **http://localhost:3005/api/cameraStream/start-record** from the postman collection. This will start recording of ongoing live stream.
4. To end the copy of the stream call **http://localhost:3005/api/cameraStream/stop-record** API.
5. Once ended it will generate .mp4 file to the root of the app. You can play the file to check whether live stream has beeen recorded or not.

## What we want to achieve

Live stream is continuosly recording stream from IP Camera

1. We want to record portion of the stream while calling **start-record** and **end-record** API using ffmpeg or any other comand line tool.

## Server Details

Server has nginx RTMP module which converts RTMP stream to HLS for streaming over HTTP/S. The server has been configured for each stream to have 3 seconds HLS segments, which, in turn genrates files like **https://tempusipsum.com:8081/hls/777-1.ts, 777-2.ts, 777-3.ts** and so on for every 3 seconds.

HLS live stream URL has **m3u8** format like **https://tempusipsum.com:8081/hls/777.m3u8**





