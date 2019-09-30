import React, { Component } from 'react';

import {CreatureType, EnchantmentType} from '../CardTypes';

import * as CardInfo from '../constants/CardInformation';

interface MainAppState {
    creatures: CreatureState[],  
}

interface CreatureState {
    creature: CreatureType,
    enchantments: EnchantmentType[],
}


export default class MainApp extends Component {

    render() {
        return(
            <div>
                <img src={CardInfo.SlipperyBogle.png} alt={"test"} />
            </div>
        );
    }
}