import React, {Component, CSSProperties} from 'react';

import { AppState } from './MainApp';

const creatureTabStyle: CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    borderRadius: "15px 15px 0 0",
    border: "3px solid #707070",
    borderBottom: "3px solid #707070",
    color: "#707070",
    fontWeight: "normal",
}

const selectedCreatureTabStyle: CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    borderRadius: "15px 15px 0 0",
    border: "3px solid #707070",
    borderBottom: "0px",
    color: "#707070",
}

const addCreatureButtonStyle: CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    borderRadius: "15px 15px 0 0",
    border: "3px solid #0090FF",
    color: "#0090FF",
    fontSize: "40px",
    lineHeight: "40px",
    fontWeight: "bold",
}

const creatureHeaderStyle: CSSProperties = {
    height: "50px",
    paddingBottom: "5px",
    width: "100%",
    maxWidth: "100%",
    overflowX: "auto",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    fontSize: "22px",
}

interface CreatureHeaderProps extends AppState {
    openAddCreature: () => void,
    changeSelectedCreature: (index: number) => void,
}

export default class CreatureHeader extends Component<CreatureHeaderProps> {
    render() {
        const creatureList = this.props.creatures.map(creature => 
            ({name: creature.creature.shortName, index: creature.index}))
            .sort((a, b) => a.index - b.index);
        return(<div style={creatureHeaderStyle}>
            {creatureList.map((creatureWithInd, ind) => 
                (<div style={{width: "100%", height: "100%"}} key={ind}>
                    {this.props.selectedCreatureIndex === ind ?
                        <div style={selectedCreatureTabStyle}>
                            {creatureWithInd.name}
                        </div>
                    :
                        <div style={creatureTabStyle}
                            onClick={() => this.props.changeSelectedCreature(ind)}
                        >
                            {creatureWithInd.name}
                        </div>
                    }
                </div>) 
            )}
            
            <div style={addCreatureButtonStyle}
                onClick={this.props.openAddCreature}
            >
                &#65291;
            </div>
        </div>);
    }
}