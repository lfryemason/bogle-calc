import React, {Component, CSSProperties} from 'react';

import { EnchantmentType } from '../CardTypes';

import { EnchantmentList } from '../constants/CardInformation'; 

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
            </div>
        );
    }
}