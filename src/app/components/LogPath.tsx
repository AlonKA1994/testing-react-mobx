import * as React from 'react';

interface ILogPathProps {
    handleLogName: (fieldName: string, value: any) => any
    error: string;
    nameField: string;
    nameBoolean: string;
    valueString: string;
    valueBoolean: boolean;
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

        this.handleChildLogPathString = this.handleChildLogPathString.bind(this);
        this.handleChildLogPathBoolean = this.handleChildLogPathBoolean.bind(this);
    }

    handleChildLogPathString(event: any){
        this.props.handleLogName(event.target.name, event.target.value);
    }

    handleChildLogPathBoolean(event: any){
        this.props.handleLogName(event.target.name, event.target.checked);
    }

    render() {
        return (
            <div >
                <label >Log path:</label>
                <input type="text" name={this.props.nameField} placeholder="Log path"
                       onChange={this.handleChildLogPathString} value={this.props.valueString}/>
                <div >
                    Continues log? <input type="checkbox" name={this.props.nameBoolean}
                                    onChange={this.handleChildLogPathBoolean} checked={this.props.valueBoolean} />
                </div>
                <span>{this.props.error}</span>
            </div>
        );
    }
}
