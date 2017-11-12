import * as React from 'react';
import { Route } from 'react-router';
import { FormApp } from "../containers/FormApp";
import { LogListApp } from "../containers/LogListApp";

export interface IRoutingProps {
}

export interface IRoutingState {
}

export class MainRouting extends React.Component<IRoutingProps, IRoutingState> {

    constructor(props?: IRoutingProps) {
        super(props);

        this.GenerateNavBar = this.GenerateNavBar.bind(this);
        this.GenerateRoutes = this.GenerateRoutes.bind(this);
    }

    GenerateNavBar(){
        return (
            <ul className="nav nav-tabs ">
                <li className="nav-item">
                    <a className="nav-link " href="/">בית</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/new">חדש</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/list">רשימה</a>
                </li>
            </ul>
        );
    }

    GenerateRoutes(){
        const EditFormApp = ({ match }) => <FormApp {...match} logID={match.params.logId}/>

        return (
            <div>
                <Route exact path="/" />
                <Route path="/new" component={FormApp} />
                <Route path="/edit/:logId" component={EditFormApp}/>
                <Route path="/list" component={LogListApp}/>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.GenerateNavBar()}
                {this.GenerateRoutes()}
            </div>
        );
    }
}

export default MainRouting;