import React, { Component } from 'react'

var Dialog = React.createClass({
	getInitialState:function(){
		return{
			isShow:false,
		};
	},
	componentWillReceiveProps:function(nextProps) {
		// 接收组件属性之前根据isShowDialog的变化来判断是显示弹窗还是关闭已有弹窗
		/*console.log("will")
		console.log(this.props.isShowDialog)
		console.log(nextProps.isShowDialog)*/
		 if (!this.props.isShowDialog && nextProps.isShowDialog) {
		 	console.log("will : show")
            this.show();
        }else if (this.props.isShowDialog && !nextProps.isShowDialog) {
            console.log("will : hide")
            this.hide();
        }
	},
	show:function(){
		this.setState({isShow:true});
	},
	hide:function(){
		console.log("this.hide")
		
		if(this.props.onClose){
			this.setState({isShow:false});
			this.props.onClose();
			console.log("this.hide end")
		}
		else return;
	},
	render:function () {
		return(
			<div className="dialogW" style={{display:this.state.isShow?"block":"none"}}>
				<div id='lean_overlay' style={{opacity:0.5}} onClick={this.hide}></div>
				<div className="newTable" ref="newTable" id="newTable">
					<div className="newTable-ct">
						<div className="newTable-header">
							<h2>{this.props.dialogTitle}</h2>				
								<span style={{"display":this.props.hideClose?"none":"inline-block"}} className="glyphicon glyphicon-remove modal_close" onClick={this.hide}></span>
						</div>
						{this.props.dialogBody}
					</div>
				</div>
			</div>
		);	
	}
});

module.exports = Dialog;