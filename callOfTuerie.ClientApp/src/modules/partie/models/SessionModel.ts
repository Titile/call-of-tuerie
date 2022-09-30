import { Joueur } from "@/repositories/joueur/joueur";
import Partie from "@/repositories/partie/partie";
import Session from "@/repositories/session/session";
import { groupBy, max, maxBy, uniq } from "lodash";

export default class SessionModel extends Session {
  parties: Partie[] = [];

  constructor(options?: Partial<SessionModel>) {
    super();
    this.feed(options);
  }

  public winner(): Array<{ id: number; score: number }> {
    let winners: Array<{ id: number; score: number }> = [];

    const parties = groupBy(this.parties, (x) => x.joueur_id);
    const joueurId = uniq(this.parties.map((x) => x.joueur_id));
    const winner = {
      id: 0,
      score: 0,
    };

    for (let joueur of joueurId) {
      const partieJoueur = parties[joueur];
      const scoreMax = maxBy(winners, (x) => x.score) ?? { id: 0, score: 0 };
      if (scoreMax?.score < partieJoueur.length) {
        winners = [
          {
            id: joueur,
            score: partieJoueur.length,
          },
        ];
      } else if (scoreMax.score == partieJoueur.length) {
        winners.push({
          id: joueur,
          score: partieJoueur.length,
        });
      }
    }
    console.log(winners);

    return winners;
  }

  pseudoWinners(joueurs: Joueur[]) {
    const winners = this.winner();
    let pseudos = "";
    const names = winners.map(
      (winner) => joueurs.find((x) => x.id == winner.id)?.pseudo ?? "-NA-"
    );
    pseudos = names.join(",");

    return pseudos;
  }
}
