import * as React from 'react';

interface ILogNameProps {
    handleLogName: (fieldName: string, value: any) => any
    error: string;
    name: string;
    valueString: string;
}

interface ILogNameState {
    errorD: string;
}

export class LogName extends React.Component<ILogNameProps,ILogNameState> {

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
                <label >Log name:</label>
                <input type="text" name={this.props.name} placeholder="Log name" onChange={this.handleChildLogName}
                        value={this.props.valueString}/>
                <br/>
                <span>{this.props.error}</span>
            </div>
        );
    }
}

