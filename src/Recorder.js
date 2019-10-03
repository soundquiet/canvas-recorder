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
            return;
        } else {
            //TODO: start recording
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