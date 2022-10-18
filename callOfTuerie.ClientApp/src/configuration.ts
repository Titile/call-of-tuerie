export default class Configuration {
  public apiUrl!: string;
  public appName!: string;
  public apiKey!: string;
  // public appUrl!: string;
  constructor() {
    const control = (key: string | boolean | undefined) => {
      if (key === null || key === undefined)
        throw "Config value missing or not string";
      return key;
    };

    this.apiUrl = control(import.meta.env.VITE_API_URL) as string;
    this.apiKey = control(import.meta.env.VITE_API_KEY) as string;
    this.appName = control(import.meta.env.VITE_APP_NAME) as string;
    // this.appUrl = control(import.meta.env.APP_URL) as string;
  }
}
