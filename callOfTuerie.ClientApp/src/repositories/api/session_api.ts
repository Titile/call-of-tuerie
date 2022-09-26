import Feedable from "@/global/feedable";
import Session from "../session/session";

export default class session_api extends Feedable {
  public joueur_ids = {};

  constructor(options?: Partial<session_api>) {
    super();
    this.feed(options);
  }

  fromModel(joueur: Session) {
    this.joueur_ids = { joueurs: joueur.joueurIds };
    return this;
  }
}
