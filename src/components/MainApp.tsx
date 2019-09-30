import React, { Component, CSSProperties } from 'react';

import {CreatureType, EnchantmentType, PowerToughness} from '../CardTypes';

import * as CardInfo from '../constants/CardInformation';
import ButtonBar from './ButtonBar';
import CreatureHeader from './CreatureHeader';
import AttachedCreature from './AttachedCreature';
import AddCreature from './AddCreature';
import AddEnchantment from './AddEnchantment';
import CancelButton from './CancelButton';

export interface AppState {
    creatures: CreatureState[],
    pickCreatureOpen: boolean,
    pickEnchantmentOpen: boolean,
}

export interface CreatureState {
    creature: CreatureType,
    enchantments: EnchantmentType[],
    keywords: string[],
    powerToughness: PowerToughness,
}

const mainAppStyle: CSSProperties = {
    width: "300px",
    height: "100vh",
}

const bodyStyle: CSSProperties = {
    height: "100%",
}

export default class MainApp extends Component<any, AppState> {
    state = {
        creatures: [{creature: CardInfo.SlipperyBogle, 
            enchantments: [CardInfo.DaybreakCoronet], 
            keywords: ["hexproof", "vigilance", "lifelink"], 
            powerToughness: {power: 1, toughness: 1}}],
        pickCreatureOpen: false,
        pickEnchantmentOpen: false
    }

    render() {
        return(
            <div style={mainAppStyle}>
                <CreatureHeader {...this.state} />
                {this.renderSwitch()}
            </div>
        );
    }

    renderSwitch:() => JSX.Element = () => {
        const {pickCreatureOpen, pickEnchantmentOpen} = this.state;
        if ( pickCreatureOpen ) {
            return(
                <div style={bodyStyle}>
                    <AddCreature {...this.state} />
                    <CancelButton cancelAddPanel={this.cancelAddPanel}/>
                </div>
            );
        }

        if ( pickEnchantmentOpen ) {
            return(
                <div style={bodyStyle}>
                    <AddEnchantment {...this.state} />
                    <CancelButton cancelAddPanel={this.cancelAddPanel}/>
                </div>
            );
        }

        const { creatures } = this.state; 
        return(
            <div style={bodyStyle}>
                {creatures.map(creature =>
                    <AttachedCreature creatureState={creature} />
                )}
                <ButtonBar {...this.state} />
            </div>);
    }

    cancelAddPanel = () => {
        this.setState({pickCreatureOpen: false, pickEnchantmentOpen: false});
    }
}