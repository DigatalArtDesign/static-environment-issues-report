import axios, { AxiosInstance } from "axios";
import { Country } from "../interfaces/countries";

export class Api {
    globalHttp: AxiosInstance
    http: AxiosInstance

    constructor() {
        this.http = axios.create();
        this.globalHttp = axios.create();
    }

    async loadCountries(): Promise<Country[]> {
        const countries = await this.http.get("https://api.first.org/data/v1/countries");

        return countries.data.data;
    }

}

export const api = new Api();