export default class Recorder {
    constructor() {
        if (!Recorder.instance) {
            this.recorder = null; // for stop recording
            this.recorder_timeout = null;
            this.isCompleted = false;

            this.isRecording = false;
            Recorder.instance = this;
        } else {
            return Recorder.instance;
        }
    }

    start(canvasId, duration, timeSlice, playCanvas) {
        if (this.isRecording) {
            return new Promise((resolve, reject) => {
                let error = 'is recording';
                reject(new Error(error));
            })
        } else {
            return new Promise((resolve, reject) => {
                this.isRecording = true

                var canvas = document.getElementById(canvasId);
                var stream = canvas.captureStream();
                // var anotherCanvas = document.getElementById('another');
                // var anotherTracks = anotherCanvas.captureStream();
                // stream.addTrack(anotherTracks);
                var videoData = [];
                var recorder = new MediaRecorder(stream, { mimeType: "video/webm"});

                this.recorder = recorder;

                recorder.onstart = () => {
                    console.log("start");
                    playCanvas();
                    // 播放视频
                    // playCanvas();
                    // 根据时间停止录制
                    this.recorder_timeout = setTimeout(() => {
                        this.isCompleted = true;
                        recorder.stop(); 
                    }, duration);
                }

                recorder.ondataavailable = function(event) {
                    console.log(event.data.size);
                    videoData.push(event.data);   
                }

                recorder.onstop = () => {
                    // 清除timeout
                    if (this.recorder_timeout !== null) { // 是被终止的
                        clearTimeout(this.recorder_timeout);
                        this.recorder_timeout = null; 
                    }
                    // 如果是正常录制完毕
                    if (this.isCompleted) {
                        resolve(videoData);
                    }
                    else {
                        reject('recording is stopped.');
                    }
                    
                    this.recorder = null; 
                    this.isRecording = false;
                    this.isCompleted = false;
                }

                recorder.onerror = (event) => {
                    let error = event.error;
                    // reject(error);

                    switch(error.name) {
                        case 'InvalidStateError':
                            alert("You can't record the video right " +
                                            "now. Try again later.");
                            break;
                        case 'SecurityError':
                            alert("Recording the specified source " +
                                            "is not allowed due to security " +
                                            "restrictions.");
                            break;
                        default:
                            alert("A problem occurred while trying " +
                                            "to record the video.");
                            break;
                    }
                }

                recorder.start(10);
                // let success = this.isCompleted;
                // if (success) {
                //     let video = this.videoData; // video to save
                //     resolve(video);
                // } else {
                //     let error = 'something wrong!';
                //     reject(new Error(error));
                // }
            })
        }
    }

    stop() {
        if (!this.isRecording) {
            return;
        } else {
            this.recorder.stop();
        }
    }
}