import uuid from "uuid";
import Deserialiser, { SerialisableProperties } from "./Deserialiser";
import { FormSerialisable } from "../../interfaces/formData";
import InjuredFromAttack  from "./InjuredFromAttack";
import InjureType from "./InjureType";
import AmountOfInjures from "./AmountOfInjures";

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