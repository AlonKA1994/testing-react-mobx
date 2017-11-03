import { observable } from 'mobx';

export class RegExpModal {

    readonly id: number;
    @observable public strRegExp: string;


    constructor(regExp: string) {
        this.id = RegExpModal.generateId();
        this.strRegExp = regExp;
    };

    static nextId = 1;
    static generateId() {
        return this.nextId++;
    }
}

export default RegExpModal;
