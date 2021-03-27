import Deserialiser, { SerialisableProperties } from "./Deserialiser";
import { FormSerialisable } from "../../interfaces/formData";

export default class InjureType implements FormSerialisable<InjureType> {
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
