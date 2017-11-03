import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { LogForm } from '../components/LogForm';
import { STORE_LOG, STORE_ROUTER } from "../constants/stores";
import { LogFilter} from "../constants/logs";

export interface FormAppProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ROUTER]: RouterStore;
    // [STOURE_TODO]: TodoStore;
    logID ?: number;
    router: any; //Useless, only here so router in handleChanePath doesn't say false error
}

export interface FormAppState {
    filter: LogFilter;
}

@inject(STORE_LOG, STORE_ROUTER)
@observer
export class FormApp extends React.Component<FormAppProps, FormAppState> {


    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            filter: LogFilter.Home
        };

        this.handleChangePath = this.handleChangePath.bind(this);
    }

    handleChangePath(){
        this.props.router.history.replace("/");
    }

    render() {
        const logStore = this.props[STORE_LOG];
        const editLog = logStore.logs.find((log) =>
            log.id.toString() === this.props.logID);

        return (
            <div>
                <LogForm handleChangePath={this.handleChangePath}
                        addLog={logStore.addLog}
                        editLog={logStore.editLog}
                        logEdit={editLog}/>
            </div>
        );
    }
};
