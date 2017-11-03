import * as React from 'react';
import { RegExpModal } from "../models/RegExpModal";
import {RegularExpression} from "./RegularExpression";

interface IRegExpFormProps {
    handleArrayRegExp: (fieldName: string, value: any) => any
    name: string;
    valueArray: Array<RegExpModal>
}

interface IRegExpFormState {
    arrRegExp: Array<RegExpModal>;
}

export class RegularExpressionForm extends React.Component<IRegExpFormProps,IRegExpFormState> {

    constructor(props: any){
        super(props);
        this.state ={arrRegExp : this.props.valueArray}
        this.addReg = this.addReg.bind(this);
        this.remReg = this.remReg.bind(this);
        this.updateReg = this.updateReg.bind(this);
        this.handleChildArrRegExp = this.handleChildArrRegExp.bind(this);
    }

    addReg(){
        var tmp : Array<RegExpModal> = this.state.arrRegExp;
        tmp.push(new RegExpModal(""));
        this.setState({arrRegExp: tmp});
        this.handleChildArrRegExp();
    }

    remReg(id: string){
        var tmp : Array<RegExpModal> = this.state.arrRegExp.filter((regExp) => regExp.id.toString() !== id).slice();
        this.setState({arrRegExp: tmp.slice()}, function () {
            this.handleChildArrRegExp();
        });

    }

    updateReg(id: string, strNewRegExpValue: string){
        let tmp = this.state.arrRegExp.map((regExp) => {
            if (regExp.id.toString() === id) {
                regExp.strRegExp = strNewRegExpValue;
            }
            return regExp;
        });
        this.setState({arrRegExp: tmp});
    }

    handleChildArrRegExp(){
        this.props.handleArrayRegExp(this.props.name, this.state.arrRegExp);
    }

    render() {

        const regExps = this.state.arrRegExp.map((regExp) =>
                <RegularExpression key={regExp.id} id={regExp.id} regExpValue={regExp.strRegExp}
                        onDelete={this.remReg} onUpdate={this.updateReg}/>
        );

        return (
            <div onChange={this.handleChildArrRegExp}>
                { regExps }
                <button type="button" onClick={this.addReg}> הוסף ביטוי רגולרי</button>
            </div>
        );
    }
}

