import React, { Component, CSSProperties } from 'react';

import {CreatureType, EnchantmentType, PowerToughness} from '../CardTypes';

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
    selectedCreatureIndex: number,
    nonAuraEnchantments: number,
}

export interface CreatureState {
    index: number,
    creature: CreatureType,
    enchantments: EnchantmentType[],
    keywords: string[],
    powerToughness: PowerToughness,
}

const fullPage: CSSProperties = {
    maxWidth: "100vw",
    maxHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
}

const mainAppStyle: CSSProperties = {
    width: "500px",
    height: "100vh",
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
}

const bodyStyle: CSSProperties = {
    height: "calc(100% - 110px)",
}

const initialState = {
    creatures: [],
    pickCreatureOpen: true,
    pickEnchantmentOpen: false,
    selectedCreatureIndex: -1,
    nonAuraEnchantments: 0,
}

export default class MainApp extends Component<any, AppState> {
    
    constructor(props: any) {
        super(props);

        this.state = initialState;
    }

    render() {
        return(
            <div style={fullPage}>
                <div style={mainAppStyle}>
                    <CreatureHeader {...this.state} />
                    {this.renderSwitch()}
                </div>
            </div>
        );
    }

    renderSwitch:() => JSX.Element = () => {
        const {pickCreatureOpen, pickEnchantmentOpen} = this.state;
        if ( pickCreatureOpen ) {
            return(
                <div style={bodyStyle}>
                    <AddCreature {...this.state} addCreatureFunc={this.addCreature} />
                    <CancelButton cancelAddPanel={this.cancelAddPanel}/>
                </div>
            );
        }

        if ( pickEnchantmentOpen ) {
            return(
                <div style={bodyStyle}>
                    <AddEnchantment {...this.state} addEnchantmentFunc={this.addEnchantment} />
                    <CancelButton cancelAddPanel={this.cancelAddPanel}/>
                </div>
            );
        }

        const { creatures } = this.state; 
        return(
            <div style={bodyStyle}>
                {creatures.map(creature =>
                    <AttachedCreature creatureState={creature} key={creature.index} />
                )}
                <ButtonBar appState={this.state} 
                        openAddEnchantment={() => this.setState({pickEnchantmentOpen: true})}
                        refresh={() => this.setState(initialState)}
                />
            </div>);
    }

    cancelAddPanel = () => {
        this.setState({pickCreatureOpen: false, pickEnchantmentOpen: false});
    }

    addCreature: (creature: CreatureType) => void = creature => {
        const creatures = this.state.creatures;
        const newCreature = {index: creatures.length,
            creature: creature,
            enchantments: [],
            keywords: creature.baseKeywords,
            powerToughness: creature.basePowerToughness,    
        }
        const newCreatures = [...creatures, newCreature].sort((a, b) => a.index - b.index);
        this.setState({creatures: newCreatures, selectedCreatureIndex: creatures.length});
        this.cancelAddPanel();
    }
    
    addEnchantment: (enchantment: EnchantmentType) => void = enchantment => {
        this.cancelAddPanel();
        const index = this.state.selectedCreatureIndex;
        if ( index < 0 || index >= this.state.creatures.length) {
            return;
        }
        const creatures = this.state.creatures;
        const selectedCreature = this.state.creatures[this.state.selectedCreatureIndex];
        const newCreature = {index: index,
            creature: selectedCreature.creature,
            enchantments: [...selectedCreature.enchantments, enchantment],
            keywords: this.combineKeywords(selectedCreature.keywords, enchantment.addedKeywords),
            powerToughness: selectedCreature.powerToughness,    
        }
        const newCreatureCalculate: CreatureState = 
            this.calculatePowerToughness(
                    newCreature,
                    creatures.splice(index, 1),
                    this.state.nonAuraEnchantments);
        const newCreatures = [...creatures.splice(index, 1), newCreatureCalculate]
                .sort((a,b) => a.index - b.index);
        this.setState({
            creatures: newCreatures,
        })
        console.log(newCreatures);
        this.cancelAddPanel();
    }

    combineKeywords(arr1: string[], arr2: string[]) : string[] {
        const set = new Set([...arr1, ...arr2]);
        return Array.from(set);
    }

    calculatePowerToughness(creatureState: CreatureState, 
            otherCreatures: CreatureState[], nonAuraEnchantments: number):
            CreatureState {
        const creature = creatureState.creature;
        const baseStats = creature.basePowerToughness;
        const baseWithCreature = creature.powerToughnessFunc(
                creature.basePowerToughness,
                creatureState.enchantments.length);
        const totalNumEnchantments = nonAuraEnchantments +
                otherCreatures.reduce((acc, creatureState) => {
                    return acc + creatureState.enchantments.length
                }, creatureState.enchantments.length);
        const result = 
            creatureState.enchantments.reduce((acc, enchantment) => {
                return enchantment.powerToughnessFunc(acc, totalNumEnchantments);
            }, baseWithCreature)
        return {...creatureState, powerToughness: result};
    }
}