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
      const countriesApi = "https://api.first.org/data/v1/countries";
      const countries = await this.http.get(countriesApi);

      return Object.values(countries.data.data);
    }
}

export const api = new Api();
