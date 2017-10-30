import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { LogForm } from '../components/LogForm';
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
export class FormApp extends React.Component<FormAppProps, FormAppState> {


    constructor(props: any, context: any) {
        super(props, context);

    }


    render() {
        const logStore = this.props[STORE_LOG] as LogStore;
        // const testingStore = <div>{logStore.logs.length}</div>;

        return (
            <div>
                <LogForm addLog={logStore.addLog}
                        editLog={logStore.editLog}/>
                {/*{ testingStore }*/}
            </div>
        );
    }
};
