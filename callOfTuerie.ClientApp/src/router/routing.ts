import {
  useRouter,
  useRoute,
  Router,
  RouteLocationNormalizedLoaded,
  RouteParamsRaw,
} from "vue-router";
import Routes from "@/router/index";

export default class Routing {
  public router!: Router;
  public route!: RouteLocationNormalizedLoaded;
  public current!: Routes;

  constructor() {
    this.router = useRouter();
    this.route = useRoute();
  }

  public get requiresAuth() {
    return this.route.meta.requiresAuth;
  }

  public push(route: Routes, params?: RouteParamsRaw) {
    if (params) this.router.push({ name: route, query: params });
    else this.router.push({ name: route });
    this.current = route;
  }

  public isCurrent(route: Routes) {
    return route == this.current;
  }

  public param(key: string) {
    return new URLSearchParams(document.location.search).get(key);
  }

  public navigateOutsideTo(url: string) {
    window.location.href = url;
  }
}
