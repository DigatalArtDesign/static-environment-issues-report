import uuid from "uuid";
import Deserialiser, { SerialisableProperties } from "./Deserialiser";
import { FormSerialisable } from "../../interfaces/formData";
import InjuredFromAttack  from "./InjuredFromAttack";
import InjureType from "./InjureType";
import AmountOfInjures from "./AmountOfInjures";
import AppErrorText from "./AppErrorText";

enum FormErrorTextEnum  {
  name = "nameError",
  issue = "issueError",
  email = "emailError",
  description = "descriptionError"
}

export interface FormDataRawable {
  name: string;
  issue: string;
  email: string;
  id: string;
  injuredFromAttack: InjuredFromAttack;
  type: InjureType;
  amountOfInjures: AmountOfInjures;
  description: string;
  sentTime: number;
}

export class FormDataRaw implements FormDataRawable {
  name = "";
  issue = "";
  email = "";
  id = "";
  injuredFromAttack = new InjuredFromAttack();
  type = new InjureType();
  amountOfInjures = new AmountOfInjures();
  description = "";
  sentTime = 1;

  [Symbol.iterator] = function() {
    let i = Object.keys(this).length - 1;

    return {
      next: (): {done: boolean, value: [string, any]} => {
          return {
              done: (i >= 0) ? false : true,
              value: [Object.keys(this)[i] , Object.values(this)[i--]]
          };
      }
    };
  }

  constructor() {
    console.log(this);
  }

  protected get allData() {
    return ({
      name: this.name,
      issue: this.issue,
      email: this.email,
      id: this.id,
      injuredFromAttack: this.injuredFromAttack,
      type: this.type,
      amountOfInjures: this.amountOfInjures,
      description: this.description,
      sentTime: this.sentTime,
    });
  }
}

export default class FormData extends FormDataRaw implements FormSerialisable<FormDataRaw> {
  private nameError: AppErrorText | null = null;
  private issueError: AppErrorText | null = null;
  private emailError: AppErrorText | null = null;
  private descriptionError: AppErrorText | null = null;

  getValidatedFields() {
    return ({name: this.name,issue: this.issue, email: this.email, description: this.description});
  }

  getFieldError(fieldName: string) {
    const field: FormErrorTextEnum = FormErrorTextEnum[fieldName];
    if(this[field] === undefined) {
      throw new Error("ErrorField could not be found");
    }
    return this[field];
  }

  setFieldError(fieldName: string) {
    // const errorField = this[FormErrorTextEnum[fieldName]];
    const field: FormErrorTextEnum = FormErrorTextEnum[fieldName];
    if(this[field] === undefined) {
      throw new Error("ErrorField could not be found");
    }
    let parentId = "";
    let innerHTML = "";
    switch(field) {
      case FormErrorTextEnum.name:
        parentId = "form-name-error";
        innerHTML = "Please insert more than 2 characters into the name input";
        break;
      case FormErrorTextEnum.issue:
        parentId = "form-issue-error";
        innerHTML = "Please insert more 5 characters to name the issue";
        break;
      case FormErrorTextEnum.email: 
        parentId = "form-email-error";
        innerHTML = "Please insert correct email address";
        break;
      case FormErrorTextEnum.description:
        parentId = "form-description-error";
        innerHTML = "Please describe your issue in at least 10 characters";
        break;
      default:
        break;
    }
    if (this[field] === null) {
      this[field] = new AppErrorText(parentId, innerHTML);
    }
  }

  mountFieldError(fieldName: string) {
    const field: FormErrorTextEnum = FormErrorTextEnum[fieldName];
    if(!this[field]) {
      throw new Error("ErrorField could not be found or wasnt set");
    }
    this[field].mountElement();
  }

  unmountFieldError(fieldName: string) {
    const field: FormErrorTextEnum = FormErrorTextEnum[fieldName];
    if(!this[field]) {
      throw console.log("ErrorField could not be found or wasnt set");
    }
    this[field].unmountElement();
  }

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
    super();
    this.resetForm(true);
  }

  resetForm(isConstructor = false) {
    this.name = "";
    this.issue = "";
    this.email = "";
    this.id = uuid();
    this.injuredFromAttack = new InjuredFromAttack();
    this.type = new InjureType();
    this.amountOfInjures = new AmountOfInjures();
    this.description = "";
    if(!isConstructor) {
      this.nameError?.unmountElement();
      this.issueError?.unmountElement();
      this.emailError?.unmountElement();
    }
  }

  get fields(): FormDataRawable {
    return this.allData;
  }

  get rules() {
    return {
      name: "required|min:2",
      issue: "required|min:5",
      email: "required|email",
      description: "required|min:10"
    };
  } 

  public deserialise(formData: any): FormDataRaw {
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
    const serialiser = new Deserialiser(FormDataRaw, props);
    return serialiser.deserialize(formData);
  }
}