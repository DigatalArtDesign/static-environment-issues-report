import uuid from "uuid";

class InjuredFromAttack {
  rareSpecies: boolean = false;
  ozoneLayer: boolean = false;
  meanTemperature: boolean = false;
  plants: boolean = false;
  rivers: boolean = false;
  lakes: boolean = false;
  soil: boolean = false;
  cities: boolean = false;
  other: boolean= false;

  constructor() {
    Object.keys(i => this[i] = false);
  }

  public static deserialize(injured: any): InjuredFromAttack {
    const temp = new InjuredFromAttack();
    for (const propertyName of Object.keys(injured)) {
      if (InjuredFromAttack.propertyDeserializers.has(propertyName)) {
        const deserializer =
        InjuredFromAttack.propertyDeserializers.get(propertyName);
        
          temp[propertyName] = deserializer === undefined ?
          injured[propertyName] :
          deserializer(temp[propertyName]);
      } else {
        throw Error(`No deserializer for ${propertyName}!`);
      }
    }
    return temp;
  }

  static propertyDeserializers =
  new Map<string, ((value: any) => any) | undefined>([
    ["rareSpecies", undefined],
    ["ozoneLayer", undefined],
    ["meanTemperature", undefined],
    ["plants", undefined],
    ["rivers", undefined],
    ["lakes", undefined],
    ["soil", undefined],
    ["cities", undefined],
    ["other", undefined],
  ]);
}

class InjureType {
  polutionAssault: boolean = true;
  endangeredSpeciesPoaching: boolean = false;
  arson: boolean = false;
  dump: boolean = false;

  constructor(value = 0) {
    Object.keys(i => i === value ? this[i] = true : this[i] = false);
  }

  public static deserialize(amount: any): InjureType {
    const type = new InjureType();
    for (const propertyName of Object.keys(amount)) {
      if (InjureType.propertyDeserializers.has(propertyName)) {
        const deserializer =
        InjureType.propertyDeserializers.get(propertyName);
        
          type[propertyName] = deserializer === undefined ?
          amount[propertyName] :
          deserializer(amount[propertyName]);
      } else {
        throw Error(`No deserializer for ${propertyName}!`);
      }
    }
    return type;
  }

  static propertyDeserializers =
  new Map<string, ((value: any) => any) | undefined>([
    ["polutionAssault", undefined],
    ["arson", undefined],
    ["endangeredSpeciesPoaching", undefined],
    ["dump", undefined]
  ]);
}

class AmountOfInjures {
  minor: boolean = true;
  medium: boolean = false;
  severe: boolean = false;

  constructor(value = 0) {
    Object.keys(i => i === value ? this[i] = true : this[i] = false);
  }

  static propertyDeserializers =
  new Map<string, ((value: any) => any) | undefined>([
    ["minor", undefined],
    ["medium", undefined],
    ["severe", undefined]
  ]);

  public static deserialize(amount: any): AmountOfInjures {
    const injures = new AmountOfInjures();
    for (const propertyName of Object.keys(amount)) {
      if (AmountOfInjures.propertyDeserializers.has(propertyName)) {
        const deserializer =
          AmountOfInjures.propertyDeserializers.get(propertyName);
        
          injures[propertyName] = deserializer === undefined ?
          amount[propertyName] :
          deserializer(amount[propertyName]);
      } else {
        throw Error(`No deserializer for ${propertyName}!`);
      }
    }
    
    return injures;
  }
}

export default class FormData {
  name: string;

  issue: string;

  email: string;

  id: string;

  injuredFromAttack = new InjuredFromAttack();

  type = new InjureType();

  amountOfInjures = new AmountOfInjures();

  description: string;

  public isDomLinked(obj: any) {
    return !["id"].includes(obj);
  }

  public static create(
    name: string,
    issue: string,
    email: string,
    id: string,
    injuredFromAttack: InjuredFromAttack,
    type: InjureType,
    amountOfInjures: AmountOfInjures,
    description: string
  ) {
    const formData = new FormData();
    formData.name = name;
    formData.issue = issue;
    formData.email = email;
    formData.id = id,
    formData.injuredFromAttack = injuredFromAttack,
    formData.type = type;
    formData.amountOfInjures = amountOfInjures;
    formData.description = description;
    return formData;

  }

  static propertyDeserializers =
  new Map<string, ((value: any) => any) | undefined>([
    ["name", undefined],
    ["email", undefined],
    ["issue", undefined],
    ["id", undefined],
    ["description", undefined],
    ["injuredFromAttack", InjuredFromAttack.deserialize],
    ["type", InjureType.deserialize],
    ["amountOfInjures", AmountOfInjures.deserialize]
  ]);

  constructor() {
    this.resetForm();
  }

  resetForm() {
    this.name = "";
    this.issue = "";
    this.email = "";
    this.id = uuid();
    this.injuredFromAttack = new InjuredFromAttack();
    this.type = new InjureType();
    this.amountOfInjures = new AmountOfInjures();
    this.description = "";
  }

  public static deserialize(formData: any): FormData {
    if(!formData) {
      return;
    }
    const form = new FormData();
    for (const propertyName of Object.keys(formData)) {
      if (FormData.propertyDeserializers.has(propertyName)) {
        const deserializer =
          FormData.propertyDeserializers.get(propertyName);
        
          form[propertyName] = deserializer === undefined ?
          formData[propertyName] :
          deserializer(formData[propertyName]);
      } else {
        throw Error(`No deserializer for ${propertyName}!`);
      }
    }
    
    return form;
  }
}