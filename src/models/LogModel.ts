import { observable } from 'mobx';
import { RegExpModal } from './RegExpModal';

export class LogModel {

    //readonly
    id: number;
    @observable public strLogName: string;
    @observable public strLogPath: string;
    @observable public bLogContinued: boolean;
    @observable public arrRegExp:RegExpModal[];

    constructor(logName: string, logPath: string, isLogContinued: boolean, arrRegExp: RegExpModal[]) {
        this.id = Date.now();
        this.strLogName = logName;
        this.strLogPath = logPath;
        this.bLogContinued = isLogContinued;
        this.arrRegExp = arrRegExp;
    };

    // General function as setter to the internal parameters
    public updater(fieldName: string, newValue: any){
        switch(fieldName){
            case "logName":
                this.strLogName = newValue;
                break;
            case "logPath":
                this.strLogPath = newValue;
                break;
            case "isLogContinued":
                this.bLogContinued = newValue;
                break;
            case "arrRegExp":
                this.arrRegExp = newValue;
                break;
        }
    }

    public toJson(){
        let json : string = JSON.stringify(this.id) + JSON.stringify(this.strLogName) +
                   JSON.stringify(this.strLogPath) + JSON.stringify(this.bLogContinued);

        let jsonArr : string = "";

        // for(let i=0; i<this.arrRegExp.length; i++){
        //     jsonArr.concat(regExp.toJson());
        // }

        return json + jsonArr;
    }

    static nextId = 1;

    static generateId() {
        return this.nextId++;
    }
}

export default LogModel;
