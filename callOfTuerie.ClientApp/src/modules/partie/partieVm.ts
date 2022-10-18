import { subscribe } from "@/global/injector";
import Notification from "@/plugins/Notification";
import partie_api from "@/repositories/api/partie_api";
import { Joueur } from "@/repositories/joueur/joueur";
import JoueurRepository from "@/repositories/joueur/joueurRepository";
import Map from "@/repositories/map/map";
import MapRepository from "@/repositories/map/mapRepository";
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
  repoMap!: MapRepository;
  id!: number;
  joueurs: Joueur[] = [];
  maps: Array<Map> = [];
  mapRandom: Map = new Map();
  //repoPartie

  constructor() {
    this.router = subscribe(Routing);
    const id = this.router.param<number>("id");
    this.id = id;
    this.repoSession = subscribe(SessionRepository);
    this.repoJoueur = subscribe(JoueurRepository);
    this.repoPartie = subscribe(PartieRepository);
    this.repoMap = subscribe(MapRepository);
  }

  public get formattedDate() {
    return moment(this.session?.date).format("DD/MM/YYYY");
  }

  public get isToday() {
    return this.formattedDate == moment().format("DD/MM/YYYY");
  }

  public get optionsJoueurs() {
    return this.joueurs.map((x) => {
      return {
        label: x.pseudo,
        value: x.id,
      };
    });
  }

  public randomMap() {
    var indexRandom = Math.floor(Math.random() * this.maps.length);
    this.mapRandom = this.maps[indexRandom];
    this.partie.map = this.mapRandom.nom;
    this.maps.splice(indexRandom, 1);
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
        this.randomMap();
      });
  }

  public async get(id: number) {
    this.repoSession.one(id).then((x) => {
      if (!x) Notification.error("La session est introuvable");
      this.session = new SessionModel(x as SessionModel);

      this.repoPartie
        .get()
        .then(
          (x) =>
            (this.session.parties = this.repoPartie.orderedParties(this.id))
        );
      this.repoJoueur.get().then((x) => {
        this.maps = JSON.parse(JSON.stringify(this.repoMap.maps));

        this.joueurs = this.repoJoueur.joueurs.filter((x) =>
          this.session.joueurIds.includes(x.id)
        );
      });
    });

    await this.repoMap.get();
  }
}
