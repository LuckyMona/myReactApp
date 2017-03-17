import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { saveModule } from '../actions/Actions.js'
import NewModule from '../../components/NewModule'

class NewModuleC extends Component {
	render() {
		const { dispatch } = this.props
		return(
			<div>
				<NewModule 
				route = { this.props.route }
				onSaveModule = { moduleData=>dispatch(saveModule(moduleData)) }	/>
			</div>
		)
	}
}

function select(state) {
  return state
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(NewModuleC)
