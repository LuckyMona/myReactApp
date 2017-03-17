import React from 'react';
import ReactDOM from 'react-dom';

var ModuleTable = React.createClass({
	
	render:function(){
		let thisTable = [];
		if(!this.params){
			thisTable = this.props.realTables.slice(0,1);
		}else{
			thisTable = this.props.realTables.filter((item, index)=>{
							return(
								item.moduleID===this.params.moduleID 
								&& item.version===this.params.version
								&& item.tableID===this.params.tableID)
						})
		}
		
		
		thisTable = thisTable[0];
		console.log(thisTable);

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


export default ModuleTable