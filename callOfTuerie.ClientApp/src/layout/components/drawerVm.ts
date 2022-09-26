import { subscribe } from "@/global/injector";
import Routes from "@/router";
import Routing from "@/router/routing";

export class DrawerVm {
  public isOpen = false;
  public router!: Routing;
  constructor() {
    this.router = subscribe(Routing);
  }

  public openClose() {
    this.isOpen = !this.isOpen;
  }
}
