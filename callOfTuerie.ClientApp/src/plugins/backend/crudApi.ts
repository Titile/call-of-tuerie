import { subscribe } from "@/global/injector";
import Supabase from "./supabase";
import Notification from "../Notification";
export default class Crud {
  constructor(public name: string, public api: any) {}

  public async get<T>(): Promise<T> {
    const { data, error } = await this.api.from(this.name).select("*");
    if (error) {
      Notification.errorFromApi(error);
      return Promise.reject(error);
    }
    return data;
  }

  public async update<T>(obj: T): Promise<T[]> {
    const { data, error } = await this.api.from(this.name).update(obj);
    if (error) {
      Notification.errorFromApi(error);
      return Promise.reject(error);
    }
    return data;
  }

  public async add<T>(obj: T): Promise<T[]> {
    const { data, error } = await this.api.from(this.name).insert([obj]);
    if (error) {
      Notification.errorFromApi(error);
      return Promise.reject(error);
    }
    return data;
  }

  public async delete(id: number) {
    const { data, error } = await this.api
      .from(this.name)
      .delete()
      .eq("id", id);
    if (error) {
      Notification.errorFromApi(error);
      return Promise.reject(error);
    }
    return data;
  }
}
