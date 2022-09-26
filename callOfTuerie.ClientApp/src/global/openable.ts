/**
 * Classe utilitaire de gestion d'ouverture/fermeture.
 * Utile pour les v-if.
 */
export default class Openable {
  /**
   * Constructeur
   * @param isOpen Détermine si l'objet est fermé ou ouvert.
   */
  constructor(public isOpen = false) {}

  /**
   * Rend l'objet "Ouvert".
   */
  public open() {
    this.isOpen = true
  }

  /**
   * Rend l'objet "Fermé".
   */
  public close() {
    this.isOpen = false
  }

  /**
   * Change l'état d'objet (si "Ouvert" devient "Fermé", si "Fermé" devient "Ouvert").
   */
  public change() {
    this.isOpen = !this.isOpen
  }
}
