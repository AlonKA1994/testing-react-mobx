import { observable } from 'mobx';
import { RegExpModal } from './RegExpModal';

export class LogModel {

    readonly id: number;
    @observable public strLogName: string;
    @observable public strLogPath: string;
    @observable public bLogContinued: boolean;
    @observable public arrRegExp: Array<RegExpModal>;

    constructor(logName: string, logPath: string, isLogContinued: boolean, arrRegExp: Array<RegExpModal>) {
        this.id = LogModel.generateId();
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


    public addRegExp(strRegExpValue: string){
        this.arrRegExp.push(new RegExpModal(strRegExpValue));
    }

    public removeRegExp(id: string){
        this.arrRegExp = this.arrRegExp.filter((regExp) => regExp.id.toString() !== id)
    }

    public updateRegExp(id: string, strNewRegExpValue: string){
        this.arrRegExp = this.arrRegExp.map((regExp) => {
            if (regExp.id.toString() === id) {
                regExp.strRegExp = strNewRegExpValue;
            }
            return regExp;
        });
    }

    static nextId = 1;

    //TODO: Need to think about an idea of how to decrease the ID if the user didn't submit new log
    // A solution might be to go back on the states of LogForm to the params of the LogModel and not a state of LogModel itself
    static generateId() {
        return this.nextId++;
    }
}

export default LogModel;
