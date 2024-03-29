import React, {Component, CSSProperties} from 'react';
import { CreatureState } from './MainApp';

import cardTop from '../res/CardTop.png'

interface AttachedCreatureProps {
    creatureState: CreatureState,
    removeEnchantment: (enchantmentIndex: number) => void,
}

const attachedCreatureStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
}

const imageStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    maxHeight: "100%"
}

const textboxStyle: CSSProperties = {
    minHeight: "150px",
    minWidth: "100%",
    height: "200px",
    width: "100%",
    backgroundColor: "#DBD1D0",
    border: "19px black solid",
    borderTop: "2px",
    boxSizing: "border-box",
    borderRadius: "0px 0px 16px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
}

const keywordStringStyle: CSSProperties = {

}

const powerToughnessBoxStyle: CSSProperties = {
    border: "2px solid black",
    borderRadius: "10px",
    height: "30px",
    width: "60px",
    textAlign: "center",
    lineHeight: "30px",
    fontSize: "22px",
    position: "relative",
    float: "right",
}

export default class AttachedCreature extends Component<AttachedCreatureProps> {
    render() {
        const { creature, enchantments } = this.props.creatureState;
        return(
            <div style={attachedCreatureStyle} className={"attached-creature"}>
                <img style={imageStyle} 
                        src={cardTop} 
                        alt={""} 
                />

                {enchantments.map((enchantment, index) => 
                    <img style={imageStyle} 
                            src={enchantment.png} 
                            alt={enchantment.name} 
                            key={index}
                            onClick={() => this.props.removeEnchantment(index)}
                    />
                )}

                <img style={imageStyle} 
                        src={creature.png} 
                        alt={creature.name} 
                />

                {this.renderTextbox()}
                
            </div>
        );
    }

    renderTextbox: () => JSX.Element = () => {
        const {creature, powerToughness, keywords, } =  this.props.creatureState;

        const keywordString = keywords.join(", ");
        return (
            <div style={textboxStyle}>
                <div style={keywordStringStyle}>
                    {keywordString}
                </div>

                <div style={{display: "flex", justifyContent: "flex-end", padding: "5px"}}>
                    <div style={powerToughnessBoxStyle}>
                        {powerToughness.power}/{powerToughness.toughness}
                    </div>    
                </div>
            </div>
        );
    }
}