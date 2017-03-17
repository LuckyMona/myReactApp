import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from"./Dialog";
// import ModuleTable from"./ModuleTable";
import {Link, History} from 'react-router';

import selectModule from "../less_css/selectModule.css";

var ModuleG = React.createClass({
	getInitialState:function(){
		return{
			isSelected:false,
			isExpand:false,
			isShowVer:false,
			selectedVer:"",
			verTables:[]
		};
	},
	handleCheck:function(){
		console.log("handleCheck");
		console.log(this.state.selectedVer);
		console.log(this.state.isSelected);
		console.log(!this.state.isSelected);

		if(!this.state.selectedVer){
			console.log("not select ver");
			// 如果用户没有选版本默认使用版本列表的第一个版本
			let firstVer = "--"+this.props.module.versions[0]
			console.log(firstVer);
			this.setState({"selectedVer":firstVer});
			console.log(!this.state.isSelected);
			this.props.toggleSelect(!this.state.isSelected, firstVer);
		}else{
			console.log("select ver")
			// 调用父组件的toggleSelect方法，传递俩参数：是否选中、该模块的版本
			this.props.toggleSelect(!this.state.isSelected, this.state.selectedVer);
		}
		// 点击模块列表项的checkbox, 改变checkbox的外观
		this.setState({
			isSelected:!this.state.isSelected,
		});
	},
	handleExpand:function(e){
		// table列表的收缩展开
		if(e.target.tagName.toLowerCase() == "span"){
			this.setState({
				isShowVer:!this.state.isShowVer,
			});
		}else{
			this.setState({
				isExpand:!this.state.isExpand,
			});
		}

	},
	hideVersion:function(){
		// 关闭version列表下拉菜单
		this.setState({isShowVer:false});
	},
	handleSelectVer:function(version){
		// 切换模块版本后，模块名后加版本名
		this.setState({selectedVer:"--"+version});
		// 对应的table列表发生相应改变
		this.getVerTables(version);
		this.hideVersion();
	},
	getVerTables:function(version){
		//切换模块版本后，对应的table列表发生相应改变
		//console.log(this.props.tables);
		let verTables = this.props.tables.filter((item, index)=>{
							return (item.version===version && item.moduleID===this.props.module.moduleID)
						})
		this.setState({"verTables":verTables})
	},
	componentDidMount:function(){
		//console.log(this.props.tables)
		//console.log(this.state.selectedVer)
		//console.log(this.state.isSelected)
		//默认显示第一个version对应的tables
		this.getVerTables(this.props.module.versions[0]);
	},
	handleSelectTable:function(table){
		//左边选择table名字，右边的table对应改变
		this.props.showTable(table);
	},
	render:function(){

		let checkClass = this.state.isSelected?"glyphicon glyphicon-ok":"glyphicon";
		let selectClass = this.state.isSelected?" selected":"";
		let expandClass = this.state.isExpand?"activeUl ":"";
		let showVer = this.state.isShowVer?" showVersion":""; 
		
		return(
			<div className="project_g">
				<div className={"moduleNameW clearfix"+ selectClass}>
					<label htmlFor="ModuleName" onClick={this.handleCheck}>
						<span className={checkClass}></span>
					</label>
					<h3 id="ModuleName" onClick={this.handleExpand}>
						<strong>{this.props.module.moduleName}</strong>
						<i>{this.state.selectedVer}</i>
						<span className="caretWrap"><span className="caret"></span></span>
					</h3>
				</div>
				{/*<div className={"overlay"+showVer} onClick={this.hideVersion}></div>*/}
				<ul className={"versionW"+showVer}>
					{
						this.props.module.versions.map((item, index)=>{
							return <li key={index} version={item} onClick={this.handleSelectVer.bind(null, item)}>{item}</li>
						})
					}
				</ul> 
				<ul className={expandClass+"clearfix"}>
					{/*return <li key={index}><Link to={`/SelectModule/realTable/${this.props.module.moduleID}/${item.version}/${item.tableID}`}>{item.tableName}</Link></li>*/}
					{	
						this.state.verTables.map((item,index)=>{
							return <li key={index} onClick={this.handleSelectTable.bind(null, item)} ><a>{item.tableName}</a></li>
						})
					}
				</ul>
			</div>
		);
	}
});
var ModuleTable = React.createClass({
	
	render:function(){
		let thisTable = [];
		let tableShowed = this.props.tableShowed;
		if(!tableShowed){
			thisTable = this.props.realTables.slice(0,1);
		}else{
			
			thisTable = this.props.realTables.filter((item, index)=>{
							return(
								item.moduleID===tableShowed.moduleID 
								&& item.version===tableShowed.version
								&& item.tableID===tableShowed.tableID)
						})
		}
		thisTable = thisTable[0];
		let trArr = [];
		thisTable.rows.forEach((row, index)=>{
			trArr.push(<tr key={index}>
							<td>{row.rowKey}</td>
							<td>{row.rowType}</td>
							<td>{row.reference}</td>
							<td>{row.note}</td>
						</tr>
			);
		});
		return(
			<table className="table_myThDark">
				<tbody>
					<tr>
						<th>名称</th>
						<th>类型</th>
						<th>引用</th>
						<th>备注</th>
					</tr>
					{trArr}
				</tbody>
			</table>
		);
	}
});

