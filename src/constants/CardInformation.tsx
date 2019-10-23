
import dryadArborPic from '../res/DryadArbor.png'
import gladecoverScoutPic from '../res/GladecoverScout.png'
import korSpiritdancerPic from '../res/KorSpiritdancer.png'
import slipperyBoglePic from '../res/SlipperyBogle.png';
import silhanaLedgewalkerPic from '../res/SilhanaLedgewalker.png';

import unflinchingCouragePic from '../res/UnflinchingCourage.png'
import daybreakCoronetPic from '../res/DaybreakCoronet.png'
import etherealArmorPic from '../res/EtherealArmor.png'
import gryffsBoonPic from '../res/GryffsBoon.png'
import hyenaUmbraPic from '../res/HyenaUmbra.png'
import rancorPic from '../res/Rancor.png'
import spiderUmbraPic from '../res/SpiderUmbra.png'
import spiritLinkPic from '../res/SpiritLink.png'
import spiritMantlePic from '../res/SpiritMantle.png'
import cartoucheOfSolidarityPic from '../res/CartoucheOfSolidarity.png'

import {CreatureType , EnchantmentType} from '../CardTypes';

export const DryadArbor: CreatureType = {
    name: "Dryad Arbor",
    shortName: "Dryad",
    png: dryadArborPic,
    baseKeywords: [],
    basePowerToughness: {power: 1, toughness: 1},
    powerToughnessFunc: powerToughness => powerToughness,
}

export const GladecoverScout: CreatureType = {
    name: "Gladecover Scout",
    shortName: "Scout",
    png: gladecoverScoutPic,
    baseKeywords: ["hexproof"],
    basePowerToughness: {power: 1, toughness: 1},
    powerToughnessFunc: powerToughness => powerToughness,
}

export const KorSpiritdancer: CreatureType = {
    name: "Kor Spiritdancer",
    shortName: "Spiritdancer",
    png: korSpiritdancerPic,
    baseKeywords: [],
    basePowerToughness: {power: 0, toughness: 2},
    powerToughnessFunc: (powerToughness, numAttachments) => {
        return {power: powerToughness.power + 2*numAttachments,
            toughness: powerToughness.toughness + 2*numAttachments,}
    }
}

export const SlipperyBogle: CreatureType = {
    name: "Slippery Bogle",
    shortName: "Bogle",
    png: slipperyBoglePic,
    baseKeywords: ["hexproof"],
    basePowerToughness: {power: 1, toughness: 1},
    powerToughnessFunc: powerToughness => powerToughness,
}


export const SilhanaLedgewalker: CreatureType = {
    name: "Silhana Ledgewalker",
    shortName: "Ledgewalker",
    png: silhanaLedgewalkerPic,
    baseKeywords: ["hexproof", "can't be blocked except by creatures with flying"],
    basePowerToughness: {power: 1, toughness: 1},
    powerToughnessFunc: powerToughness => powerToughness,
}

export const DaybreakCoronet: EnchantmentType = {
    name: "Daybreak Coronet",
    png: daybreakCoronetPic,
    addedKeywords: ["vigilance", "first strike", "lifelink"],
    powerToughnessFunc: powerToughness => 
        ({power: powerToughness.power + 3, toughness: powerToughness.toughness + 3})
}

export const EtherealArmor: EnchantmentType = {
    name: "Ethereal Armor",
    png: etherealArmorPic,
    addedKeywords: ["first strike"],
    powerToughnessFunc: (powerToughness, num) => 
        ({power: powerToughness.power + num, toughness: powerToughness.toughness + num})
}

export const GryffsBoon: EnchantmentType = {
    name: "Gryff's Boon",
    png: gryffsBoonPic,
    addedKeywords: ["flying"],
    powerToughnessFunc: powerToughness => 
        ({power: powerToughness.power + 1, toughness: powerToughness.toughness + 0})
}

export const HyenaUmbra: EnchantmentType = {
    name: "Hyena Umbra",
    png: hyenaUmbraPic,
    addedKeywords: ["first strike", "totem armor"],
    powerToughnessFunc: powerToughness => 
        ({power: powerToughness.power + 1, toughness: powerToughness.toughness + 1})
}

export const Rancor: EnchantmentType = {
    name: "Rancor",
    png: rancorPic,
    addedKeywords: ["trample"],
    powerToughnessFunc: powerToughness => 
        ({power: powerToughness.power + 2, toughness: powerToughness.toughness + 0})
}

export const SpiderUmbra: EnchantmentType = {
    name: "Spider Umbra",
    png: spiderUmbraPic,
    addedKeywords: ["reach", "totem armor"],
    powerToughnessFunc: powerToughness => 
        ({power: powerToughness.power + 1, toughness: powerToughness.toughness + 1})
}

export const SpiritLink: EnchantmentType = {
    name: "Spirit Link",
    png: spiritLinkPic,
    addedKeywords: ["lifelink"],
    powerToughnessFunc: powerToughness => powerToughness,
}

export const SpiritMantle: EnchantmentType = {
    name: "Spirit Mantle",
    png: spiritMantlePic,
    addedKeywords: ["protection from creatures"],
    powerToughnessFunc: powerToughness => 
        ({power: powerToughness.power + 1, toughness: powerToughness.toughness + 1})
}

export const UnflinchingCourage: EnchantmentType = {
    name: "Unflinching Courage",
    png: unflinchingCouragePic,
    addedKeywords: ["trample", "lifelink"],
    powerToughnessFunc: powerToughness => 
        ({power: powerToughness.power + 2, toughness: powerToughness.toughness + 2})
}

export const CartoucheOfSolidarity: EnchantmentType = {
    name: "Cartouche of Solidarity",
    png: cartoucheOfSolidarityPic,
    addedKeywords: ["first strike"],
    powerToughnessFunc: powerToughness => 
        ({power: powerToughness.power + 1, toughness: powerToughness.toughness + 1})
}

export const CreatureList: CreatureType[] = 
[
    GladecoverScout,
    SlipperyBogle,
    KorSpiritdancer,
    DryadArbor,
    SilhanaLedgewalker,
]

export const EnchantmentList: EnchantmentType[] = 
[
    DaybreakCoronet,
    EtherealArmor,
    GryffsBoon,
    HyenaUmbra,
    Rancor,
    SpiderUmbra,
    SpiritLink,
    SpiritMantle,
    UnflinchingCourage,
    CartoucheOfSolidarity
]
