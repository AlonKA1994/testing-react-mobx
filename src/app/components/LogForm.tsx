import * as React from 'react';
import { LogName } from '../components/LogName';
import { LogPath } from '../components/LogPath';
import { LogModel } from "../models/LogModel";
import { RegExpModal } from "../models/RegExpModal";
import { RegularExpressionForm } from "./RegularExpressionForm";

export interface ILogFormProps {
    addLog: (log: Partial<LogModel>) => any;
    editLog: (id: number, log: Partial<LogModel>) => any
}

export interface ILogFormState {
    log: LogModel
    errorMsg_logName: string
    errorMsg_logPath: string
}

export class LogForm extends React.Component<ILogFormProps, ILogFormState> {

    constructor(props?: ILogFormProps, context?: any) {
        super(props, context);
        this.state = { log: null,
                       errorMsg_logName: "",
                       errorMsg_logPath: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validateLogName = this.validateLogName.bind(this);
        this.validateLogPath = this.validateLogPath.bind(this);
        this.validateRegExp = this.validateRegExp.bind(this);
    }


    componentWillMount(){
        let tmp = new LogModel("","",false,[]);
        this.setState({log: tmp});
        this.props.addLog(tmp);
    }

    // Function that get value from the children and store in the father
    handleChange(fieldName : string, value: any){
        let tmpLog = this.state.log;
        tmpLog.updater(fieldName, value);
        this.setState({log: tmpLog});
    }

    // Function that saves the data in the logStore
    handleSave() {
        let bLogNameValid = this.validateLogName();
        let bLogPathValid = this.validateLogPath();
        let bRegExpValid = this.validateRegExp();

        if (bLogNameValid && bLogPathValid && bRegExpValid){
            //this.props.addLog(new LogModel(strLogName,strLogPath,bIsLogContinued, arrRexExp));
            this.props.editLog(this.state.log.id, this.state.log);
        }
    }

    // Function that validates the input of log name
    validateLogName(){
        let bIsValidated : boolean;
        let regularExpression = new RegExp("^[a-zA-Z0-9_-]*$");
        let tmpStateParam : string = this.state.log.strLogName;
        let strErrorMsg : string;

        if(tmpStateParam == ""){
            strErrorMsg = "שם הלוג לא יכול להיות ריק";
            bIsValidated = false;
        } else if (!regularExpression.test(tmpStateParam)){
            strErrorMsg = "שם לוג צריך להיות רק אותיות גדולות וקטנות, מספרים, מקף או קו תחתון בלבד";
            bIsValidated = false;
        } else {
            strErrorMsg = "";
            bIsValidated = true;
        }

        this.handleChange("errorMsg_logName", strErrorMsg);
        return bIsValidated;
    }

    // Function that validates the input of log name
    validateLogPath(){
        let bIsValidated : boolean;
        let regularExpression = new RegExp("^[C][:]\\\\[A-Z+a-z ()0-9\\\\]+[.][a-z]+$");
        let tmpStateParam : string = this.state.log.strLogPath;
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

        this.handleChange("errorMsg_logPath", strErrorMsg);
        return bIsValidated;
    }

    validateRegExp(){
        var bIsValidated : boolean = true;
        var tmpStateParam : Array<RegExpModal> = this.state.log.arrRegExp;

        tmpStateParam.map((regExp) =>{
            if((regExp.strRegExp == "") || (regExp.strRegExp === null)){
                bIsValidated = false;
            }
        });

        return bIsValidated;
    }

    render() {
        return (
            <div>
                <h1><u>Hello world</u></h1>
                <LogName handleLogName={this.handleChange} error={this.state.errorMsg_logName} name="logName"/>
                <LogPath handleLogName={this.handleChange} error={this.state.errorMsg_logPath} nameField="logPath" nameBoolean="isLogContinued"/>
                <RegularExpressionForm handleArrayRegExp={this.handleChange} name="arrRegExp"/>
                <button type="sumbit" onClick={this.handleSave}>Sumbit</button>
            </div>
        );
    }
}

export default LogForm;
