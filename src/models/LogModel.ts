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
}

export default LogModel;
