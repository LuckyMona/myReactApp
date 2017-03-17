import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { 
	showTable,
	toggleSelect, 
	generateDoc, 
	clearModules,
	completeDoc, 
	fetchCreateDoc,
	showDialog1,
	closeDialog1,
	showDialog2,
	closeDialog2,
	fetchModules,
	fetchRealTables } from '../actions/Actions.js'
import SelectModule from '../../components/SelectModule'

class SelectModuleC extends Component {
	componentDidMount(){
		const { dispatch } = this.props
        dispatch(fetchModules())
        dispatch(fetchRealTables())
	}
	render() {
		const { dispatch, modules, tables, realTables, tableShowed, docs, isShowDialog1, isShowDialog2} = this.props
		/*console.log({docs})
		console.log({tables})
		console.log({realTables})
		console.log({tableShowed})
		console.log({modules})*/

		return(
			<div>
				<SelectModule 
					modules={modules} 
					tables={tables} 
					realTables={realTables} 
					tableShowed={tableShowed}
					docs = {docs} // Store中存在的docs
					/*isFetchCreateDocSucc = {isFetchCreateDocSucc}*/ //创建协议时，异步请求是否成功
					isShowDialog1 = {isShowDialog1}
					isShowDialog2 = {isShowDialog2}
					onShowTable={(table)=>{dispatch(showTable(table))}} // 切换表格名时，显示表格详情
					onToggleSelect ={(selectedParams)=>{dispatch(toggleSelect(selectedParams))}} // 切换选择模块的复选框
					onGenerateDoc = {(modules)=>{dispatch(generateDoc(modules))}} // 点击生成协议按钮
					onClearModules = {()=>{dispatch(clearModules())}} // 清除模块的选择状态
					onCompleteDoc = {()=>{dispatch(completeDoc())}}
					onFetchCreateDoc = {(createDocReq)=>{dispatch(fetchCreateDoc(createDocReq))}}
					onShowDialog1 = {()=>{dispatch(showDialog1());}}
					onCloseDialog1 = {()=>{dispatch(closeDialog1())}}
					onCloseDialog2 = {()=>{dispatch(closeDialog2())}}
					/>
			</div>
		)
	}
}

function select(state) {
  return state
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(SelectModuleC)
