import axios, { AxiosInstance } from "axios";
import { Countriable } from "../interfaces/countries";
import FormData from "../classes/FormData";

export class Api {
    protected globalHttp: AxiosInstance

    protected http: AxiosInstance

    constructor() {
      this.http = axios.create({
        // eslint-disable-next-line no-undef
        baseURL: process.env.BASE_URL 
      });
      this.globalHttp = axios.create();
    }

    async loadCountries(): Promise<Countriable[]> {
      const countriesApi = "https://api.first.org/data/v1/countries";
      const countries = await this.globalHttp.get(countriesApi);

      return Object.values(countries.data.data);
    }

    async loadReports(): Promise<FormData[]> {
      const reports = await this.http.get("/reports");
      const mapCases = (reports.data).map(i => typeof i.id === "number" ? i.report : i);

      return (mapCases).map(i => FormData.deserialize(i));
    }

    async sendReport(report: FormData): Promise<void> {
      await this.http.post("/reports", {
        ...report
      });
    }
}

export const api = new Api();
