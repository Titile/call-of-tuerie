import Requester from "@/plugins/requester/requester";
import Store from "@/global/store";
import Account from "./account";

/**
 * @repository Gestion global des informations de comptes (transversales à l'application).
 */
export default class AccountRepository {
  public account = new Account();

  /**
   * Constructeur.
   * @param requester Requêteur.
   * @param storeName Clef utilisé pour le Local Storage.
   */
  constructor(public storeKey: string) {}

  /**
   * Recharge les informations depuis le Local Storage.
   * @returns Retourne ce repository pour chaînage fonctionnel.
   */
  public reload() {
    const accountStore = Store.load(this.storeKey, new Account());
    this.account = new Account({
      id: accountStore.id,
      profilId: accountStore.profilId,
      email: accountStore.email,
      nom: accountStore.nom,
      prenom: accountStore.prenom,
      typeCompte: accountStore.typeCompte,
    });
  }

  /**
   * Efface les informations de compte et les supprime du Local Storage.
   */
  public logout() {
    this.account = new Account();
    Store.save(this.storeKey, this.account);
  }
}
