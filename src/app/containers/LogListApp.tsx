import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { STORE_LOG } from "../constants/stores";
import { LogStore } from "../stores/LogStore";

export interface FormAppProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ROUTER]: RouterStore;
    // [STOURE_TODO]: TodoStore;
}

export interface FormAppState {

}

@inject(STORE_LOG)
@observer
export class LogListApp extends React.Component<FormAppProps, FormAppState> {


    constructor(props: any, context: any) {
        super(props, context);

    }


    render() {
        const logStore = this.props[STORE_LOG] as LogStore;

         /*const testingStore = <div>{logStore.logs.length}</div>;*/
        const testingStore = logStore.logs.map((log) =>
            <div key={log.id}>
                    <label>{log.strLogName}</label>
                    <Link to={`/edit/${log.id}`}>Edit</Link>
                    {/*<h2>{log.strLogPath}</h2>*/}
                    {/*<input type="checkbox" checked={log.bLogContinued}/>Is Log continued*/}
            </div>
        );

        return (
            <div>
                <h1>Alon</h1>
                { testingStore }
            </div>
        );
    }
};
