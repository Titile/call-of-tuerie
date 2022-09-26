import { subscribe } from "@/global/injector";
import Openable from "@/global/openable";
import { Joueur } from "@/repositories/joueur/joueur";
import JoueurRepository from "@/repositories/joueur/joueurRepository";

export default class JoueurVm {
  dialog = new Openable();
  joueur = new Joueur();
  repository!: JoueurRepository;

  constructor() {
    this.repository = subscribe(JoueurRepository);
    console.log(this.repository);
  }

  public newJoueur() {
    this.dialog.open();
  }

  public addOrEdit() {
    if (this.joueur.id == 0) {
      this.repository.add(this.joueur).then(() => this.dialog.close());
    } else {
      this.repository.edit(this.joueur).then(() => this.dialog.close());
    }
  }
}
