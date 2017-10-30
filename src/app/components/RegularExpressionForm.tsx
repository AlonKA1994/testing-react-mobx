import * as React from 'react';
import { RegExpModal } from "../models/RegExpModal";
import {isNullOrUndefined, isUndefined} from "util";
import {RegularExpression} from "./RegularExpression";

interface IRegExpFormProps {
    handleArrayRegExp: (fieldName: string, value: any) => any
    name: string;
}

interface IRegExpFormState {
    arrRegExp: Array<RegExpModal>;
}

export class RegularExpressionForm extends React.Component<IRegExpFormProps,IRegExpFormState> {

    constructor(props: any){
        super(props);
        this.state ={arrRegExp : []}
        this.addReg = this.addReg.bind(this);
        this.remReg = this.remReg.bind(this);
        this.updateReg = this.updateReg.bind(this);
        this.handleChildArrRegExp = this.handleChildArrRegExp.bind(this);
    }

    addReg(){
        let tmp = this.state.arrRegExp;
        let tmpA = new RegExpModal("");
        tmp.push(tmpA);
        this.setState({arrRegExp: tmp});
        this.handleChildArrRegExp();
    }

    // remReg(event: any){
    //     let tmp = this.state.arrRegExp.filter((regExp) => regExp.id.toString() !== event.target.id);
    //     this.setState({arrRegExp: tmp});
    // }

    // updateReg(event: any){
    //     let tmp = this.state.arrRegExp.map((regExp) => {
    //         if (regExp.id.toString() === event.target.id) {
    //             regExp.strRegExp = event.target.value;
    //         }
    //         return regExp;
    //     });
    //     this.setState({arrRegExp: tmp});
    // }

    remReg(id: string){
        let tmp = this.state.arrRegExp.filter((regExp) => regExp.id.toString() !== id);
        this.setState({arrRegExp: tmp});
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

