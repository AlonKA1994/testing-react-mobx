import * as React from 'react';
import { LogName } from '../components/LogName';
import { LogPath } from '../components/LogPath';
import { LogModel } from "../models/LogModel";
import { RegExpModal } from "../models/RegExpModal";
import { RegularExpressionForm } from "./RegularExpressionForm";
import {isNullOrUndefined} from "util";

export interface ILogFormProps {
    handleChangePath: () => any;
    addLog: (log: LogModel) => any;
    editLog: (id: number, log: Partial<LogModel>) => any;
    logToEdit ?: LogModel;
}

export interface ILogFormState {
    log: LogModel
    errorMsg_logName: string
    errorMsg_logPath: string
    editableLog: boolean
}

export class LogForm extends React.Component<ILogFormProps, ILogFormState> {

    constructor(props?: ILogFormProps, context?: any) {
        super(props, context);
        this.state = { log: new LogModel("","",false,new Array<RegExpModal>()),
                       errorMsg_logName: "",
                       errorMsg_logPath: "",
                       editableLog: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validateLogName = this.validateLogName.bind(this);
        this.validateLogPath = this.validateLogPath.bind(this);
        this.validateRegExp = this.validateRegExp.bind(this);
    }


    // componentWillMount(){
    //     let tmp = new LogModel("","",false,[]);
    //     this.setState({log: tmp});
    //     // this.props.addLog(tmp);
    // }
    //componentDidMount(){
    componentWillMount(){
        //Check if the component should be about editable log
        if(this.props.logToEdit){
            let tmp = this.props.logToEdit;
            this.setState({log: tmp});
            this.setState({editableLog: true});
        }
        // else{
        //     let tmpLocal = JSON.parse(localStorage.getItem('log'));
        //     if(tmpLocal){
        //         this.setState({log: tmpLocal});
        //     }
        // }
    }

    // Function that get value from the children and store in the father
    handleChange(fieldName : string, value: any){
        let tmpLog : LogModel = new LogModel("","",false,[]);//= this.state.log;
        tmpLog.id = this.state.log.id;
        tmpLog.strLogName = this.state.log.strLogName;
        tmpLog.strLogPath = this.state.log.strLogPath;
        tmpLog.bLogContinued = this.state.log.bLogContinued;
        tmpLog.arrRegExp = this.state.log.arrRegExp;
        tmpLog.updater(fieldName, value);
        this.setState({log: tmpLog});
    }

    // Function that saves the data in the logStore
    handleSave() {
        let bLogNameValid = this.validateLogName();
        let bLogPathValid = this.validateLogPath();
        let bRegExpValid = this.validateRegExp();

        if (bLogNameValid && bLogPathValid && bRegExpValid){
            if (this.state.editableLog){
                this.props.editLog(this.state.log.id, this.state.log);
            } else {
                this.props.addLog(this.state.log);
            }
            // localStorage.setItem('log', JSON.stringify(this.state.log));
            this.props.handleChangePath();
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

        this.setState({errorMsg_logName: strErrorMsg});
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

        this.setState({errorMsg_logPath: strErrorMsg});
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
            <div className="row justify-content-center ">
                <div className="col-9  border border-black rounded-bottom">
                <h1 className="text-center">
                    <u>{isNullOrUndefined(this.props.logToEdit) ? "יצירת לוג חדש" : "עדכן לוג"}</u></h1>
                <LogName handleLogName={this.handleChange} error={this.state.errorMsg_logName} name="logName"
                         valueString={this.state.log.strLogName}/>
                <LogPath handleLogName={this.handleChange} error={this.state.errorMsg_logPath}
                         nameField="logPath" nameBoolean="isLogContinued"
                         valueString={this.state.log.strLogPath} valueBoolean={this.state.log.bLogContinued} />
                <RegularExpressionForm handleArrayRegExp={this.handleChange} name="arrRegExp"
                         valueArray={this.state.log.arrRegExp}/>
                <br/>
                <div className="row justify-content-center">
                    <button type="sumbit" onClick={this.handleSave}
                        className="btn-success align-middle">שמור</button>
                </div>
                </div>
            </div>
        );
    }
}

export default LogForm;
