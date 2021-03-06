import Deserialiser, { SerialisableProperties } from "./Deserialiser";
import { FormSerialisable } from "../../interfaces/formData";

export default class AmountOfInjures implements FormSerialisable<AmountOfInjures> {
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
  
    public deserialise(amount: any): AmountOfInjures {
      const props: SerialisableProperties[] = AmountOfInjures.fields.map(i => ({propName: i}));
      const serialiser = new Deserialiser(AmountOfInjures, props);
      return serialiser.deserialize(amount);
    }
  }
  