import React, { Component } from 'react';
import Recorder from './Recorder';

const recorder = new Recorder();

export default class RecorderView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //TODO: init state
        }
    }

    startRecoder() {
        let {canvasId, duration, timeSlice, playCanvas} = this.props;
        // playCanvas();
        setTimeout(() => {
            recorder.start(canvasId, duration, timeSlice, playCanvas)
                .then(function(video) {
                    var url = URL.createObjectURL(new Blob(video, { type: "video/webm" }));
                    const link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    link.download = 'media.mp4';
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                },function(error) {
                    console.log(error);
                })
                .catch(function(error) {
                    //TODO: deal with the error
                    console.log(error);
                });
        }, 2000);
        // recorder.start(canvasId, duration, timeSlice, playCanvas)
        //         .then(function(video) {
        //             var url = URL.createObjectURL(new Blob(video, { type: "video/webm" }));
        //             const link = document.createElement('a');
        //             link.style.display = 'none';
        //             link.href = url;
        //             link.download = 'media.mp4';
        //             document.body.appendChild(link);
        //             link.click();
        //             link.remove();
        //         },function(error) {
        //             console.log(error);
        //         })
        //         .catch(function(error) {
        //             //TODO: deal with the error
        //             console.log(error);
        //         });
    }

    stopRecorder() {
        recorder.stop();
    }

    render() {
        return (
            <div>
                <button className="saving" 
                        onClick={() => this.startRecoder()}>
                    Record
                </button>
                <button onClick={() => this.stopRecorder()}>
                    Stop
                </button>
            </div>
        )
    }
}