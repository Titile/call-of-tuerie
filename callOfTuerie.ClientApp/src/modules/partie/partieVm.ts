import { subscribe } from "@/global/injector";
import Notification from "@/plugins/Notification";
import partie_api from "@/repositories/api/partie_api";
import { Joueur } from "@/repositories/joueur/joueur";
import JoueurRepository from "@/repositories/joueur/joueurRepository";
import Partie from "@/repositories/partie/partie";
import PartieRepository from "@/repositories/partie/partieRepository";
import SessionRepository from "@/repositories/session/sessionRepository";
import Routing from "@/router/routing";
import moment from "moment";
import SessionModel from "./models/SessionModel";

export default class PartieVm {
  public session!: SessionModel;
  public partie = new Partie();
  router!: Routing;
  repoSession!: SessionRepository;
  repoJoueur!: JoueurRepository;
  repoPartie!: PartieRepository;
  id!: number;
  joueurs: Joueur[] = [];
  //repoPartie
  maps = [
    "Shipment",
    "Bazar",
    "SpeedBall",
    "Hill",
    "Killhouse",
    "Cargo",
    "Station",
    "Dock",
    "Trench",
    "Stadium",
    "Goulag",
    "Pine",
    "Livestock",
    "Dock",
  ];

  constructor() {
    this.router = subscribe(Routing);
    const id = this.router.param<number>("id");
    this.id = id;
    this.repoSession = subscribe(SessionRepository);
    this.repoJoueur = subscribe(JoueurRepository);
    this.repoPartie = subscribe(PartieRepository);
  }

  public get formattedDate() {
    return moment(this.session?.date).format("DD/MM/YYYY");
  }

  public get optionsJoueurs() {
    return this.joueurs.map((x) => {
      return {
        label: x.pseudo,
        value: x.id,
      };
    });
  }
  public get optionsMaps() {
    return this.maps.map((x) => {
      return {
        label: x,
        value: x,
      };
    });
  }

  public pseudoJoueurPartie(idJoueur: number) {
    return this.repoJoueur.joueurs.find((x) => x.id == idJoueur)?.pseudo ?? "";
  }

  public scoreJoueur(idJoueur: number) {
    return this.repoPartie
      .orderedParties(this.id)
      .filter((x) => x.joueur_id == idJoueur).length;
  }

  public validatePartie() {
    this.repoPartie
      .add(
        new partie_api({
          joueur_id: this.partie.joueur_id,
          map: this.partie.map,
          session_id: this.id,
        })
      )
      .then(() => {
        this.partie = new Partie();
      });
  }

  public async get(id: number) {
    await this.repoSession.one(id).then((x) => {
      if (!x) Notification.error("La session est introuvable");
      this.session = new SessionModel(x as SessionModel);

      this.joueurs = this.repoJoueur.joueurs.filter((x) =>
        this.session.joueurIds.includes(x.id)
      );
    });
    this.session.parties = this.repoPartie.orderedParties(this.id);
  }
}
