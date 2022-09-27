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
    return orderBy(this.sessions, (x) => x.date, "desc");
  }

  public async one(id: number) {
    const session = await this.crud.getOne(id);
    if (session) return new Session(session);
    else return null;
  }

  public async add(session: Session): Promise<Session> {
    console.log(new session_api(session));
    const reponse = await this.crud.add<session_api>(
      new session_api().fromModel(session)
    );

    const sessions = reponse.map((y: any) => new Session(y));
    return sessions.length ? sessions[0] : new Session();
  }

  public async get() {
    const sessions = await this.crud.get<Session[]>();
    this.sessions = sessions.map((y: any) => new Session(y));
  }

  public reload() {
    this.get();
  }
}
