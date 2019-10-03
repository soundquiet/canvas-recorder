import React, { Component } from 'react';

export default class SaveVideo extends Component {
    constructor() {
        super();

        // 单例
        if (!SaveVideo.instance) {
            this.state = {
                ongoing: false
            };
            SaveVideo.instance = this;
        } else {
            return SaveVideo.instance;
        }

        this.state = {
            recorder: null, 
            recorder_timeout: null,
            full_recorded: false,
            videoData: null
        }
    }
    
    initRecoder() {
        if (this.state.ongoing) {
            return
        }
        else {
            this.setState({
                ongoing: true
            })
        }
        var canvas = document.getElementById(this.props.canvas);
        
        var stream = canvas.captureStream();
        // add audio
        // let videoOrAudioElement = document.getElementById('audio');
        // let ctx = new AudioContext();
        // let dest = ctx.createMediaStreamDestination();
        // let sourceNode = ctx.createMediaElementSource(videoOrAudioElement);
        // sourceNode.connect(dest);
        // videoOrAudioElement.play();
        // sourceNode.connect(ctx.destination);
        // let audioTrack = dest.stream.getAudioTracks()[0];

        // stream.addTrack(audioTrack);

        // var recorder = new MediaRecorder(stream, { mimeType: "video/webm"});
        
        var videoData = [];
        var recorder = new MediaRecorder(stream, { mimeType: "video/webm"});

        this.setState({
            recorder: recorder
        })

        recorder.onstart = () => {
            console.log("start")
            // 播放视频
            this.props.draw();
            // 根据时间停止录制
            var recorder_timeout = setTimeout(() => {
                this.setState({
                    full_recorded: true
                })
                recorder.stop(); 
            }, this.props.duration + 1000);
            this.setState({
                recorder_timeout: recorder_timeout
            });
            console.log(this.state.recorder_timeout)
        }


        recorder.ondataavailable = function(event) {
            console.log("recording");
            videoData.push(event.data);   
        }

        recorder.onstop = () => {
            // 清除timeout
            if (this.state.recorder_timeout !== null) {
                clearTimeout(this.state.recorder_timeout);
                this.setState({
                    recorder_timeout: null
                })
            }
            // 如果是正常录制完毕
            if (this.state.full_recorded) {
                var url = URL.createObjectURL(new Blob(videoData, { type: "video/webm" }));
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.download = 'media.mp4';
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
            
            this.setState({
                recorder: null,
                ongoing: false
            })
        }
        
        this.startRecoder(recorder);
    }

    startRecoder(recorder) {
        recorder.start(this.props.timeSlice);
    }

    // TODO: why stop?
    stopRecorder() {
        if (this.state.recorder !== null)
            this.state.recorder.stop();
    }

    render() {
        return (
            <div>
                <button className="saving" 
                        onClick={() => this.initRecoder()}>
                    save
                </button>
                <button onClick={() => this.stopRecorder()}>
                    Interrupt
                </button>
            </div>
        )
    }
}
