import * as React from 'react';
import { LogModel } from "../models/LogModel";
import * as MaterialDesign from 'react-icons/lib/md'

interface IListCardProps {
    deleteLog: (id: number) => any;
    listLogs: Array<LogModel>;
    handleChangePath: (idPath: string) => any;
}

interface IListCardState {d
}

export class ListCard extends React.Component<IListCardProps,IListCardState> {

    constructor(props: any){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handlePath = this.handlePath.bind(this);
        this.writeLogContinued = this.writeLogContinued.bind(this);
    }

    // [LogStore-method] Delete a log after the 'delete' button was pressed
    handleDelete(event: any){
        this.props.deleteLog(event.target.value);
    }

    // Change the url path
    handlePath(event: any){
        this.props.handleChangePath(event.target.value);
    }

    // Creates the html tag for לוג מתגלגל
    writeLogContinued(){
        return <div className="card-text"><i>לוג מתגלגל</i></div>;
    }


    render() {
        // Building the card's html body
        const allCards = this.props.listLogs.map((log) =>
            <div key={log.id} className="card " >
                <h4 className="card-header"><u>שם הלוג:</u> {log.strLogName}</h4>
                <div className="card-body">
                    <div className="card-text"><u>נתיב הלוג:</u> {log.strLogPath}</div>
                    {log.bLogContinued === true ? this.writeLogContinued() : ""}
                </div>
                <div className="list-group list-group-flush">
                    {log.arrRegExp.map((reg) =>
                        <p className="list-group-item" key={reg.id}><u>ביטוי רגולרי</u>
                            {reg.strRegExp}</p>)}
                </div>
                <div className="container">
        {/*TODO : when the logo is clicked the information isn't passed on -> making new component to fix?*/}
                    <div className="row justify-content-around">
                        <div className="col-3" >
                            <button type="button" className="btn btn-info " value={log.id}
                                    onClick={this.handlePath}><MaterialDesign.MdEdit/></button>
                        </div>
                        <div className="col-3" >
                            <button type="button" className="btn btn-danger" value={log.id}
                                onClick={this.handleDelete}><MaterialDesign.MdDelete/></button>
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

