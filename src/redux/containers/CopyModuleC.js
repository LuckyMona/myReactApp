import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { showTable,toggleSelect } from '../actions/Actions.js'
import CopyModule from '../../components/CopyModule'

class CopyModuleC extends Component {
	render() {
		const { dispatch,modules } = this.props
		return(
			<div>
				<CopyModule 
					modules = {modules}
					route = {this.props.route} />
			</div>
		)
	}
}

function select(state) {
  return state
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(CopyModuleC)