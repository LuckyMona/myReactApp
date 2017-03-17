/*import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

// import bootstrap from "./bootstrap-3.3.0/dist/css/bootstrap.min.css"
import reset from "./src/less_css/reset.css";
import common from "./src/less_css/common.css";

import ShowProjects from './src/ShowProjects';
import SelectTemplate from './src/SelectTemplate';
import SelectModule from './src/SelectModule';
import NewModule from './src/NewModule';
import ShowDoc from './src/ShowDoc';
import CopyModule from './src/CopyModule';

import App from 'redux/containers/App.js';
render(
    <Router path="" history={hashHistory}>
    	<Route path="/ShowProjects" component={ShowProjects} />
    	<Route path="/SelectTemplate" component={SelectTemplate} />
    	<Route path="/SelectModule" component={SelectModule} />
    	<Route path="/NewModule" component={NewModule} />
    	<Route path="/ShowDoc" component={ShowDoc} />
    	<Route path="/CopyModule" component={CopyModule} />
    	<Route path="/CopyModule" component={CopyModule} />
    < /Router>,
    document.getElementById('App')
);
*/

import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import { syncHistoryWithStore } from 'react-router-redux'
import Root from './src/components/Root'

// Store数据不能持久化，刷新后就会重置，所以使用redux-persist持久化到localStorege
import {persistStore, autoRehydrate} from 'redux-persist'
// import SelectTemplate from './src/redux/containers/SelectTemplate'

import myApp from './src/redux/reducers/reducers'

let store = createStore(myApp, 
    autoRehydrate(), 
    applyMiddleware( thunkMiddleware )// 允许我们 dispatch() 函数
  )
persistStore(store)

/*const history = syncHistoryWithStore(browserHistory, store)*/

render(
  <Root store={store} history={browserHistory} />,
  document.getElementById('App')
)
