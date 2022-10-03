import { subscribe } from "@/global/injector";
import Openable from "@/global/openable";
import JoueurRepository from "@/repositories/joueur/joueurRepository";
import Partie from "@/repositories/partie/partie";
import PartieRepository from "@/repositories/partie/partieRepository";
import Session from "@/repositories/session/session";
import SessionRepository from "@/repositories/session/sessionRepository";
import Routes from "@/router";
import Routing from "@/router/routing";
import { countBy, max, maxBy } from "lodash";
import moment from "moment";
import SessionModel from "../partie/models/SessionModel";

export default class SessionVm {
  dialog = new Openable();
  repoJoueurs!: JoueurRepository;
  repoSession!: SessionRepository;
  repoPartie!: PartieRepository;
  router!: Routing;
  session = new Session();
  sessions: SessionModel[] = [];
  constructor() {
    this.repoJoueurs = subscribe(JoueurRepository);
    this.repoSession = subscribe(SessionRepository);
    this.repoPartie = subscribe(PartieRepository);
    this.router = subscribe(Routing);
  }

  public formatedDate(date: string) {
    return moment(date).format("DD/MM/YYYY HH:mm");
  }

  inGame(id: number) {
    return this.session.joueurIds.includes(id);
  }

  addOrRemoveInGame(id: number) {
    if (this.inGame(id)) {
      this.session.joueurIds = this.session.joueurIds.filter((x) => x != id);
    } else this.session.joueurIds.push(id);
  }

  pseudoJoueur(idJoueur: number) {
    return (
      this.repoJoueurs.joueurs.find((x) => x.id == idJoueur)?.pseudo ?? "-NA-"
    );
  }

  selectAll() {
    if (this.allSelected) this.session.joueurIds = [];
    else this.session.joueurIds = this.repoJoueurs.joueurs.map((x) => x.id);
  }

  get winnerOfWinner(): number {
    const winners = this.sessions.flatMap((x) => x.winner());
    const countWinner = countBy(winners, (x) => x.id);

    let maxKey = 0,
      maxValue = 0;

    for (const [key, value] of Object.entries(countWinner)) {
      if (value > maxValue) {
        maxValue = value;
        maxKey = parseInt(key);
      }
    }

    return maxKey;
  }

  add() {
    this.repoSession.add(this.session).then((x) => {
      debugger;
      if (x) {
        this.router.push(Routes.Partie, { id: x.id });
      }
      this.dialog.close();
    });
  }

  goToPartie(sessionId: number) {
    this.router.push(Routes.Partie, { id: sessionId });
  }

  public get allSelected() {
    const allId = this.repoJoueurs.joueurs.map((x) => x.id);
    return allId.length == this.session.joueurIds.length;
  }

  public get oneSelected() {
    return this.session.joueurIds.length > 0;
  }

  newGame() {
    this.dialog.open();
  }

  async get() {
    // Charger les sessions
    await this.repoSession.get();
    // Charger les parties
    await this.repoPartie.get();
    // Charger les joueurs
    await this.repoJoueurs.get();
    this.sessions = this.repoSession.sessions.map(
      (x) =>
        new SessionModel({
          id: x.id,
          date: x.date,
          joueurIds: x.joueurIds,
          parties: this.repoPartie.partiesSession(x.id),
        })
    );
  }
}
