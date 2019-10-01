import slipperyBoglePic from '../res/SlipperyBogle.png';
import daybreakCoronetPic from '../res/DaybreakCoronet.png'

import {CreatureType , EnchantmentType} from '../CardTypes';

export const SlipperyBogle: CreatureType = {
    name: "Slippery Bogle",
    png: slipperyBoglePic,
    baseKeywords: ["hexproof"],
    basePowerToughness: {power: 1, toughness: 1},
    powerToughnessFunc: powerToughness => powerToughness,
}

export const DaybreakCoronet: EnchantmentType = {
    name: "DaybreakCoronet",
    png: daybreakCoronetPic,
    addedKeywords: ["vigilance", "trample", "lifelink"],
    powerToughnessFunc: powerToughness => 
        ({power: powerToughness.power + 3, toughness: powerToughness.toughness + 3})
}

export const CreatureList: CreatureType[] = 
[
    SlipperyBogle,
]

export const EnchantmentList: EnchantmentType[] = 
[
    DaybreakCoronet,
]