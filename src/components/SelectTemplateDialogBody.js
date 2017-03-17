import React from 'react';
import ReactDOM from 'react-dom';
import MyRow from './MyRow.js';

var SelectTemplateDialogBody = React.createClass({
	getInitialState:function(){
		return{
			emptyRows:[],
			rowsContent:[]
		}
	},

	// 检查上一行（最后一行）是否全部填写，当全部填写时，就保存上一行数据到state中
	handleLastRow:function(isAddRow){
		// 检查最后一行是否全部填写
		let lastRow = this.refs[this.state.emptyRows.length+"_MyRow"];
		let isRowEmpty = lastRow.checkEmpty();
		let rowsContentTemp = [];
		if(isRowEmpty===true){
			alert("请完整填写上一行内容！");
			return isRowEmpty;
		}

		// 保存最后一行的数据到state中
		rowsContentTemp= this.state.rowsContent.concat(lastRow.getValues())
		this.setState({
			rowsContent:rowsContentTemp
		});
		if(isAddRow===true){
			// 如果是新增行调用，就设为上一行只读
			lastRow.setReadOnly();	
		}
		return rowsContentTemp;
		// 需要判断上一行内容是否为空时，与true进行比较即可：if(xxx===true)
		// 不同情况返回了两种不同类型的值，造成理解上的难点，下次应避免
	},
	addRow:function(){
		let rows = this.state.emptyRows;
		if(rows.length>0){
			let result = this.handleLastRow(true);
			if(result===true) return;
		}
		
		// 新增一行
		let newRowsTemp = rows.concat({"rowID":rows.length});
		this.setState({emptyRows:newRowsTemp});
	
	},
	handleSave:function(){
		// 新建模板弹窗中点击保存
		let rowsContentTemp = this.handleLastRow(false);
		if(rowsContentTemp===true) return;	
		this.props.onSave(rowsContentTemp);
		this.setState({
			emptyRows:[],
			rowsContent:[]
		});
		this.props.onCloseDia();
	},
	/*componentDidUpdate:function(prevProps,prevState){
		console.log("update");
		console.log(this.state.emptyRows);
		console.log(prevState.emptyRows);
		if(this.state.emptyRows.length>prevState.emptyRows.length){
			console.log("readonly");
			this.refs.xx.readOnly = true;
		}
	},*/

	handleCancel:function(){
		// 新建模板弹窗中点击取消按钮
		// 清空数据
		this.setState({ 
			emptyRows:[],
			rowsContent:[]
		})
		this.props.onCloseDia();
	},
	render:function(){
		return(
			<div key="mytableContent" className="mg35">
				<table className="table table-mystriped">
					<tbody>
						<tr>
							<th>Key</th>
							<th>Type</th>
							<th>Reference</th>
							<th>Note</th>
						</tr>
						{
							this.state.emptyRows.map((item, index)=>{
							
								return(<MyRow pre={index+1} ref={index+1+"_MyRow"} key={index+1} />)
							})
						}
					</tbody>
				</table>
				<div className="addRow" onClick={this.addRow}>+</div>
			  	<div className="btn-fld">
			  		<button id="newTableBtn" onClick={this.handleSave} className="tableBtn" type="submit">保存模板</button>
			  		<button id="cancelTableBtn" onClick={this.handleCancel}  className="tableBtn cancelBtn" type="submit">取消</button>
				</div>
			</div>
		)
	}
});

export default SelectTemplateDialogBody