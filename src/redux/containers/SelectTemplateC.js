import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { newTemplate,selectTemplate } from '../actions/Actions.js'
import SelectTemplate from '../../components/SelectTemplate'

class SelectTemplateC extends Component {
    /*componentDidMount() {
        // console.log("will mount")
        const { dispatch } = this.props
        dispatch(fetchTemplates())
    }*/
    render() {
        // Injected by connect() call:
        const { dispatch, templates, docs} = this.props
        return (
            <div>
            
            <SelectTemplate
                templates = {templates}
                docs = {docs}
                onNewTemplate={ templateTable =>dispatch(newTemplate(templateTable)) } 
                onSelectTemplate={ templateID => dispatch(selectTemplate(templateID)) }/>
            </div>
        )
    }
}

function select(state) {
    return state
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(SelectTemplateC)