import Store from "@/global/store";
import Session from "./session";
import { maxBy, orderBy, some } from "lodash";
import Supabase from "@/plugins/backend/supabase";
import { subscribe } from "@/global/injector";
import Crud from "@/plugins/backend/crudApi";
import { joueur_api } from "../api/joueur_api";
import session_api from "../api/session_api";
export default class SessionRepository {
  public sessions: Array<Session> = [];
  public crud!: Crud;
  constructor(public api: Supabase) {
    this.crud = new Crud("session", this.api.api);
  }

  public get orderedSession() {
    return orderBy(this.sessions, (x) => x.id);
  }

  public async add(session: Session): Promise<Session> {
    console.log(new session_api(session));
    const reponse = await this.crud.add<session_api>(
      new session_api().fromModel(session)
    );

    const sessions = reponse.map((y: any) => new Session(y));
    return sessions.length ? sessions[0] : new Session();
    // return reponse.then((x) => {
    //   this.sessions.push(...sessions);
    // });
  }

  public async get() {
    this.crud
      .get()
      .then((x: any) => (this.sessions = x.map((y: any) => new Session(y))));
    // this.api.getAllTypeService().then((x) => (this.joueurs = x));
  }

  public reload() {
    this.get();
  }
}
