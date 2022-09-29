import Feedable from "@/global/feedable";
import map_api from "../api/map_api";

export default class Map extends map_api {
  public id = 0;

  constructor(options?: Partial<Map>) {
    super();
    this.feed(options);
  }
}
