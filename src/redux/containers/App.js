import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { newProject,selectProj,fetchProjs,fetchTemplates } from '../actions/Actions.js'
import ShowProjects from '../../components/ShowProjects'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchProjs())
        
        dispatch(fetchTemplates())
    }

    render() {
        // Injected by connect() call:
        const { dispatch, projects, docs, route} = this.props
/*        console.log(projects)
        console.log(docs)*/
        return (
            <div>
                <ShowProjects
                projects = {projects}
                docs = { docs }
                route = {this.props.route}
                selectProj = {(projID,projName)=>dispatch(selectProj(projID,projName))}
                onNewProject = {text => dispatch(newProject(text)) } />
            </div>
        )
    }
}

function select(state) {
  return state
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)