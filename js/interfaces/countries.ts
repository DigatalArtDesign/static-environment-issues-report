export interface Countriable {
    country: string;
    region: string;
}

export type Country = {
    // eslint-disable-next-line no-unused-vars
    [P in string]: Country;
}
