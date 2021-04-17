import { AppViewModes } from "../interfaces/viewModes";

export class AppSettings {
    private static instance: AppSettings;
    private _currentMode!: AppViewModes;

    private constructor() {
        const storageMode = Number(window.localStorage.getItem("mode")) as AppViewModes;
        if (isNaN(storageMode) && !Object.values(AppViewModes).includes(storageMode)) {
            console.warn("Local strorage mode was not found. Switching to standart");
            this._currentMode = AppViewModes.STANDARD;
        } else {
            this._currentMode = storageMode;
        }
    }

    get currentMode() {
        return this._currentMode;
    }

    set currentMode(mode: AppViewModes) {
        this._currentMode = mode;
        window.localStorage.setItem("mode", String(this._currentMode));
    }

    public static getInstance(): AppSettings {
        if(!AppSettings.instance) {
            return new AppSettings();
        }

        return AppSettings.instance;
    } 
}

const appSettings = AppSettings.getInstance();

export default appSettings;

