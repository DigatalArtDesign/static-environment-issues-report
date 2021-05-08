export interface FormSerialisable<T> {
    deserialise(formData: any): T;
}