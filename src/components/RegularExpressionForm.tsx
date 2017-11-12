import * as React from 'react';
import { RegExpModal } from "../models/RegExpModal";
import { RegularExpression } from "./RegularExpression";

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
        this.state = {arrRegExp : this.props.valueArray};
        this.addNewRegExp = this.addNewRegExp.bind(this);
        this.removeRegExp = this.removeRegExp.bind(this);
        this.updateRegExp = this.updateRegExp.bind(this);
        this.handleChildArrRegExp = this.handleChildArrRegExp.bind(this);
    }

    addNewRegExp(){
        let tmp : Array<RegExpModal> = this.state.arrRegExp;
        tmp.push(new RegExpModal(""));
        this.setState({arrRegExp: tmp});
        this.handleChildArrRegExp();
    }

    removeRegExp(id: string){
        let tmp : Array<RegExpModal> =
            this.state.arrRegExp.filter((regExp) => regExp.id.toString() !== id);
        this.setState({arrRegExp: tmp.slice()}, function () {
            this.handleChildArrRegExp();
        });

    }

    updateRegExp(id: string, strNewRegExpValue: string){
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
                        onDelete={this.removeRegExp} onUpdate={this.updateRegExp}/>
        );

        return (
            <div onChange={this.handleChildArrRegExp}>
                { regExps }
                <button type="button" onClick={this.addNewRegExp}
                    className="btn-primary"> הוסף ביטוי רגולרי</button>
            </div>
        );
    }
}

