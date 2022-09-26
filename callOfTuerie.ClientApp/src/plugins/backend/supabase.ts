import profil_api from "@/repositories/api/profil_api";
import user_api from "@/repositories/api/user_api";
import User from "@/repositories/user/user";
import { createClient } from "@supabase/supabase-js";
import { Dialog } from "quasar";
import { resolveTransitionHooks } from "vue";
import Notification from "../Notification";

export default class Supabase {
  public api!: any;
  constructor(url: string, apikey: string) {
    this.api = createClient(url, apikey);
  }

  // ========== Users ====================
  public async user(email: string): Promise<any> {
    let { data, error } = await this.api
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    return data;
  }

  // // ============ type service =========================
  // public async getAllTypeService(): Promise<TypeService[]> {
  //   let { data, error } = await this.api.from("type_services").select("*");
  //   if (error) Notification.error(error);
  //   return data.map((x: any) => new TypeService(x));
  // }

  // // ===================================

  // public async getAllUser(): Promise<User[]> {
  //   let { data, error } = await this.api.from("type_services").select("*");
  //   return data;
  // }
}
