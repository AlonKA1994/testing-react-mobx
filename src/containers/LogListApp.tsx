import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { STORE_LOG } from "../constants/stores";
import { ListCard } from "../components/ListCard";

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

        this.handleChangePath = this.handleChangePath.bind(this);
    }

    handleChangePath(idPath: string){
        this.props.history.replace("/edit/"+idPath);
    }

    render() {
        const logStore = this.props[STORE_LOG];

        return (
            <div className="text-right">
                <h1 className="text-center"><u><b>רשימת הלוגים</b></u></h1>
                <ListCard listLogs={logStore.logs} deleteLog={logStore.deleteLog}
                          handleChangePath={this.handleChangePath}/>
            </div>
        );
    }
};
