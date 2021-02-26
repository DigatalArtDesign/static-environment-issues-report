
export interface Countriable {
    country: string;
    region: string;
}

export type Country = {
    [P in string]: Country; 
}
