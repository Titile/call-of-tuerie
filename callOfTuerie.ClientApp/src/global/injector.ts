import { inject, provide, ref } from '@vue/runtime-core'

/**
 * Charge un objet typé depuis l'injecteur de dépendance.
 * Utilisable uniquement dans la balise <script></script> d'un composant vue.
 * @param type Classe à charger depuis l'injecteur de dépendances.
 * @returns L'objet injecté (réactif dans l'IHM) de la classe correspondate.
 */
export function subscribe<T>(type: new (...args: any[]) => T) {
  return inject(type.name) as T
}

/**
 * Inject un objet typé dans l'injecteur de dépendance.
 * Utilisable uniquement dans la balise <script></script> d'un composant vue.
 * @param value Objet à injecté.
 * @returns L'objet injecté (réactif dans l'IHM).
 * @warning Attention, ne pas injecté deux objets du même type car le type sert de clé dans l'injecteur.
 */
export function register<T>(value: T) {
  const val = ref(value).value
  provide((val as Object).constructor.name, val)
  return val as T
}

/**
 * Inject un objet typé dans l'injecteur de dépendance sous l'interface d'un type duquel il hérite.
 * Permet l'agnotisme.
 * Utilisable uniquement dans la balise <script></script> d'un composant vue.
 * @param type Type interfacé.
 * @param value Objet à injecté.
 * @returns L'objet injecté (réactif dans l'IHM).
 * @warning Attention, ne pas injecté deux objets du même type car le type sert de clé dans l'injecteur.
 */
export function registerAs<T, U extends T>(type: new (...args: any[]) => T, value: U) {
  const val = ref(value).value
  provide(type.name, val)
  return val as U
}
