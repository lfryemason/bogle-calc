import React, {Component} from 'react';

interface CancelButtonState {
    cancelAddPanel: () => void,
} 

export default class CancelButton extends Component<CancelButtonState> {
    render() {
        return(<div>Cancel</div>);
    }
}