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
                    <CreatureHeader {...this.state} 
                        openAddCreature={() => this.setState({pickCreatureOpen: true})}
                        changeSelectedCreature={this.changeSelectedCreature}    
                    />
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
                    <AddEnchantment state={this.state} addEnchantmentFunc={this.addEnchantment} 
                            onChangeNonAuraEnchantments={this.changeNumNonAuraEnchantments}
                    />
                    <CancelButton cancelAddPanel={this.cancelAddPanel}/>
                </div>
            );
        }

        const index = this.state.selectedCreatureIndex;
        if (index < 0 || index >= this.state.creatures.length) {
          return(<div style={bodyStyle}/>);
        }
        const creature = this.state.creatures[index]; 
        return(
            <div style={bodyStyle}>
                <AttachedCreature creatureState={creature} removeEnchantment={this.removeEnchantment}/>
                <ButtonBar appState={this.state} 
                        openAddEnchantment={() => this.setState({pickEnchantmentOpen: true})}
                        refresh={() => this.setState(initialState)}
                />
            </div>);
    }

    changeNumNonAuraEnchantments: (num: number) => void = num => {
          if (num < 0)
              return;
          const newCreatures = this.updateCreatures(this.state.creatures, num);
          this.setState({creatures: newCreatures, nonAuraEnchantments: num});
    }

    updateCreatures(creatures: CreatureState[], numNonAuraEnchantments: number): CreatureState[] {
        return creatures.map((creature, index) => {
            return this.calculatePowerToughness(creature, 
                [...creatures.slice(0, index), ...creatures.slice(index+1)],
                numNonAuraEnchantments);
        })
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
        if(selectedCreature.index !== index) {
            console.error("Creatures unsorted");
            return;
        }

        const newCreature = {index: index,
            creature: selectedCreature.creature,
            enchantments: [...selectedCreature.enchantments, enchantment],
            keywords: this.combineKeywords(selectedCreature.keywords, enchantment.addedKeywords),
            powerToughness: selectedCreature.powerToughness,    
        }

        const newCreatures = this.updateCreatures(
            [...creatures.slice(0, index), newCreature, ...creatures.slice(index+1)],
            this.state.nonAuraEnchantments)
            .sort((a,b) => a.index - b.index);
        this.setState({
            creatures: newCreatures,
        })
        this.cancelAddPanel();
    }

    removeEnchantment:(enchantmentIndex: number) => void = (enchantmentIndex) => {
        const { creatures, selectedCreatureIndex } = this.state;
        const changedCreature = creatures[selectedCreatureIndex];
        const newCreatures = 
            [...creatures.slice(0, selectedCreatureIndex),
                {...changedCreature, enchantments: 
                    [...changedCreature.enchantments.slice(0, enchantmentIndex),
                    ...changedCreature.enchantments.slice(enchantmentIndex + 1)]},
                ...creatures.slice(selectedCreatureIndex+1)];
        this.setState({creatures: newCreatures});
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
                baseStats,
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

    changeSelectedCreature: (num: number) => void = num => {
        if ( num >= 0 || num < this.state.creatures.length ) {
            this.setState({selectedCreatureIndex: num});
            return;
        }
        console.error("Selected creature is outside range");
    }
}