import {observable, action, computed, autorunAsync} from 'mobx';
import { LogModel } from '../models';

export class LogStore {

    @observable public logs: Array<LogModel>;

    constructor(fixtures: LogModel[]) {
        this.logs = fixtures;

        this.addLog = this.addLog.bind(this);
        this.deleteLog = this.deleteLog.bind(this);
        this.editLog = this.editLog.bind(this);

        this.checkLocalStorage();

        // autorunAsync(this.updateLocalStoage);
    }

    @action updateLocalStoage(){
        localStorage.setItem('log', JSON.stringify(this.logs));
        this.checkLocalStorage();
    }

    @action checkLocalStorage(){
            let tmpLocal : any  = JSON.parse(localStorage.getItem('log'));
            this.logs = tmpLocal;

    }

    @action("Adding new log")
    addLog(item: LogModel): void {
        this.logs.push(item);
        this.updateLocalStoage();
    }

    @action("Editing a specific log")
    editLog(id: number, data: Partial<LogModel>): void {
        this.logs = this.logs.map((log) => {
            if (log.id === id) {
                log.strLogName = data.strLogName;
                log.strLogPath = data.strLogPath;
                log.bLogContinued = data.bLogContinued;
                log.arrRegExp = data.arrRegExp;
            }
            return log;
        })
        this.updateLocalStoage();
    }

    @action("Deleting specific log")
    deleteLog(id: string): void {
        this.logs = this.logs.filter((log) => log.id.toString() !== id);
        this.updateLocalStoage();
    }

}

export default LogStore;
