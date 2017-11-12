import { observable } from 'mobx';

export class RegExpModal {

    readonly id: number;
    @observable public strRegExp: string;

    constructor(regExp: string) {
        this.id = Date.now();
        this.strRegExp = regExp;
    };

}

export default RegExpModal;
