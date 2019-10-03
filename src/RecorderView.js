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
        let {canvasId, duration} = this.props;
        //TODO: start recorder
        recorder.start(canvasId, duration);
    }

    stopRecorder() {
        //TODO: stop recorder
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
