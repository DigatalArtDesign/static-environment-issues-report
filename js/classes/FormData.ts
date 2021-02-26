import uuid from "uuid";

interface InjuredFromAttack {
    rareSpecies: boolean;
    ozoneLayer: boolean;
    meanTemperature: boolean;
    plants: boolean;
    rivers: boolean;
    lakes: boolean;
    soil: boolean;
    cities: boolean;
    other: boolean;
}

interface InjureType {
    polutionAssault: boolean;
    endangeredSpeciesPoaching: boolean;
    arson: boolean;
    dump: boolean;
}

interface AmountOfInjures {
    minor: boolean,
    medium: boolean,
    severe: boolean
}

export class FormData {
    name: string;
    issue: string;
    email: string;
    id: string;
    injuredFromAttack: InjuredFromAttack;
    type: InjureType;
    amountOfInjures: AmountOfInjures;
    description: string;


    constructor() {
        this.name ='';
        this.issue = '';
        this.email ='';
        this.id = uuid(),
        this.injuredFromAttack = {
            rareSpecies: false,
            ozoneLayer: false,
            meanTemperature: false,
            plants: false,
            rivers: false,
            lakes: false,
            soil: false,
            cities: false,
            other: false
        };
        this.type = {
            polutionAssault: true,
            endangeredSpeciesPoaching: false,
            arson: false,
            dump: false
        };
        this.amountOfInjures = {
            minor: true,
            medium: false,
            severe: false
        };
        this.description = '';
    }

    resetForm() {
        this.name ='';
        this.issue = '';
        this.email ='';
        this.id = uuid(),
        this.injuredFromAttack ={
            rareSpecies: false,
            ozoneLayer: false,
            meanTemperature: false,
            plants: false,
            rivers: false,
            lakes: false,
            soil: false,
            cities: false,
            other: false
        };
        this.type = {
            polutionAssault: true,
            endangeredSpeciesPoaching: false,
            arson: false,
            dump: false
        };
        this.amountOfInjures = {
            minor: true,
            medium: false,
            severe: false
        };
        this.description = '';
    }
}