import React, { Component, CSSProperties } from 'react';

interface CancelButtonState {
    cancelAddPanel: () => void,
} 

const cancelButtonStyle: CSSProperties = {
    height: "40px",
    width: "calc(100% - 32px)",
    backgroundColor: "#F5F5F5",
    border: "4px #FF0000 solid",
    borderRadius: "16px",
    color: "#FF0000",
    fontSize: "21px",
    margin: "10px 16px 10px 16px",
}

export default class CancelButton extends Component<CancelButtonState> {
    render() {
        return(
            <button style={cancelButtonStyle} onClick={this.props.cancelAddPanel}>
                Cancel
            </ button>
        );
    }
}