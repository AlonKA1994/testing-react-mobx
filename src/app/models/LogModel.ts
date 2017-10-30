import { observable } from 'mobx';
import { RegExpModal } from './RegExpModal';

export class LogModel {

    readonly id: number;
    @observable public strLogName: string;
    @observable public strLogPath: string;
    @observable public bLogContinued: boolean;
    @observable public arrRegExp: Array<RegExpModal>;

    constructor(logName: string, logPath: string, isLogContinued: boolean, arrRegExp : Array<RegExpModal>) {
        this.id = LogModel.generateId();
        this.strLogName = logName;
        this.strLogPath = logPath;
        this.bLogContinued = isLogContinued;
        this.arrRegExp = arrRegExp;
    };

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

    static nextId = 1;
    static generateId() {
        return this.nextId++;
    }
}

export default LogModel;
