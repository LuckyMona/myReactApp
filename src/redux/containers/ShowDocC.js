import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
/*import { fetchTemplates } from '../actions/Actions.js'*/
import ShowDoc from '../../components/ShowDoc'

class ShowDocC extends Component {
	render() {
		const { dispatch, docs, templates } = this.props
		return(
			<div>
				<ShowDoc 
					docs={docs} 
					templates={templates} 
					params={this.props.params} />
			</div>
		)
	}
}

function select(state) {
  return state
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(ShowDocC)