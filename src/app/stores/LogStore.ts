import { observable, computed, action } from 'mobx';
import { LogModel } from '../models';

export class LogStore {

    @observable public logs: Array<LogModel>;

    constructor(fixtures: LogModel[]) {
        this.logs = fixtures;

        this.addLog = this.addLog.bind(this);
        this.deleteLog = this.deleteLog.bind(this);
        this.editLog = this.editLog.bind(this);
    }

    @action("Adding new log")
    addLog(item: Partial<LogModel>): void {
        this.logs.push(new LogModel(item.strLogName, item.strLogPath, item.bLogContinued, null));
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
    }

    @action("Deleting specific log")
    deleteLog(id: number): void {
        this.logs = this.logs.filter((log) => log.id !== id);
    }


}

export default LogStore;
