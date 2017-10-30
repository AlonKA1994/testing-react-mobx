import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';
import { Root } from './containers/Root';
import { TodoModel } from './models/TodoModel';
import { TodoStore, RouterStore, LogStore } from './stores';
import { STORE_TODO, STORE_ROUTER, STORE_LOG } from './constants/stores';
import { TodoFilter } from './constants/todos';
import { LogModel } from './models/LogModel';
import { FormApp } from "./containers/FormApp";

// enable MobX strict mode
useStrict(true);

// default fixtures for TodoStore
/*const defaultTodos = [
  new TodoModel('Use Mobx'),
  new TodoModel('Use React', true),
];

// prepare MobX stores
const history = createBrowserHistory();
const todoStore = new TodoStore(defaultTodos);
const routerStore = new RouterStore(history);
const rootStores = {
  [STORE_TODO]: todoStore,
  [STORE_ROUTER]: routerStore
};*/

// prepare MobX stores (my add)

const defaultLogs = [
  new LogModel('Alon', 'Path', true),
  new LogModel('Akerman', 'Hard Path', false)
];
const history = createBrowserHistory();
const logStore = new LogStore(defaultLogs);
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
          <Route path="/" component={FormApp} />
        </Switch>
      </Router>
    </Root>
  </Provider >,
  document.getElementById('root')
);