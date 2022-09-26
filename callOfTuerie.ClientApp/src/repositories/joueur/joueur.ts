import Feedable from "@/global/feedable";
import { joueur_api } from "../api/joueur_api";

export class Joueur extends joueur_api {
  public id = 0;

  constructor(options?: Partial<Joueur>) {
    super();
    this.feed(options);
  }
}
