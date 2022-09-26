import Feedable from "@/global/feedable";
import { TypeCompte } from "../enums/typeCompte";
import { TypeService } from "../typeService/typeService";

export default class User extends Feedable {
  public id = 0;
  public email = "";
  public nom = "";
  public prenom = "";

  public adresse = "";
  public complement_adresse = "";
  public codePostal = "";
  public ville = "";
  public telephone = "";

  public password = "";

  public typeCompte = TypeCompte.Utilisateur;

  public profil_id = 0;
  constructor(options?: Partial<User>) {
    super();
    this.feed(options);
    if (options && (options as any).type_compte)
      this.typeCompte = (options as any)?.type_compte ?? TypeCompte.Utilisateur;
  }

  public get allValid() {
    return this.nom.isNullOrEmpty();
  }
}

export class UserInscription extends User {
  public password = "";
  public nomProfil = "";
  constructor(options?: Partial<UserInscription>) {
    super(options);
  }

  public get isValidForInscription() {
    return (
      !this.nomProfil.isNullOrEmpty() &&
      !this.nom.isNullOrEmpty() &&
      !this.prenom.isNullOrEmpty() &&
      !this.email.isNullOrEmpty() &&
      !this.password.isNullOrEmpty()
    );
  }
}
