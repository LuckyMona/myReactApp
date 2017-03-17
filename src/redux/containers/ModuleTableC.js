import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { newTemplate,selectTemplate } from '../actions/Actions.js'
import ModuleTable from '../../components/ModuleTable'

class ModuleTableC extends Component {
	render() {
		const { dispatch, realTables} = this.props
		return(
			<div>
				<ModuleTable realTables={realTables} />
			</div>
		)
	}
}

function select(state) {
  return state
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(ModuleTableC)
