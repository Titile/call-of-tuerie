import { subscribe } from "@/global/injector";
import Openable from "@/global/openable";
import { Joueur } from "@/repositories/joueur/joueur";
import JoueurRepository from "@/repositories/joueur/joueurRepository";
import Notification from "@/plugins/Notification";

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
    this.joueur = new Joueur();
  }

  public showEdit(joueur: Joueur) {
    this.joueur = new Joueur(joueur);
    this.dialog.open();
  }

  public delete(id: number) {
    Notification.confirm(
      "Etes-vous sûr(e) de vouloir supprimer ce cochon ?",
      "Confirmation de suppression",
      () => {
        this.repository.delete(id).then((x) => {
          if (x) Notification.success("Le sauvage a bien été supprimé ");
        });
      }
    );
  }

  public addOrEdit() {
    if (this.joueur.id == 0) {
      this.repository.add(this.joueur).then(() => this.dialog.close());
    } else {
      this.repository.edit(this.joueur).then(() => this.dialog.close());
    }
  }
}
