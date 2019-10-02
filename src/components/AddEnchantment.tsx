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
    justifyContent: "space-between",
}

const imageStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    padding: "0px 0px 10px 0px"
}

const nonAuraEnchantmentDivStyle: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: "92px",
}

const enchantmentListStyle: CSSProperties = {
    overflowY: "auto"
}

const nonAuraChangeButtonStyle: CSSProperties = {
    height: "50px",
    width: "50px",
    minWidth: "50px",
    minHeight: "50px",
    backgroundColor: "#0090FF",
    borderRadius: "50px",
    border: "0",
    color: "white",
    fontSize: "41px",
    lineHeight: "40px",
    margin: "10px 16px 10px 16px",
    resize: "none",
}

const enchantmentCountStyle: CSSProperties = {
    color: "#707070",
    border: "2px solid #707070",
    borderRadius: "10px",
    fontSize: "14px",
    height: "50px",
    textAlign: "center",
    padding: "3px 0 3px 0",
    width: "100%",
}

const enchantmentCountNumberStyle: CSSProperties = {
    color: "#707070",
    fontSize: "30px",
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
                <div style={enchantmentListStyle}>
                    {enchantmentList.map(enchantment => 
                        <img src={enchantment.png} 
                                style={imageStyle} 
                                onClick={() => this.props.addEnchantmentFunc(enchantment)}
                                key={enchantment.name}/>    
                    )}
                </div>

                <div style={nonAuraEnchantmentDivStyle}>
                    <button style={nonAuraChangeButtonStyle}
                            onClick={() => 
                            this.props.onChangeNonAuraEnchantments(
                                    this.props.state.nonAuraEnchantments - 1)}>
                        -
                    </button>
                    <div style={enchantmentCountStyle} >
                        Non-aura enchantments
                        <div style={enchantmentCountNumberStyle}>
                            {this.props.state.nonAuraEnchantments}
                        </div>
                    </div>
                    <button style={nonAuraChangeButtonStyle}
                            onClick={() => 
                            this.props.onChangeNonAuraEnchantments(
                                    this.props.state.nonAuraEnchantments + 1)}>
                        +
                    </button>
                </div>

            </div>
        );
    }
}