import React, { Component } from 'react';
import RecorderView from './RevcorderView';
import './App.css';
// import mp3_file from './vincent.mp3';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            duration: 9000, //ms
            time:0,
            timeSlice: 10
        }
    }

    draw() {
        var canvas=document.getElementById('canvas');
        canvas.width = 800;
        canvas.height = 600;
    	var context=canvas.getContext('2d');
    	
    	var circle={                         //创建一个圆形对象
    		x:250,
    		y:250,
    		radius:50,
    		direction:'right',
    		
    		move:function(){
    			if(this.direction==='right'){
    				if(this.x<=440)
    				{
    				   this.x+=5;	
    				}
    				else
    				{
    					this.direction='left';
    				}
    			}else{
    				if(this.x>=60)
    				{
    					this.x-=5;
    				}
    				else
    				{
    					this.direction='right';
    				}
    			}
    		},
    		
    		draw:function(){
    			context.beginPath();
    			context.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
    			context.closePath();
    			context.fillStyle='blue';
    			context.fill();
    		}
    	};
    	
    	function animation()
    	{
    	   circle.move();    //更新
    	   context.clearRect(0,0,canvas.width,canvas.height);  //清除
    	   circle.draw();   //绘制
    	   requestAnimationFrame(animation);  //循环
    	}
    	circle.draw();
    	animation();
        
    }
    // var animation = null;

    render() {
        // this.draw();
        return(
            <div id="canvas-warp">
                <p>
                    click 'save' to start recording a nine-second video.
                </p>
                <p>
                    click 'interrupt' to interrupt the ongoing recording.
                </p>
                {/* <audio id='audio' src={mp3_file} controls> </audio> */}
                <canvas id='canvas' />
				
                <RecorderView
                    canvasId='canvas'
                    duration={this.state.duration}
                />
            </div>
            
        )
    }
}

