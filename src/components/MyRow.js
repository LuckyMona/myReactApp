import React from 'react';
import ReactDOM from 'react-dom';
import handleChange from '../utils/handleChange.js';

var MyRow = React.createClass({
	getInitialState:function(){
		return{
	      	rowkey:"",
	      	rowType:"",
	      	rowRefer:"",
	      	rowNote:"",
		}
	},
	checkEmpty:function(){
		/*let pre = this.props.pre;
		let rowKeyRef = pre + "_rowKey",
			rowTypeRef = pre + "_rowType",
			rowReferRef = pre + "_rowRefer",
			rowNoteRef = pre + "_rowNote";*/
		if(
			this.state.rowkey
			&&this.state.rowType
			&&this.state.rowRefer
			&&this.state.rowNote
			){
			return false;
		}
		return true;
	},
	getValues:function(){
		// 返回这一行的所有填写的内容
		let lastRowContent = {
			"rowID":this.props.pre, 
			"rowKey":this.state.rowkey, 
			"rowType":this.state.rowType, 
			"reference":this.state.rowRefer,
			"note":this.state.rowNote,
		}
		console.log(lastRowContent);
		return lastRowContent
	},
	setReadOnly:function(){
		let pre = this.props.pre;
		let rowKeyRef = pre + "_rowKey",
			rowTypeRef = pre + "_rowType",
			rowReferRef = pre + "_rowRefer",
			rowNoteRef = pre + "_rowNote";
		this.refs[rowKeyRef].readOnly = true;
		this.refs[rowTypeRef].readOnly = true;
		this.refs[rowReferRef].readOnly = true;
		this.refs[rowNoteRef].readOnly = true;
	},
	selectRow:function(){
		if(this.props.handleClick){
			this.props.handleClick();
		}		
	},
	render:function(){
		let pre = this.props.pre;
		return(
			<tr className={this.props.activeClass} onClick={this.selectRow}>
				<td><input ref={pre + "_rowKey"} type="text" name="rowkey" value={this.state.rowkey} onChange={this::handleChange} className="tableInpt" /></td>
				<td><input ref={pre + "_rowType"} type="text" name="rowType" value={this.state.rowType} onChange={this::handleChange} className="tableInpt" /></td>
				<td><input ref={pre + "_rowRefer"} type="text" name="rowRefer" value={this.state.rowRefer} onChange={this::handleChange} className="tableInpt" /></td>
				<td><input ref={pre + "_rowNote"} type="text" name="rowNote" value={this.state.rowNote} onChange={this::handleChange} className="tableInpt" /></td>
			</tr>
		);
	}
})

export default MyRow