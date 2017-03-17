import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from"./Dialog";
import handleChange from '../utils/handleChange.js';
import newModule from "../less_css/newModule.css";
import {Link} from 'react-router';

import TableG from './TableG'

var NewModule = React.createClass({
	
	getInitialState:function(){
		return{
			isShowDialog:false,	
			moduleName:"",	
			newTables:[], 	//新增空白表格
			tableData:[]	//用户在表格中填写的数据
		}
	},
	showDialog:function(){
		this.setState({
			isShowDialog: true,
		});
	},
	closeDialog:function(){
		this.setState({isShowDialog:false})
	},
	deleteTable:function(key){
		let tables = this.state.newTables.concat([]);
		tables[key-1] = "";
		this.setState({
			newTables:tables
		});
	},
	checkLastTable:function(){
		/*
		0. 检查是否有上个表格
		1. 检查上个表格是否有行，并最后一行是否全填写
		2. 检查上个表格内容是否全填写（包括表格标题和表格内容）

		如果填写完全，弹窗提示：是否不再修改了，新增表格后，这个表格将不能再被修改

		*/
		// 0.
		let lastTable = this.refs[(this.state.newTables.length-1)+"_table"];
		if(this.state.newTables.length>0 && lastTable){
			//alert("newTables");
			// 1. 

			if(lastTable.getRows().length>0){
				var isLastRowEmpty = lastTable.checkLastRowEmpty();
				if(isLastRowEmpty===true){
					alert("请完整填写上个表格最后一行的内容！");
					return false
				}
			}

			// 2.
			let lastTableRowContent = lastTable.getTableValue();
			console.log(lastTableRowContent);
			let isLastTableEmpty = lastTable.checkTableEmpty(lastTableRowContent);
		
			if(isLastTableEmpty===true){
				alert("请完整填写上个表格的内容！");
				return false
			}
			let isChange = confirm("此表格是否不再修改了？确认后此表格将不能再修改！")
			if(isChange===false){
				// 取消，证明用户还要再修改
				return false
			}
			return true;
		}

	},
	newTable:function(){
		this.setState({
			newTables:this.state.newTables.concat(this.state.newTables.length+1)
		});
	},
	getTablesValue:function(){
		let lastTable = this.refs[(this.state.newTables.length-1)+"_table"];
		
		let tableDataTemp = this.state.tableData.concat([]);
		let lastTableTitle = lastTable.getTitle();

		tableDataTemp.push({
			tableTitle:lastTableTitle,
			tableRows:lastTable.getTableValue()
		});
		
		this.setState({
			tableData:tableDataTemp
		})
		return tableDataTemp
	},
	handleNewTable:function(isNewTable){
		// 当点击新增表格时，要调用的函数，主要是对最后一个表格的数据检查和保存处理

		/*
		参数说明：
		保存模块时，要处理最后一个表格的数据，此时调用本函数，
		但是不用新增表格，isNewTable就是为了区分这种情况
		*/

		/*
		新增表格时，要做的：
		
		0. 检查上个表格

		3. 新增一个表格
		4. 把上个表格所有值设为readOnly
		5. 把上个填写完毕的表格的内容保存到state
		*/

		// 0. 检查上个表格
		let isLastTableFilled = this.checkLastTable();
		if(isLastTableFilled===false){
			return;
		}

		// 3. 
		if(isNewTable===true){
			this.newTable();
		}
		
		if(this.state.newTables.length>0){
			// 4.	
			let lastTable = this.refs[(this.state.newTables.length-1)+"_table"];
			if(lastTable){
				lastTable.setTableReadOnly();
				//5. 
				this.getTablesValue();
			}
		}
	},
	prepareSaveModule:function(){
		let isLastTableFull = this.checkLastTable();
		
		// 最后一个表格内容unfullfill
		if(isLastTableFull===false){
			return
		}

		// moduleName为空
		if(!this.state.moduleName){
			alert("请输入模块名");
			return
		}
		this.showDialog();
	},
	saveModule:function(){
		/*
		保存module时要做的：
		1. 最后一个table的数据处理

		2. 传递moduleData给reducer
		*/

		let moduleData={	
			moduleName:this.state.moduleName,
			tableData:this.getTablesValue()
		}
		 console.log(moduleData);
		this.props.onSaveModule(moduleData);
	},
	render:function(){
		let dialogBody = [
			<div key="mytableContent">
				<div className="txt-fld isSureSave">
			    	<h4>确定保存模块吗？保存后将不能再次修改</h4>
			  	</div>
				<div className="btn-fld">
			  		<button id="newTableBtn" onClick={this.saveModule} className="tableBtn" type="submit"><Link to="/selectModule">确定保存</Link></button>
			  		<button id="cancelTableBtn" onClick={this.closeDialog} className="tableBtn cancelBtn" type="submit">取消</button>
				</div>
			</div>
		]
		return(
			<div className="main_center border newModule">
				<header>
					<label htmlFor="moduleName">
						模块名：
						
						<input id="moduleName" placeholder="请输入模块名"
							ref={"moduleName"} 
							type="text"
							name="moduleName"
							value={this.state.moduleName}
							onChange={this::handleChange} />
					</label>
					<div onClick={this.handleNewTable.bind(null, true)} className="addTable">新增<br />表格</div>
				</header>
				<section className="clearfix">
					
					{
						this.state.newTables.map((item, index)=>{
							if(item){
								return (<TableG 
									deleteTable={this.deleteTable.bind(null,index+1)} 
									tableIndex={index}
									key={index}
									ref={index+"_table"} />)
							}
							return;
						})
					}
				</section>
				<footer>
					<button type="button" onClick={this.prepareSaveModule} className="btn btn-primary">保存模块</button>
				</footer>
				<Dialog dialogBody={dialogBody} isShowDialog={this.state.isShowDialog} onClose={this.closeDialog} className="dialog" dialogTitle="是否保存"/>
			</div>
		);
	}
});

export default NewModule