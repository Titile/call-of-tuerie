import partie_api from "../api/partie_api";

export default class Partie extends partie_api {
  public id = 0;

  constructor(options?: Partial<Partie>) {
    super();
    this.feed(options);
  }
}
