export interface PowerToughness {
    power: number,
    toughness: number,
}

export interface CreatureType {
    name: string,
    png: any,
    basePowerToughness: PowerToughness,
    baseKeywords: string[],
    powerToughnessFunc: (powerToughness: PowerToughness) => PowerToughness, //For spiritdancer
}

export interface EnchantmentType {
    name: string,
    png: any,
    addedKeywords: string[],
    powerToughnessFunc: (powerToughness: PowerToughness) => PowerToughness,
}