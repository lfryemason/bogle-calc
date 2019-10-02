import React, {Component, CSSProperties} from 'react';

import { CreatureType } from '../CardTypes';

import { CreatureList } from '../constants/CardInformation';

const addCreatureStyle: CSSProperties = {
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
    marginBottom: "10px",
}

interface AddCreatureProps {
    addCreatureFunc: (creature: CreatureType) => void,
}

export default class AddCreature extends Component<AddCreatureProps> {
    render() {
        const creatureList = CreatureList;
        return(
            <div style={addCreatureStyle}>
                {creatureList.map(creature => 
                    <img src={creature.png} 
                            style={imageStyle}
                            onClick={() => this.props.addCreatureFunc(creature)}
                            key={creature.name}
                    />    
                )}
            </div>
        );
    }
}