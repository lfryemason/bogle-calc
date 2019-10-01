import React, {Component, CSSProperties} from 'react';

import { EnchantmentType } from '../CardTypes';

import { EnchantmentList } from '../constants/CardInformation'; 

import { AppState } from './MainApp';

const addEnchantmentStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflowY: "auto",
}

const imageStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    padding: "0px 0px 10px 0px"
}

interface AddEnchantmentProps {
    addEnchantmentFunc: (enchantment: EnchantmentType) => void,
    onChangeNonAuraEnchantments: (num: number) => void,
    state: AppState,
}

export default class AddEnchantment extends Component<AddEnchantmentProps> {
    render() {
        const enchantmentList = EnchantmentList;
        return(
            <div style={addEnchantmentStyle}>
                {enchantmentList.map(enchantment => 
                    <img src={enchantment.png} 
                            style={imageStyle} 
                            onClick={() => this.props.addEnchantmentFunc(enchantment)}
                            key={enchantment.name}/>    
                )}

                <button onClick={() => 
                        this.props.onChangeNonAuraEnchantments(
                                this.props.state.nonAuraEnchantments +1)}>
                    ^
                </button>
                {this.props.state.nonAuraEnchantments}
                <button onClick={() => 
                        this.props.onChangeNonAuraEnchantments(
                                this.props.state.nonAuraEnchantments -1)}>
                    v
                </button>

            </div>
        );
    }
}