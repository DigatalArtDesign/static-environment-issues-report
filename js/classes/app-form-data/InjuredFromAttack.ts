import Deserialiser, { SerialisableProperties } from "./Deserialiser";
import { FormSerialisable } from "../../interfaces/formData";

export default class InjuredFromAttack implements FormSerialisable<InjuredFromAttack>{
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