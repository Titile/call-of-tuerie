import JoueurRepository from "@/repositories/joueur/joueurRepository";
import MapRepository from "@/repositories/map/mapRepository";
import PartieRepository from "@/repositories/partie/partieRepository";
import SessionRepository from "@/repositories/session/sessionRepository";
import { createClient } from "@supabase/supabase-js";
import { Dialog } from "quasar";
import { resolveTransitionHooks } from "vue";
import Notification from "../Notification";

export default class Supabase {
  public api!: any;
  constructor(url: string, apikey: string) {
    this.api = createClient(url, apikey);
  }

  public subscribe(
    repoJoueur: JoueurRepository,
    repoSession: SessionRepository,
    repoPartie: PartieRepository,
    repoMap: MapRepository
  ) {
    this.api
      .from("partie")
      .on("INSERT", (payload: any) => {
        debugger;
        repoPartie.reload();
      })
      .subscribe();

    this.api
      .from("partie")
      .on("UPDATE", (payload: any) => {
        console.log("Change received!", payload);
      })
      .subscribe();

    this.api
      .from("*")
      .on("*", (payload: any) => {
        debugger;
        console.log(payload);
        repoPartie.reload();
      })
      .subscribe();
  }
}
