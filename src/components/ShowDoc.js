import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import Dialog from"./Dialog";

import showDoc from "../less_css/showDoc.css";

let ShowDoc = React.createClass({
	contextTypes:{
		router: React.PropTypes.object.isRequired
	},	
	/*componentDidMount:function(){
		console.log()
	},*/	
	render:function(){
		let moduleArr = [];
		let templateArr = [];
		
		let thisDocModules = [];
		let thisDocTemplate = [];
		let thisDoc = null;

		// 这里的this.props.docs是在showProjects页面请求项目列表时一起从后台请求来的
		let docs = this.props.docs;
		/*
		docs数据结构
			"docs":[
				{
					isCompleted:true, //是否已完成，三项都选择，并且提交到了服务器，就算完成
					docID:"111",

					projID:"11",
					projName:"TP803",
					
					templateID:"t11",
					modules:[
						{
							moduleID:"m11",
							moduleName:"xxx",
							isSelected:"v11",
						}
					]
				},
			]
		*/

		// 根据url上传递的docID获得这个页面应该展示的doc
		if(this.props.params.docID==="last"){
			thisDoc = docs[docs.length-1]

		}else{
			let thisDocs = docs.filter((item, index) => {
				return item.docID == this.props.params.docID
			})
			

			if(thisDocs.length===0){
				alert("这个协议不存在，请回首页重新选择协议！");
				this.context.router.push("/");
			}else{
				thisDoc = thisDocs[0];

			}
			
		}
		/*console.log(thisDoc)*/
		
		// 根据thisDoc中的module信息，渲染出module展示部分
		thisDoc.modules.forEach((module, index)=>{
			// console.log(module);
			moduleArr.push(
				<li key={index}>{module.moduleName}--{module.isSelected}</li>
			);
		});

		// 根据thisDoc中的templateID获得template的内容
		thisDocTemplate = this.props.templates.filter((item, index)=>{
			return item.templateID === thisDoc.templateID;
		})
		// console.log(this.props.templates);
		// console.log(thisDocTemplate);
		thisDocTemplate[0].rows.forEach((row, index)=>{
			templateArr.push(
				<tr key={index}>
					<td>{row.rowKey}</td>
					<td>{row.rowType}</td>
					<td>{row.reference}</td>
					<td>{row.note}</td>
				</tr>
			);
		});

		return(
			<div className="main_center border showDoc">
				<header>
					<strong>{thisDoc.projName}</strong>
					<i>--</i>
					<span>{thisDoc.docID}</span>
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