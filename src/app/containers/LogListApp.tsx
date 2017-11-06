import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { STORE_LOG } from "../constants/stores";
import { LogStore } from "../stores/LogStore";
import { Card, CardBody, CardTitle, CardText, Button, Col, CardGroup} from "reactstrap";

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
        // const testingStore = logStore.logs.map((log) =>
        //     <div key={log.id}>
        //             <label>{log.strLogName}</label>
        //             <Link to={`/edit/${log.id}`}>Edit</Link>
        //             {/*<h2>{log.strLogPath}</h2>*/}
        //             {/*<input type="checkbox" checked={log.bLogContinued}/>Is Log continued*/}
        //     </div>
        // );

        const testingStore = logStore.logs.map((log) =>
            <div key={log.id}>
                    <Col >
                    <Card body outline color="info">
                        <CardTitle><u>Name:</u> {log.strLogName}</CardTitle>
                        <CardTitle><u>Path:</u> {log.strLogPath}</CardTitle>
                        {log.arrRegExp.map((reg) =>
                            <CardText key={reg.id}><u>RegularExpression:</u> {reg.strRegExp}</CardText>)}
                        <div className="btn"><Link to={`/edit/${log.id}`}>Edit</Link></div>
                    </Card>
                </Col>
            </div>
        );

        return (
            <div className="text-center">
                <h1><u><b>All logs</b></u></h1>
                <CardGroup>
                    { testingStore }
                </CardGroup>
            </div>
        );
    }
};
