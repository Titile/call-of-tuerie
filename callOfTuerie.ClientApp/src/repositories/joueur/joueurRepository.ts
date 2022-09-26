import Store from "@/global/store";
import { Joueur } from "./joueur";
import { maxBy, orderBy, some } from "lodash";
import Supabase from "@/plugins/backend/supabase";
import { subscribe } from "@/global/injector";
import Crud from "@/plugins/backend/crudApi";
import { joueur_api } from "../api/joueur_api";
export default class JoueurRepository {
  public joueurs: Array<Joueur> = [];
  public crud!: Crud;
  constructor(public api: Supabase) {
    this.crud = new Crud("joueur", this.api.api);
  }

  public get orderedJoueurs() {
    return orderBy(this.joueurs, (x) => x.id);
  }

  public add(joueur: Joueur) {
    console.log(new joueur_api(joueur));
    const reponse = this.crud.add<joueur_api>(
      new joueur_api().fromModel(joueur)
    );

    return reponse.then((x) => {
      const joueurs = x.map((y: any) => new Joueur(y));
      this.joueurs.push(...joueurs);
    });
  }

  public async edit(joueur: Joueur) {
    const reponse = this.crud.update<Joueur>(joueur);

    return reponse.then((x) => {
      this.get();
    });
  }

  public delete(id: number) {
    return this.crud
      .delete(id)
      .then((x) => (this.joueurs = this.joueurs.filter((x) => x.id != id)))
      .catch((err) => {
        Promise.reject(err);
      });
  }

  public async get() {
    this.crud
      .get()
      .then((x: any) => (this.joueurs = x.map((y: any) => new Joueur(y))));
    // this.api.getAllTypeService().then((x) => (this.joueurs = x));
  }

  public reload() {
    this.get();
  }
}
