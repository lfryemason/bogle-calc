import React, {Component, CSSProperties} from 'react';
import { AppState } from './MainApp';

import RefreshButton from '../res/RefreshButton.png';
import { EnchantmentType } from '../CardTypes';

const buttonBarStyle: CSSProperties = {
    height: "70px",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
}

const refreshButtonStyle: CSSProperties = {
    height: "50px",
    width: "50px",
}

const addEnchantmentStyle: CSSProperties = {
    height: "50px",
    width: "calc(100% - 70px)",
    backgroundColor: "#F5F5F5",
    border: "4px #0090FF solid",
    borderRadius: "10px",
    color: "#0090FF",
    fontSize: "21px"
}

interface ButtonBarProps {
    appState: AppState,
    openAddEnchantment: () => void,
    refresh: () => void,
}

export default class ButtonBar extends Component<ButtonBarProps> {
    render() {
        return(
            <div style={buttonBarStyle}>
                <img src={RefreshButton}
                        style={refreshButtonStyle}
                        onClick={this.props.refresh}
                />

                <button style={addEnchantmentStyle} 
                        onClick={this.props.openAddEnchantment}
                >
                    Add enchantment
                </ button>
            </div>);
    }
}