var SelectModule = React.createClass({
	contextTypes: {
	    router: React.PropTypes.object.isRequired
	},
	componentWillUnmount:function(){
		// console.log("componentWillUnmount")
		if(this.props.isShowDialog1){
			
			this.props.onCloseDialog1();
		}else if(this.props.isShowDialog2){
			this.props.onCloseDialog2();
		}
	},
	/*getInitialState: function() {
	    return {
	      	isShowDialog1: false,
	      	isShowDialog2: false,
	      	selectedModules:[]
	    };
	},*/
	/*showDialog1:function(){
		//console.log("showDialog");
		this.setState({
			isShowDialog1: true,
		});
	},*/
	/*showDialog2:function(){
		//console.log("showDialog");
		this.setState({
			isShowDialog1: false,
			isShowDialog2: true,
		});
	},*/
	/*closeDialog1:function(){
		//console.log("hideDialog");
		this.setState({
			isShowDialog1: false,
		});
	},*/
	/*closeDialog2:function(){
		console.log("hideDialog");
		this.setState({
			isShowDialog2: false,
		});
	},*/
	generateDoc:function(){
		// 点击生成文档
		console.log(this.props.modules);
		let selectedModules = this.props.modules.filter((item, index)=>{
			return (typeof item.isSelected === "string")
		})

		// 如果用户不是从头开始生成协议的，比如说，生成协议后，刷新模块选择页面，再次选择模块并点击生成
		// 就弹窗提醒，之后跳转到首页
		let docs = this.props.docs
		console.log(docs)
		if(docs[docs.length-1].isCompleted===true){ 
			alert("请先去项目展示页点击生成协议！");
			//还原所有module的选择状态
			/*this.setState({selectedModules:[]});*/
			this.props.onClearModules(); // 调用容器组件传递的方法，清除模块的选择状态

			// 跳转到首页
			this.context.router.push('/')
			return;
		} 

		//显示确认模块的弹窗
		if(selectedModules.length>0){
			
			this.props.onShowDialog1();
			/*this.setState({"selectedModules":selectedModules});*/ // 弹窗确认时，显示已选择的模块
		
		}else{
			alert ("请至少选择一个模块！")
		}
	},
	handleSelect:function(moduleID,isSelected,version){
		
		// 把用户选择的模块信息通过根redux映射来的方法保存到store中		
		this.props.onToggleSelect({
			"moduleID":moduleID,
			"isSelected":isSelected,
			"version":version
		});
	},
	confirm:function(){

		let docs = this.props.docs
		
		console.log(this.props)
		console.log(docs)

		let lastDoc = docs[docs.length-1]

		let selectedModules = this.props.modules.filter((item, index)=>{
			return (typeof item.isSelected === "string")
		})

		selectedModules.map((index, item)=>{
			return(item.moduleID+"_"+item.isSelected)
		})
		console.log(selectedModules)

		let createDocReq= {
				"projectID":lastDoc.projID,
				"templateID":lastDoc.templateID,
				/*"moduleID_verIDs":["m1_v1.2", "m2_v2.2"]*/
				"moduleID_verIDs":selectedModules
		}
		console.log(createDocReq)	

		this.props.onFetchCreateDoc(createDocReq); //创建协议，异步请求

		/*console.log(this.state.selectedModules);
		this.props.onGenerateDoc(this.state.selectedModules);*/   //把选择的模块信息，传给reducer，写入store

		//还原所有module的选择状态
		/*this.setState({selectedModules:[]});*/  // 交给actions中控制

		/*this.props.onClearModules();*/ // 调用容器组件传递的方法，清除模块的选择状态

		// store中的docs的最后一项的isCompleted设为true，代表这一个doc已经完成了
		// 并且存入docID
		/*console.log("will dispatch onCompleteDoc method")
		this.props.onCompleteDoc();*/

		/*this.props.onShowDialog2() */ // 交给actions中控制 
	},
	render:function(){
		let modules = this.props.modules || []
		let selectedModules = modules.filter((item, index)=>{
			return (typeof item.isSelected === "string")
		})
		let dialogBody1 = [
			<div key="mytableContent" className="dialogBodyW">
			    <ul className="clearfix">
			    	{
			    		selectedModules.map((item, index)=>{
			    			return <li key={index}>{item.moduleName}{item.isSelected}</li>
			    		})
			    	}
			    	
			    </ul>
			  	<div className="btn-fld">
			  		<button id="newTableBtn" onClick={this.confirm} className="tableBtn" type="submit">确认模块</button>
			  		<button id="cancelTableBtn" className="tableBtn cancelBtn" onClick={this.props.onCloseDialog1} type="submit">取消</button>
				</div>
			</div>
		];
		let dialogBody2 = [
			<div className="dialogBody2" key="mytableContent">
			    <Link to="/showDoc/last">查看生成的协议>></Link>
			    <Link to="/">继续生成协议>></Link>
			</div>
		]
		return(
			<div className="main_center border selectModule">
				<div id="steps">
					<p>STEP1  选择模板</p>
					<p className="active">STEP2  选择模块</p>
				</div>
				<section className="clearfix">
					<aside>
					{
						this.props.modules.map((item, index)=>{
							return <ModuleG key={index} toggleSelect={this.handleSelect.bind(null,item.moduleID)} showTable={this.props.onShowTable} tables={this.props.tables} module={item}/>
						})
					}
					</aside>
					<article>
						<ModuleTable realTables={this.props.realTables} tableShowed={this.props.tableShowed}/>
						<div className="footerBtns">
							<Link to="/copyModule" className="btn btn-default">从已有模块复制</Link>
							<Link to="/newModule" className="btn btn-default">新建模块</Link>
							<button type="button" onClick={this.generateDoc} className="btn btn-primary">生成协议</button>
						</div>
					</article>
				</section>
				<Dialog dialogBody={dialogBody1} isShowDialog={this.props.isShowDialog1} onClose={this.props.onCloseDialog1} className="dialog" dialogTitle="确认所选模块" />
				<Dialog dialogBody={dialogBody2} hideClose={true} isShowDialog={this.props.isShowDialog2} className="dialog" dialogTitle="生成协议成功！"/>
			</div>
		)
	}

});

export default SelectModule