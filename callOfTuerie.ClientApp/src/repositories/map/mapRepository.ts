import Store from "@/global/store";
import Map from "./map";
import { maxBy, orderBy, some } from "lodash";
import Supabase from "@/plugins/backend/supabase";
import { subscribe } from "@/global/injector";
import Crud from "@/plugins/backend/crudApi";
import { joueur_api } from "../api/joueur_api";
import map_api from "../api/map_api";
export default class MapRepository {
  public maps: Array<Map> = [];
  public crud!: Crud;
  constructor(public api: Supabase) {
    this.crud = new Crud("map", this.api.api);
  }

  public async add(map: Map) {
    const reponse = this.crud.add<map_api>(new map_api({ nom: map.nom }));

    return reponse.then((x) => {
      const maps = x.map((y: any) => new Map(y));
      this.maps.push(...maps);
    });
  }

  public async edit(map: Map) {
    const reponse = this.crud.update<Map>(map);

    return reponse.then((x) => {
      this.get();
    });
  }

  public delete(id: number) {
    return this.crud
      .delete(id)
      .then((x) => (this.maps = this.maps.filter((x) => x.id != id)))
      .catch((err) => {
        Promise.reject(err);
      });
  }

  public async get() {
    const maps = await this.crud.get<Map[]>();
    this.maps = maps.map((x) => new Map(x));
    this.maps = orderBy(this.maps, (x) => x.id);
    return this.maps;
  }

  public reload() {
    this.get();
  }
}
