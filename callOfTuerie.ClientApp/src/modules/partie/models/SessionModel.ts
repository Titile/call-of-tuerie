import Partie from "@/repositories/partie/partie";
import Session from "@/repositories/session/session";
import { groupBy, max, uniq } from "lodash";

export default class SessionModel extends Session {
  parties: Partie[] = [];

  constructor(options?: Partial<SessionModel>) {
    super();
    this.feed(options);
  }

  public winner() {
    const parties = groupBy(this.parties, (x) => x.joueur_id);
    const joueurId = uniq(this.parties.map((x) => x.joueur_id));
    const winner = {
      id: 0,
      score: 0,
    };

    for (let joueur of joueurId) {
      const partieJoueur = parties[joueur];
      if (winner.score < partieJoueur.length) {
        winner.score = partieJoueur.length;
        winner.id = joueur;
      }
    }
    return winner;
  }
}
