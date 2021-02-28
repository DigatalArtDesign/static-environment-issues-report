import axios, { AxiosInstance } from "axios";
import { Countriable } from "../interfaces/countries";

export class Api {
    globalHttp: AxiosInstance
    http: AxiosInstance

    constructor() {
        this.http = axios.create();
        this.globalHttp = axios.create();
    }

    async loadCountries(): Promise<Countriable[]> {
        const countries = await this.http.get("https://api.first.org/data/v1/countries");

        return Object.values(countries.data.data);
    }

}

export const api = new Api();