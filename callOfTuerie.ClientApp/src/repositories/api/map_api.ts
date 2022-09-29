import Feedable from "@/global/feedable";

export default class map_api extends Feedable {
  public nom = "";

  constructor(options?: Partial<map_api>) {
    super();
    this.feed(options);
  }
}
