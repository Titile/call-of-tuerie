import Partie from "@/repositories/partie/partie";
import Session from "@/repositories/session/session";

export default class SessionModel extends Session {
  parties: Partie[] = [];

  constructor(options?: Partial<SessionModel>) {
    super();
    this.feed(options);
  }
}
