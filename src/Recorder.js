export default class Recorder {
    constructor() {
        if (!Recorder.instance) {
            //TODO: some initialation
            this.isRecording = false;
            Recorder.instance = this;
        } else {
            return Recorder.instance;
        }
    }

    start(canvasId, duration) {
        if (this.isRecording) {
            return new Promise((resolve, reject) => {
                let error = 'is recording';
                reject(new Error(error));
            })
        } else {
            return new Promise((resolve, reject) => {
                //TODO: start recording
                let success = true;
                if (success) {
                    let video = ''; // video to save
                    resolve(video);
                } else {
                    let error = 'something wrong!';
                    reject(new Error(error));
                }
            })
        }
    }

    stop() {
        if (!this.isRecording) {
            return;
        } else {
            //TODO: stop recording
        }
    }
}