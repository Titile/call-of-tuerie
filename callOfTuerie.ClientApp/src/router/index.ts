import Configuration from "@/configuration";
import { createRouter, createWebHistory } from "vue-router";

enum Routes {
  Home = "Home",
  Session = "session",
  Joueur = "joueur",
  Partie = "partie",
  Map = "map",
}
export default Routes;
/**
 * Liste de routes des modules.
 */
export const routeConfig = [
  {
    path: "/",
    name: Routes.Session,
    component: () => import("@/modules/session/Session.vue"),
  },
  {
    path: "/partie/:id",
    name: Routes.Partie,
    component: () => import("@/modules/partie/Partie.vue"),
  },
  {
    path: "/joueur",
    name: Routes.Joueur,
    component: () => import("@/modules/joueur/Joueur.vue"),
  },
  {
    path: "/map",
    name: Routes.Map,
    component: () => import("@/modules/map/Map.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routeConfig,
});
const configuration = new Configuration();

// router.beforeEach((to, from, next) => {
//   const account = Store.load(`${configuration.appName}-account`, new Account());
//   if (
//     to.name == Routes.Professionnel &&
//     (!account.id || account.typeCompte != TypeCompte.Professionnel)
//   ) {
//     next({ name: Routes.ProfessionnelAuthentification });
//   }
//   // if(to.name == Routes.Account)
//   else if (
//     to.name == Routes.Admin &&
//     (!account.id || account.typeCompte != TypeCompte.Admin)
//   ) {
//     next({ name: Routes.AdminAuthentification });
//   } else next();
// });
