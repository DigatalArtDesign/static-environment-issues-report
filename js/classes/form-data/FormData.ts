import uuid from "uuid";
import Deserialiser, { SerialisableProperties } from "./Deserialiser";
import { FormSerialisable } from "../../interfaces/formData";

export class InjuredFromAttack implements FormSerialisable<InjuredFromAttack>{
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

  private static get fields() {
    const i = new InjuredFromAttack();
    return Object.keys(i);
  }

  public deserialise(injured: any): InjuredFromAttack {
    const props: SerialisableProperties[] = InjuredFromAttack.fields.map(i => ({propName: i}));
    const serialiser = new Deserialiser(InjuredFromAttack, props);
    return serialiser.deserialize(injured);
  }
}

export class InjureType implements FormSerialisable<InjureType> {
  pollutionAssault: boolean = true;
  endangeredSpeciesPoaching: boolean = false;
  arson: boolean = false;
  dump: boolean = false;

  constructor(value = 0) {
    Object.keys(i => i === value ? this[i] = true : this[i] = false);
  }

  private static get fields() {
    const i = new InjureType();
    return Object.keys(i);
  }

  public deserialise(amount: any): InjureType {
    const props: SerialisableProperties[] = InjureType.fields.map(i => ({propName: i}));
    const serialiser = new Deserialiser(InjureType, props);
    return serialiser.deserialize(amount);
  }
}

export class AmountOfInjures implements FormSerialisable<AmountOfInjures> {
  minor: boolean = true;
  medium: boolean = false;
  severe: boolean = false;

  constructor(value = 0) {
    Object.keys(i => i === value ? this[i] = true : this[i] = false);
  }

  private static get fields() {
    const i = new AmountOfInjures();
    return Object.keys(i);
  }

  static propertyDeserializers =
  // eslint-disable-next-line no-unused-vars
  new Map<string, ((value: any) => any) | undefined>([
    ["minor", undefined],
    ["medium", undefined],
    ["severe", undefined]
  ]);

  public deserialise(amount: any): AmountOfInjures {
    const props: SerialisableProperties[] = AmountOfInjures.fields.map(i => ({propName: i}));
    const serialiser = new Deserialiser(AmountOfInjures, props);
    return serialiser.deserialize(amount);
  }
}

export default class FormData implements FormSerialisable<FormData> {
  name: string;

  issue: string;

  email: string;

  id: string;

  injuredFromAttack = new InjuredFromAttack();

  type = new InjureType();

  amountOfInjures = new AmountOfInjures();

  description: string;

  sentTime: number;

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
    description: string,
    sentTime: number
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
    formData.sentTime = sentTime;
    return formData;

  }

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

  get rules() {
    return {
      name: "required|min:2",
      issue: "required|min:5",
      email: "required|email",
    };
  } 

  public deserialise(formData: any): FormData {
    const props: SerialisableProperties[] = [
      {propName: "name"}, 
      {propName: "email"}, 
      {propName: "issue"}, 
      {propName: "id"}, 
      {propName: "description"}, 
      {propName: "sentTime"},
      {propName: "injuredFromAttack", propSerializer: this.injuredFromAttack.deserialise},
      {propName: "type", propSerializer: this.type.deserialise},
      {propName: "amountOfInjures", propSerializer: this.amountOfInjures.deserialise}
    ];
    const serialiser = new Deserialiser(FormData, props);
    return serialiser.deserialize(formData);
  }
}