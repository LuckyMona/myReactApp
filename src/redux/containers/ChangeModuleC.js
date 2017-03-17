import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { saveCopiedModule } from '../actions/Actions.js'
import ChangeModule from '../../components/ChangeModule'

class ChangeModuleC extends Component {
	render() {
		const { dispatch, modules, realTables } = this.props
		return(
			<div>
				<ChangeModule 
					modules = {modules}
					realTables={realTables}
					params = {this.props.params}
					saveCopiedModule = {(moduleData)=>{dispatch(saveCopiedModule(moduleData))}} />
			</div>
		)
	}
}

function select(state) {
  return state
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(ChangeModuleC)
