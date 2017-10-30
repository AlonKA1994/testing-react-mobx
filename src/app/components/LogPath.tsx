import * as React from 'react';

interface ILogPathProps {
    handleLogName: (fieldName: string, value: any) => any
    error: string;
    nameField: string;
    nameBoolean: string;
}

interface ILogPathState {
    errorD: string;
}


export class LogPath extends React.Component <ILogPathProps,ILogPathState> {

    constructor(props: any){
        super(props);
        this.state = {
            errorD: this.props.error
        };

        this.handleChildLogName = this.handleChildLogName.bind(this);
    }

    handleChildLogName(event: any){
        this.props.handleLogName(event.target.name, event.target.value);
    }

    render() {
        return (
            <div >
                <label >Log path:</label>
                <input type="text" name={this.props.nameField} placeholder="Log path" onChange={this.handleChildLogName}/>
                <div >
                    Continues log? <input name={this.props.nameBoolean} type="checkbox" value="true" onChange={this.handleChildLogName}/>
                </div>
                <span>{this.props.error}</span>
            </div>
        );
    }
}
