import React from 'react'
import ReactDOM from 'react-dom'
import handleChange from '../utils/handleChange.js'

let ModuleNameInput = React.createClass({
	getInitialState:function(){
		//console.log(this.props.moduleName)
		return {
			moduleName:this.props.moduleName?this.props.moduleName:""
		}
	},
	getValue:function(){
		return this.state.moduleName
	},
	render:function(){
		return(
			<label htmlFor="moduleName">
				模块名：
				<input id="moduleName"
					ref="moduleName" 
					type="text"
					name="moduleName"
					value={this.state.moduleName}
					onChange={this::handleChange} />
			</label>
		)
	}
})

export default ModuleNameInput

