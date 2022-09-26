/**
 * Classe utilitaire d'accès typé au Local Storage.
 * @warning Il est souhaitable de ne pas stocké des objets dont les types contiennent des méthodes.
 */
export default class Store {
  /**
   * Enregistre un objet dans le Local Storage.
   * @param key Clé utilisée par le Local Storage.
   * @param item Objet à stocker.
   */
  public static save<T>(key: string, item: T) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * Charge un objet depuis le Local Storage.
   * @param key Clé utilisée par le Local Storage.
   * @param defaultValue Valeur de l'objet par défaut à stocké le cas échéant s'il n'y a pas encore la valeur correspondante dans le Local Storage.
   * @returns L'objet stocké.
   * @warning Attention, l'objet chargé n'aura qu'un prototype interprété (il n'aura ni ses méthodes, ni accesseurs, ni son contructeur).
   */
  public static load<T>(key: string, defaultValue: T) {
    const json = localStorage.getItem(key);
    if (!json && !defaultValue) {
      throw `[Local Store]: ${key} not found`;
    }
    if (!json || json == "") Store.save(key, defaultValue);
    return json ? (JSON.parse(json) as T) : defaultValue;
  }

  /**
   * Retire la clé et sa valeur du Local Storag.
   * @param key Clé utilisée par le Local Storage.
   */
  public static destroy(key: string) {
    if (localStorage.getItem(key)) localStorage.removeItem(key);
  }

  /**
   * Vide entièrement le Local Storage.
   * @warning A éviter en dehors des PWA.
   */
  public static clear() {
    localStorage.clear();
  }
}
