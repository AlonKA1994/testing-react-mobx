import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { Root } from './containers/Root';
import { RouterStore, LogStore } from './stores';
import { STORE_ROUTER, STORE_LOG } from './constants/stores';
import { LogModel } from './models/LogModel';
import { FormApp } from "./containers/FormApp";
import { LogListApp } from "./containers/LogListApp";

// enable MobX strict mode
useStrict(true);

// prepare MobX stores

const defaultLogs = [
  new LogModel('Alon', 'Path', true, []),
  new LogModel('Akerman', 'Hard Path', false, [])
];
const history = createBrowserHistory();
const logStore = new LogStore(defaultLogs);
const routerStore = new RouterStore(history);
const rootStores = {
    [STORE_LOG]: logStore,
    [STORE_ROUTER]: routerStore
};

const editFormApp = ({ match }) => (
    <div>
        <FormApp {...match} logID={match.params.logId}/>
    </div>  
)

// render react DOM
ReactDOM.render(
  <Provider {...rootStores} >
    <Root>
      <Router history={history} >
        <Switch>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/new">New</Link></li>
                    <li><Link to="/about">List</Link></li>
                </ul>
                  <Route exact path="/" />
                  <Route path="/new" component={FormApp} />
                  <Route path="/edit/:logId" component={editFormApp}/>
                  <Route path="/about" component={LogListApp}/>
            </div>
        </Switch>
      </Router>
    </Root>
  </Provider >,
  document.getElementById('root')
);