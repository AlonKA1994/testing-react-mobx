import * as React from 'react';
import {LogModel} from "../models/LogModel";

interface IListCardProps {
    deleteLog: (id: number) => any;
    listLogs: Array<LogModel>;
    handleChangePath: (idPath: string) => any;
}

interface IListCardState {
}

export class ListCard extends React.Component<IListCardProps,IListCardState> {

    constructor(props: any){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handlePath = this.handlePath.bind(this);
        this.writeLogContinued = this.writeLogContinued.bind(this);
    }

    handleDelete(event: any){
         this.props.deleteLog(event.target.value);
    }

    handlePath(event: any){
        this.props.handleChangePath(event.target.value);
    }

    writeLogContinued(){
        return <div className="card-text"><i>לוג מתגלגל</i></div>;
    }


    render() {
        const allCards = this.props.listLogs.map((log) =>
            <div key={log.id} className="card " >
                <h4 className="card-header"><u>שם הלוג:</u> {log.strLogName}</h4>
                <div className="card-body">
                    <div className="card-text"><u>נתיב הלוג:</u> {log.strLogPath}</div>
                    {log.bLogContinued === true ? this.writeLogContinued() : ""}
                </div>
                <div className="list-group list-group-flush">
                    {log.arrRegExp.map((reg) =>
                        <p className="list-group-item" key={reg.id}><u>ביטוי רגולרי</u> {reg.strRegExp}</p>)}
                </div>
                <div className="container">
                    <div className="row justify-content-around">
                        <div className="col-3">
                            <button type="button" className="btn btn-info" value={log.id}
                                    onClick={this.handlePath}>עדכן</button>
                        </div><div className="col-3">
                            <button type="button" className="btn btn-danger" value={log.id}
                                    onClick={this.handleDelete}>מחק</button>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="card-columns">
                {allCards}
            </div>
        );
    }
}

