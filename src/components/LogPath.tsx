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
}


export class LogPath extends React.Component <ILogPathProps,ILogPathState> {

    constructor(props: any){
        super(props);

        this.handleChildLogPathString = this.handleChildLogPathString.bind(this);
        this.handleChildLogPathBoolean = this.handleChildLogPathBoolean.bind(this);
    }

    // Pass the changes in the input's value back to the father to update
    handleChildLogPathString(event: any){
        this.props.handleLogName(event.target.name, event.target.value);
    }

    // Pass the changes in the checkbox's value back to the father to update
    handleChildLogPathBoolean(event: any){
        this.props.handleLogName(event.target.name, event.target.checked);
    }

    render() {
        return (
            <div >
                <label>נתיב הלוג:</label>
                <input type="text" name={this.props.nameField} placeholder="נתיב הלוג"
                onChange={this.handleChildLogPathString} value={this.props.valueString}
                className={`form-control ${this.props.valueString.length > 0 ? "text-left" : "text-right" }`}/>
                <span className="text-danger">{this.props.error}</span>
                <div >
 לוג מתגלגל?                <input type="checkbox" name={this.props.nameBoolean}
                       onChange={this.handleChildLogPathBoolean} checked={this.props.valueBoolean} />
                </div>
            </div>
        );
    }
}
