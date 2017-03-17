import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import DialogBody from "./SelectTemplateDialogBody";
import Dialog from"./Dialog";

import selectTemplate from "../less_css/selectTemplate.css";

var Steps = React.createClass({
	render:function(){

		return(
			<div id="steps">
				<p className="active">STEP1  选择模板</p>
				<p>STEP2  选择模块</p>
			</div>
		);
	}
});

// 单个表格及其背景包裹层
var TemplateG = React.createClass({
	handleClick:function(){
		this.props.setSelect(this.props.index);
	},
	render:function(){
		var rowItems = [];
		this.props.rows.forEach(function(row){
			rowItems.push(
				<tr key={row.rowKey}>
					<td>{row.rowKey}</td>
					<td>{row.rowType}</td>
					<td>{row.reference}</td>
					<td>{row.note}</td>
				</tr>
			);
		});
		let activeClass= this.props.active?" active":"";
		return(
			<div className={"tableWrap dashedBg" + activeClass} onClick={this.handleClick}>
				<table className="table table-mystriped">
					<tbody>
						<tr>
							<th>Key</th>
							<th>Type</th>
							<th>Reference</th>
							<th>Note</th>
						</tr>
						{rowItems}
					</tbody>
				</table>
			</div>
		);
	}
});

// 主体部分
var MainColumns = React.createClass({
	getInitialState:function(){
		return{
			index:0
		}
	},
	handleClick:function(index){
		console.log("index",index);
		this.setState({index:index});
	},
	getSelectedID:function(){
		
		var selectedTem = this.props.templates.filter((item,index)=>{
			return index===this.state.index
		})
		return selectedTem[0].templateID;
	},
	render:function(){
		let templates = this.props.templates || []
		return(
			<section id="templatesWrap" className="clearfix">
				<div className="leftColumn" ref={(lc)=> this.leftColumn=lc }>
					{	
						templates.map((item, index)=>{
							return(<TemplateG active={index===this.state.index} setSelect={this.handleClick} index={index} rows={item.rows} key={index}/>);
						})
					}
				</div>
				<div className="rightColumn" ref={(rc)=> this.rightColumn=rc }>
					
				</div>
			</section>
		);
	}
});


var SelectTemplate = React.createClass({
	contextTypes: {
	    router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
	    return {
	      	isShowDialog: false,
	    };
	},
	showDialog:function(){
		// console.log("showDialog");
		this.setState({
			isShowDialog: true,
		});
	},
	closeDialog:function(){
		// console.log("hideDialog");
		this.setState({
			isShowDialog: false,
		});
	},
	handleSaveT:function(){
		this.props.onNewTemplate(xxx);
	},
	handleSelectT:function(){
		let docs = this.props.docs;
		if(docs[docs.length-1].isCompleted===true){
			alert("请先去项目展示页点击生成协议！");
			this.context.router.push('/');
		}
		let templateID = this.refs["mainColumns"].getSelectedID();
		console.log("templateID",templateID);
		this.props.onSelectTemplate(templateID);
	},
	render: function(){

		return(
			<div className="main_center border selectTemplate">
				<Steps />
				<MainColumns ref="mainColumns" templates = {this.props.templates}/>
				<div className="btnWrap">
					<button type="button" onClick={this.handleSelectT} className="btn btn-primary"><Link to="/SelectModule">去选模块</Link></button>
					<button type="button" onClick={this.showDialog} className="btn btn-primary">新建模板</button>
				</div>
				<Dialog dialogBody={<DialogBody onCloseDia={this.closeDialog} onSave={this.props.onNewTemplate} />} isShowDialog={this.state.isShowDialog} onClose={this.closeDialog} className="dialog" dialogTitle="新建模板"/>
			</div>
		);
	}
});

export default SelectTemplate