import Feedable from "@/global/feedable";
import { TypeCompte } from "../enums/typeCompte";
import User from "../user/user";

export default class Account extends Feedable {
  public nom = "";
  public prenom = "";
  public email = "";
  public id = 0;
  public typeCompte: TypeCompte = TypeCompte.Utilisateur;
  public profilId = 0;
  constructor(options?: Partial<Account>) {
    super();
    this.feed(options);
  }

  public fromUser(user: User) {
    this.id = user.id;
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.typeCompte = user.typeCompte;
    this.email = user.email;
    this.profilId = user.profil_id;
    console.log(this.profilId);
    return this;
  }

  public get formatedName() {
    return `${this.prenom} ${this.nom}`;
  }

  public get prenomNomInitial() {
    return `${this.prenom} ${this.nom ? this.nom[0] : ""}.`;
  }
  public get initials() {
    return `${this.prenom ? this.prenom[0] : ""}${this.nom ? this.nom[0] : ""}`;
  }

  public nameFromEmail() {
    const nomPrenom = this.email.split("@")[0];
    this.nom = nomPrenom.split(".")[1];
    this.prenom = nomPrenom.split(".")[0];
    return this;
  }
}
