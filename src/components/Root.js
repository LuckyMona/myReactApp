import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
/*import routes from '../routes'*/
import { Router, Route } from 'react-router'
import App from '../redux/containers/App'
import SelectTemplateC from '../redux/containers/SelectTemplateC'
import SelectModuleC from '../redux/containers/SelectModuleC'
import NewModuleC from '../redux/containers/NewModuleC'
import CopyModuleC from '../redux/containers/CopyModuleC'
import ChangeModuleC from '../redux/containers/ChangeModuleC'
import ShowDocC from '../redux/containers/ShowDocC'
/*import ModuleTableC from './redux/containers/ModuleTableC'*/


const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <Router history={history}>
      	<Route path="/" component={App} />
        <Route path="/SelectTemplate" component={SelectTemplateC} />
        <Route path="/SelectModule" component={SelectModuleC} />
        <Route path="/NewModule" component={NewModuleC} />
        <Route path="/CopyModule" component={CopyModuleC} />
        <Route path="/ChangeModule/:moduleID/:selectedVer" component={ChangeModuleC} />
        
        <Route path="/ShowDoc/:docID" component={ShowDocC} />
        
      	{/*<Route path="/ChangeModule" component={ChangeModule} />*/}
          {/*<Route path="realTable/:moduleID/:version/:tableID" component={ModuleTableC} />*/}
      </Router>
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root