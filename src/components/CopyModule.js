import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from"./Dialog";
import {Link, withRouter} from 'react-router';
import copyModule from "../less_css/copyModule.css";

let ModuleG = React.createClass({
	getInitialState:function(){
		return{
			isShowVer:false,
			selectedVer:"",
		}
	},
	hideVer:function(){
		this.setState({isShowVer:!this.state.isShowVer});
	},
	handleSelect:function(){

		// 如果用户没有选版本默认使用版本列表的第一个版本
		if(!this.state.selectedVer){
			this.setState({
				selectedVer:this.props.module.versions[0]
			}); 
		}

		// 选择模块
		this.props.click();
	},
	selectVer:function(ver){
		// 切换模块版本后，模块名后加版本名
		console.log(ver);
		this.setState({selectedVer:ver});

		console.log(ver);
		this.hideVer();
		// 选择模块
		this.props.click();
	},
	getSelectedVer:function(){
		return this.state.selectedVer;
	},
	render:function(){
		
		let versionClass = this.state.isShowVer?" versionShow":"";
		/*let moduleClass = this.state.isSelected?"moduleSelected":"";*/

		return(
			<div className="project_g">
				<div className="moduleNameW clearfix">
					
					<h3 id="ModuleName" className={this.props.myclass+" clearfix"} >
						<strong onClick={this.handleSelect}>{this.props.module.moduleName} <i className={this.state.selectedVer?"showI":"hideI"}>--</i><i>{this.state.selectedVer}</i></strong>
						
						<span className="caretWrap" onClick={this.hideVer}><span className="caret"></span></span>
					</h3>
				</div>
				<ul className={"versionW"+versionClass}>
					{
						this.props.module.versions.map((item,index)=>{
							return <li key={index} version={item} onClick={this.selectVer.bind(null, item)}>{item}</li>
						})
					}
				</ul>
			</div>
		);

	}
});

let CopyModule = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState:function(){
		return{
			activeIndex:0,
			selectedModule:null
		}
	},
	handleClick:function(index,module){
		console.log(index);
		console.log(module);

		this.setState({
			activeIndex:index,
			selectedModule:module
		});
		
	},
	goModifyModule:function(){
		// 如果用户没有做出选择，默认选择第一个模块的第一个版本
		let selectedModuleID = this.state.selectedModule ?
								this.state.selectedModule.moduleID :
								this.props.modules[0].moduleID;

		let selectedVer = this.state.selectedModule ?
							this.refs[this.state.activeIndex+"_moduleG"].getSelectedVer():
							this.props.modules[0].versions[0];

		this.context.router.push("/changeModule/"+selectedModuleID+"/"+selectedVer)
	},
	/*componentDidMount:function(){
		this.props.router.setRouteLeaveHook(this.props.route, ()=>{
			if(true){
				return "xxx?"
			}
		})
		
	},*/
	render:function(){
		
		return(
			<div className="main_center border copyModule">
				<h2 className="hint">请选择一个模块，以进行复制</h2>
				<section className="clearfix">
					{
						this.props.modules.map((module,index)=>{
							let myclass = this.state.activeIndex==index?"moduleSelected":"";
							return(<ModuleG 
								key={index} 
								ref={index+"_moduleG"}
								index={index} 
								module={module} 
								myclass={myclass} 
								click={this.handleClick.bind(null, index, module)} />);
						})
					}
				</section>
				<div className="footerBtns clearfix">
					<button type="button" onClick={this.goModifyModule} className="btn btn-primary">修改模块>></button>
				</div>
			</div> 
		);
	}
});

export default withRouter(CopyModule)