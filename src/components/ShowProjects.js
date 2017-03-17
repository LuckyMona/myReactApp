import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Link,withRouter/*,Lifecycle,RouteContext*/ } from 'react-router';

import Dialog from"./Dialog";

import showProjects from "../less_css/showProjects.css";

var ProjectItem = React.createClass({
	
	getInitialState: function() {
	    return {
	      	isShowDocs: false,
	    };
	},

	handleClick:function(e){
		
		if(e.target.tagName.toLowerCase()==="a"){
			return;
		}
		this.setState({isShowDocs:!this.state.isShowDocs});
	},
	clickLink:function(){
		// 点击Link的时候传递选择的projectID给父组件的方法
		this.props.getProjID(this.props.projID, this.props.projName);
	},
	
	render: function(){
		/*var docs = [];*/
		/*if(this.props.project.docs === undefined) {
			this.props.project.docs=[]
		}; 

		this.props.docs.

		this.props.docs.forEach(function(doc, index){
			docs.push(<li key={index}><Link to="/showDoc">{doc}</Link></li>);
		});*/

		var ulClass = this.state.isShowDocs?"activeUl":"";
		//console.log(this.props.docs);
		return(
			<div className="project_g">
				<h3 onClick={this.handleClick}>{this.props.project.projectName}<Link onClick={this.clickLink} to="/SelectTemplate">新建协议</Link></h3>
				<ul className={ulClass}>
				{
					this.props.docs.map((item, index)=>{
						return <li key={index}><Link to={`/showDoc/${item.docID}`}>{item.docID}</Link></li>
					})
				}
				</ul>
			</div>
		);
	}
});

var ShowProjects = React.createClass({
	
	/*componentDidMount:function() {
	   this.props.router.setRouteLeaveHook(this.props.route, (a) => {
	    	alert("router");
	    	//alert(a);
	      if (!this.state.unsaved)
	        return 'You have unsaved information, are you sure you want to leave this page?'
	    })
		console.log(this.props.router)
	},*/
	getInitialState: function() {
	    return {
	      	isShowDialog: false,
	    };
	},
	childContextTypes : {
	    router: React.PropTypes.object
	},
	showDialog:function(){
		console.log("showDialog");
		this.setState({
			isShowDialog: true,
		});
		// this.props.newProject();
	},
	closeDialog:function(){
		console.log("hideDialog");
		this.setState({
			isShowDialog: false,
		});
	},
	
	handleNewProj:function(e){
		let node  = this.refs.projectNameRef
		this.props.onNewProject(node.value.trim());
		node.value="";
		this.setState({
			isShowDialog: false,
		});
	},
	
	getProjID:function(projID,projName){
		// 把点击子组件的Link时传递过来的projID交给Container组件的方法，进而传给Action

		// console.log("getProjID:"+projID);
		this.props.selectProj(projID, projName);
	},
	render:function(){
		var projects = this.props.projects||[],
			projLen = projects.length;
		var leftProjs = projects.slice(0, Math.ceil(projLen/2));  //左边的项
		var rightProjs = projects.slice(Math.ceil(projLen/2));  //右边的项

		let dialogBody = [
		<div key="mytableContent">
		    <div className="txt-fld">
		    	<label htmlFor="">项目名</label>
		    	<input id="newTableInpt" type="text" ref="projectNameRef" className="good_input" placeholder="请输入项目名" />
		  	</div>
		  	<div className="btn-fld">
		  		<button id="newTableBtn" onClick={this.handleNewProj} className="tableBtn" type="submit">新建</button>
		  		<button id="cancelTableBtn" onClick={this.closeDialog} className="tableBtn cancelBtn" type="submit">取消</button>
			</div>
		</div>]
		
		return(
			<div className="main_center border showProjects">
		    	<button type="button" onClick={this.showDialog} className="btn btn-primary newProject">新建项目</button>
		       	<div className="projectsWrap clearfix">
					<section className="leftCol">
						{
							/*
							后续：
							在containers中传过来docs
							*/
							leftProjs.map((item, index)=>{
								let thisDocs = this.props.docs.filter((doc, index)=>{
									return doc.projID === item.projectID && doc.isCompleted===true
								})
								//console.log(thisDocs);
								return(
									<ProjectItem docs={thisDocs} project={item} getProjID={this.getProjID} projName={item.projectName} projID={item.projectID} key={item.projectName} />
								);
							})
						}
					</section>
					<section className="rightCol">
						{
							rightProjs.map((item, index)=>{
								let thisDocs = this.props.docs.filter((doc, index)=>{
									return doc.projID === item.projectID && doc.isCompleted===true
								})
								return(
									<ProjectItem docs={thisDocs} project={item} getProjID={this.getProjID} projName={item.projectName} projID={item.projectID} key={item.projectName} />
								);
							})
						}
					</section>
				</div>
				<Dialog dialogBody={dialogBody} isShowDialog={this.state.isShowDialog} onClose={this.closeDialog} className="dialog" dialogTitle="新建项目"/>
			</div>
		);
	}
});


export default withRouter(ShowProjects)


ShowProjects.propTypes = {
  onNewProject: PropTypes.func.isRequired
}