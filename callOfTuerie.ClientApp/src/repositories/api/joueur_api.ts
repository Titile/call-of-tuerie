import Feedable from "@/global/feedable";
import { Joueur } from "../joueur/joueur";

export class joueur_api extends Feedable {
  public pseudo = "";

  constructor(options?: Partial<joueur_api>) {
    super();
    this.feed(options);
  }

  fromModel(joueur: Joueur) {
    this.pseudo = joueur.pseudo;
    return this;
  }
}
