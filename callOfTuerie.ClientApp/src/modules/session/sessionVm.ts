import { subscribe } from "@/global/injector";
import Openable from "@/global/openable";
import JoueurRepository from "@/repositories/joueur/joueurRepository";
import Session from "@/repositories/session/session";
import SessionRepository from "@/repositories/session/sessionRepository";
import Routes from "@/router";
import Routing from "@/router/routing";

export default class SessionVm {
  dialog = new Openable();
  repoJoueurs!: JoueurRepository;
  repoSession!: SessionRepository;
  router!: Routing;
  session = new Session();
  constructor() {
    this.repoJoueurs = subscribe(JoueurRepository);
    this.repoSession = subscribe(SessionRepository);
    this.router = subscribe(Routing);
  }

  inGame(id: number) {
    return this.session.joueurIds.includes(id);
  }

  addOrRemoveInGame(id: number) {
    if (this.inGame(id)) {
      this.session.joueurIds = this.session.joueurIds.filter((x) => x != id);
    } else this.session.joueurIds.push(id);
    console.log("in game", this.session.joueurIds);
  }

  selectAll() {
    if (this.allSelected) this.session.joueurIds = [];
    else this.session.joueurIds = this.repoJoueurs.joueurs.map((x) => x.id);
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
}
