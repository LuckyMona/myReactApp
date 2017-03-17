import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import Dialog from"./Dialog";

import showDoc from "../less_css/showDoc.css";

let ShowDoc = React.createClass({
	contextTypes:{
		router: React.PropTypes.object.isRequired
	},	
	componentDidMount:function(){
		alert(this.props.params.docID);
	},	
	render:function(){
		let moduleArr = [];
		let templateArr = [];
		
		let thisDocModules = [];
		let thisDocTemplate = [];
		let thisDoc = null;

		let docs = this.props.docs;

		// 根据url上传递的docID获得这个页面应该展示的doc
		if(this.props.params.docID==="last"){
			alert("lastDoc");
			thisDoc = docs[docs.length-1]
		}else{
			thisDoc = docs.filter((item, index) => {
				return item.docID === this.props.params.docID
			})

			if(thisDoc.length===0){
				alert("这个协议不存在，请回首页重新选择协议！");
				this.context.router.push("/");
			}
		}
		
		// 根据thisDoc中的module信息，渲染出module展示部分
		thisDoc.modules.forEach((module, index)=>{
			moduleArr.push(
				<li key={index}>{module.moduleName}<span>—</span>{module.version}</li>
			);
		});
		/*后续：
		1. 选择module，保存信息时，加moduleName      √ 本来就有Name
		2. showProject页面点击doc的链接，加上docID   
		*/


		// 根据thisDoc中的templateID获得template的内容
		thisDocTemplate = this.props.templates.filter((item, index)=>{
			return item.templateID === thisDoc.templateID;
		})

		this.props.docTemplates.forEach((row, index)=>{
			templateArr.push(
				<tr key={index}>
					<td>{row.key}</td>
					<td>{row.rowType}</td>
					<td>{row.reference}</td>
					<td>{row.note}</td>
				</tr>
			);
		});

		return(
			<div className="main_center border showDoc">
				<header>
					<strong>TP802</strong>
					<i>--</i>
					<span>1.0.0</span>
				</header>
				<section>
					<div className="mainW clearfix">
						<div className="modulesW dashedBg">
							<h3>模块</h3>
							<ul>{moduleArr}</ul>
						</div>
					
						<div className="templatesW dashedBg">
							<h3>模板</h3>
							<table className="table table-mystriped">
								<tbody>
									<tr>
										<th>Key</th>
										<th>Type</th>
										<th>Reference</th>
										<th>Note</th>
									</tr>
									{templateArr}
								</tbody>
							</table>
						</div>
						<button type="button" className="btn btn-primary"><Link to="/">去项目展示页>></Link></button>
					</div>
				</section>
			</div>
			
		);
	}
});

export default ShowDoc