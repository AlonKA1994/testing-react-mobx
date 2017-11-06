import * as React from 'react';

interface IRegExpProps {
    onDelete: (id: string) => void
    onUpdate: (id: string, newRegExpValue: string) => void
    id: number
    regExpValue: string
}

interface IRegExpState {
    error: string
}


export class RegularExpression extends React.Component <IRegExpProps,IRegExpState> {

    constructor(props: any){
        super(props);
        this.state = {error:""};
        this.updateReg = this.updateReg.bind(this);
        this.removeReg = this.removeReg.bind(this);
        this.validateRegExp = this.validateRegExp.bind(this);
    }

    updateReg(event: any){
        this.props.onUpdate(event.target.id,event.target.value);
        this.validateRegExp(event);
    }

    removeReg(event: any){
        this.props.onDelete(event.target.id)
    }

    validateRegExp(event: any){
        let bIsValidated : boolean;
        let regularExpression = new RegExp("^[a-zA-Z0-9_-]*$");
        let tmpStateParam = event.target.value;
        let strErrorMsg : string;

        if(tmpStateParam == ""){
            strErrorMsg = "מיקום הלוג לא יכול להיות ריק";
            bIsValidated = false;
        }/* else if (!regularExpression.test(tmpStateParam)){
        strErrorMsg = "מיקום לוג צריך להיות רק אותיות גדולות וקטנות, מספרים, מקף או קו תחתון בלבד";
        bIsValidated = false;
    }*/ else {
            strErrorMsg = "";
            bIsValidated = true;
        }

        this.setState({error: strErrorMsg});
        return bIsValidated;
    }

    render() {
        return (
            <div key={this.props.id}>
                <div className="input-group">
                    <input autoFocus id={this.props.id.toString()} placeholder="הכנס ביטוי רגולרי"
                        onChange={this.updateReg} value={this.props.regExpValue} onBlur={this.validateRegExp}
                       className={`form-control ${this.props.regExpValue.length > 0 ? "text-left" : "text-right" }`}/>
                    <button onClick={this.removeReg} id={this.props.id.toString()}
                            className="btn-danger">מחיקה</button>
                </div>
                <span className="text-danger">{this.state.error}</span>
            </div>
        );
    }
}
