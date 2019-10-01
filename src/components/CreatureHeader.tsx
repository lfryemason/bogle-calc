import React, {Component, CSSProperties} from 'react';

const creatureHeaderStyle: CSSProperties = {
    height: "40px",
    width: "100%",
}

export default class CreatureHeader extends Component {
    render() {
        return(<div style={creatureHeaderStyle}>
            header
        </div>);
    }
}