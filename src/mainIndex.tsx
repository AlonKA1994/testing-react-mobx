import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';
import { Root } from './containers/Root';
import { RouterStore, LogStore } from './stores';
import { STORE_ROUTER, STORE_LOG } from './constants/stores';
import { LogModel } from './models/LogModel';
import { FormApp } from "./containers/FormApp";
import { LogListApp } from "./containers/LogListApp";
import 'bootstrap/dist/css/bootstrap.css';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores

const defaultLogs = [
  new LogModel('Alons', 'Path', true, []),
  new LogModel('Akerman', 'Hard Path', false, [])
];
const history = createBrowserHistory();
const logStore = new LogStore(defaultLogs);
const routerStore = new RouterStore(history);
const rootStores = {
    [STORE_LOG]: logStore,
    [STORE_ROUTER]: routerStore
};

const EditFormApp = ({ match }) => (
    <div>
        <FormApp {...match} logID={match.params.logId}/>
    </div>  
)


const MyNavBar = () => (
    <ul className="nav nav-tabs ">
        <li className="nav-item">
            <a className="nav-link " href="/">בית</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/new">חדש</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/about">רשימה</a>
        </li>
    </ul>
)

const MyRouter = () => (
    <div>
        <MyNavBar/>
        <Route exact path="/" />
        <Route path="/new" component={FormApp} />
        <Route path="/edit/:logId" component={EditFormApp}/>
        <Route path="/about" component={LogListApp}/>
    </div>
);

// render react DOM
ReactDOM.render(
  <Provider {...rootStores} >
    <Root>
      <Router history={history} >
        <Switch>
            <MyRouter/>
        </Switch>
      </Router>
    </Root>
  </Provider >,
  document.getElementById('root')
);