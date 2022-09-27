import Crud from "@/plugins/backend/crudApi";
import { orderBy } from "lodash";
import partie_api from "../api/partie_api";
import Partie from "./partie";

export default class PartieRepository {
  public parties: Array<Partie> = [];
  public crud!: Crud;

  constructor(api: any) {
    this.crud = new Crud("partie", api.api);
  }

  public partiesSession(sessionId: number): Partie[] {
    return this.parties.filter((x) => x.session_id == sessionId);
  }
  public orderedParties(session_id: number) {
    return orderBy(this.partiesSession(session_id), (x) => x.id, "desc");
  }

  public async add(partie: partie_api) {
    const reponse = this.crud.add<partie_api>(partie);

    return reponse.then((x) => {
      const parties = x.map((y: any) => new Partie(y));
      this.parties.push(...parties);
    });
  }

  public reload() {
    return this.crud
      .get()
      .then((x: any) => (this.parties = x.map((y: any) => new Partie(y))));
  }
}
