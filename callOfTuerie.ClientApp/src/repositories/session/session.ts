import Feedable from "@/global/feedable";
import session_api from "../api/session_api";

export default class Session extends session_api {
  public id = 0;
  public date = "";
  public joueurIds: Array<number> = [];

  constructor(options?: Partial<Session>) {
    super();
    this.feed(options);
    if (options?.joueur_ids)
      this.joueurIds = (options.joueur_ids as any).joueurs;
  }
}
