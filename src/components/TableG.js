import React from 'react';
import ReactDOM from 'react-dom';
import handleChange from '../utils/handleChange.js';

import MyRow from "./MyRow";

var TableG = React.createClass({
	getInitialState:function(){
		return{
			emptyRows:[],	// 新增空行
			tableTitle:"", 	// table名
			rowsContent:[], // 各行填入的内容
			activeRow:null,	//被选中行的index
			isAddRowAbled:true, //是否可以添加行
			isDelRowAbled:true  //是否可以删除行
		}
	},
	handleDelTable:function(){	
		this.props.deleteTable();
	},

	checkLastRowEmpty:function(){
		// 检查最后一行(上一行)是否全部填写
		//必须在lastRow存在的条件下调用本函数

		let lastRow = this.refs[this.state.emptyRows.length+"_MyRow"];
		let isRowEmpty = lastRow.checkEmpty();
		//console.log(isRowEmpty);
		if(isRowEmpty===true){
			alert("请完整填写上一行内容！");
		}
		return isRowEmpty
	},
	getTableValue:function(){
		//console.log(this.state.emptyRows)
		if (this.state.emptyRows.length>0) {
			let lastRow = this.refs[this.state.emptyRows.length+"_MyRow"];

			if(this.checkLastRowEmpty()===false){
				let lastRowContent = lastRow.getValues();

				let rowsContent = this.state.rowsContent;
				console.log(lastRowContent);
				console.log(rowsContent);
				
				//为了防止重复保存最后一行的数据
				// rowsContent.length=0  代表只有一行且这行的数据未添加进state
				// ||后面代表多于一行时，最后一行的数据还没添加进state
				// 这两种情况下才需要concat
				
				if(rowsContent.length===0 || 
					(rowsContent.length>0 
						&& lastRowContent.rowKey!==rowsContent[rowsContent.length-1].rowKey
					)
				){
					console.log("concat");
					return this.state.rowsContent.concat(lastRowContent)
				}else{
					console.log("concat else");
				}

			}else{
				// console.log("lastRow.checkLastRowEmpty===true");
				return this.state.rowsContent
			}
		}else{
			// console.log("this.state.emptyRows.length=0");
			return [];
		}
	},
	getRows:function(){
		return this.state.emptyRows
	},
	saveLastRowData:function(){
		
		//在行数大于零的时候操作
		if (this.state.emptyRows.length>0) {

			let lastRow = this.refs[this.state.emptyRows.length+"_MyRow"];

			// 保存最后一行(上一行)的数据到state中
			let rowsContentTemp = [];
			rowsContentTemp= this.state.rowsContent.concat(lastRow.getValues())

			console.log(rowsContentTemp);
			
			this.setState({
				rowsContent:rowsContentTemp
			});

			// 最后一行设为只读
			lastRow.setReadOnly();	
		}
	},
	addRow:function(){
		if(this.state.isAddRowAbled){
			let rows = this.state.emptyRows;
			if(rows.length>0){

				let result = this.checkLastRowEmpty();

				// 检测最后一行是否全填，若有空的，就return
				if(result===true) return;
			}
			
			// 新增一个空行
			let newRowsTemp = rows.concat({"rowID":rows.length});
			this.setState({emptyRows:newRowsTemp});

			// 保存上一行数据到rowsContent
			this.saveLastRowData();
			// console.log(newRowsTemp);
		}else{
			alert("表格内容已不可修改！如需修改，请删除表格重来");
		}
	},
	selectRow:function(index){
		
		if(index===this.state.emptyRows.length-1){
			return;
		}
		this.setState({activeRow:index})
	},
	delRow:function(){

		// console.log(this.state.activeRow);
		// console.log(this.state.emptyRows);
		if(this.state.isDelRowAbled){
			if(this.state.activeRow!==null){
				
				let emptyRowsCopied = this.state.emptyRows.concat([])
				
				emptyRowsCopied[this.state.activeRow]="";
				// console.log(emptyRowsCopied);
				this.setState({
					emptyRows:emptyRowsCopied
				})
				
			}else{
				alert("请首先选择一行")
			}
		}else{
			alert("表格内容已不可修改！如需修改，请删除表格重来");
		}
	},
	checkTableEmpty:function(lastTableRowContent){
		// 检查这个table是否全部填写
		console.log(lastTableRowContent);
		if(this.state.tableTitle !== ""
			&&(this.state.rowsContent.length>0 ||(lastTableRowContent.length>0)))
		{
			return false;
		}
		return true;
	},
	setTableReadOnly:function(){
		//把最后一个table设为只读，包括table标题、最后一行、删除行、添加行
		this.refs.tableTitle.readOnly=true;
		
		this.refs[this.state.emptyRows.length+"_MyRow"].setReadOnly();

		//删除行
		this.state.isDelRowAbled=false;

		//添加行
		this.state.isAddRowAbled=false;
	},
	getTitle:function(){
		return this.state.tableTitle
	},
	render:function(){
		
		return(
			<div className="tableWrap">
				<div className="tableNameW">
					<p>
						表名：
						<input 
							ref={"tableTitle"} 
							type="text"
							name="tableTitle"
							value={this.state.tableTitle}
							onChange={this::handleChange} />
					</p>
					
					<div>
						<button type="button" onClick={this.handleDelTable} className="btn btn-info mr10">删除表</button>
						<button type="button" ref="addRowRef" onClick={this.addRow} className="btn btn-info mr10">新增行</button>
						<button type="button" ref="delRowRef" onClick={this.delRow} className="btn btn-info mr10">删除行</button>
					</div>
				</div>
				<table className="table_myThDark">
					<tbody id="tbody">
						<tr>
							<th>名称</th>
							<th>类型</th>
							<th>引用</th>
							<th>描述</th>
						</tr>
						{
							this.state.emptyRows.map((item, index)=>{
								if(item){
									return(<MyRow 
										handleClick={this.selectRow.bind(null, index)} 
										activeClass={this.state.activeRow===index?"activeRow":""} 
										pre={index+1} 
										ref={index+1+"_MyRow"} 
										key={index+1} />)
								}
								return;
							})
						}
					</tbody>
				</table>
				
			</div>
		);
	}
});

export default TableG