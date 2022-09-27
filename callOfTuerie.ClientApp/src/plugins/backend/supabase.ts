import { createClient } from "@supabase/supabase-js";
import { Dialog } from "quasar";
import { resolveTransitionHooks } from "vue";
import Notification from "../Notification";

export default class Supabase {
  public api!: any;
  constructor(url: string, apikey: string) {
    this.api = createClient(url, apikey);
  }
}
