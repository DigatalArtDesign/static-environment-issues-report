import uuid from "uuid";

export class FormData {
    constructor() {
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