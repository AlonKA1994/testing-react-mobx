import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Switch } from 'react-router';
import { Root } from './containers/MobxDevTool';
import { RouterStore, LogStore } from './stores';
import { STORE_ROUTER, STORE_LOG } from './constants/stores';
import { MainRouting } from './containers/MainRouting'
import 'bootstrap/dist/css/bootstrap.css';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createBrowserHistory();
const logStore = new LogStore([]);
const routerStore = new RouterStore(history);
const rootStores = {
    [STORE_LOG]: logStore,
    [STORE_ROUTER]: routerStore
};

// render react DOM
ReactDOM.render(
  <Provider {...rootStores} >
    <Root>
      <Router history={history} >
        <Switch>
            <MainRouting />
        </Switch>
      </Router>
    </Root>
  </Provider >,
  document.getElementById('root')
);