
export interface SerialisableProperties {
    propName: string;
    propSerializer?: (value: any) => any;
}

export default class Deserialiser<T> {
    propertyDeserializers!: any;
    constructor(private formClass: new () => T, props: SerialisableProperties[]){
      const mapped = props.map((i): [string, (value: any) => any] => ([i.propName, i.propSerializer]));
      this.propertyDeserializers = new Map<string, ((value: any) => any) | undefined>(mapped);
    }
  
    public deserialize(formData: any): T {
      if(!formData) {
        return;
      }
  
      const form = new this.formClass();
  
      for (const propName of Object.keys(formData)) {
        if (this.propertyDeserializers.has(propName)) {
          const deserializer = this.propertyDeserializers.get(propName);
  
          form[propName] = deserializer === undefined ? formData[propName] : deserializer(formData[propName]);
        } else {
          console.error(`No serialiser for ${propName} !`, formData);
        }
      }
      return form;
    }
  }