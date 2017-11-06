import { observable } from 'mobx';

export class RegExpModal {

    readonly id: number;
    @observable public strRegExp: string;


    constructor(regExp: string) {
        this.id = Date.now();
        this.strRegExp = regExp;
    };

    public toJson(){
        let json: string = JSON.stringify(this.id) + JSON.stringify(this.strRegExp);

        return json;
    }

    static nextId = 1;
    static generateId() {
        return this.nextId++;
    }
}

export default RegExpModal;
