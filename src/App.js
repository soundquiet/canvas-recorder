import React, { Component } from 'react';
import './App.css';
import RecorderView from './RecorderView';
import png from './img.png';
// import mp3_file from './vincent.mp3';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            duration: 9000, //ms
            // time:0,
            timeSlice: 10
        }
    }

	// draw_() {
	// 	setTimeout(() => {
	// 		var c=document.getElementById("canvas");
	// 		// var canvas=document.getElementById('canvas');
	// 		c.width = 800;
	// 		c.height = 600;
	// 		var ctx=c.getContext("2d");
	// 		var img=document.getElementById("png");
	// 		ctx.drawImage(img,10,10);
	// 		// this.draw1();
	// 	}, 1000)

	// }

	draw1() {
        var canvas=document.getElementById('canvas');
        canvas.width = 800;
        canvas.height = 600;
		var context=canvas.getContext('2d');
		var img=document.getElementById("png");
		context.drawImage(img,10,10);

    	
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
				context.globalAlpha = 0;
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
    	//    context.clearRect(0,0,canvas.width,canvas.height);  //清除
    	   circle.draw();   //绘制
    	   requestAnimationFrame(animation);  //循环
		}
		setTimeout(()=> {
			circle.draw();
    		animation();
		},2000);
    	
        
    }
    // var animation = null;

    render() {
        // this.draw();
        return(
            <div id="canvas-warp">
				<img id='png' src={png}></img>
                <p>
                    click 'save' to start recording a nine-second video.
                </p>
                <p>
                    click 'stop' to interrupt the ongoing recording.
                </p>
                {/* <audio id='audio' src={mp3_file} controls> </audio> */}
                <canvas id='canvas'>
                </canvas>
				<video >

				</video>
                <RecorderView canvasId='canvas'
                    timeSlice = {this.state.timeSlice}
                    duration = {this.state.duration}
                    playCanvas = {this.draw1}>   
                </RecorderView>
            </div>
            
        )
    }
}

