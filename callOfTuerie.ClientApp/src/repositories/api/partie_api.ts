import Feedable from "@/global/feedable";

export default class partie_api extends Feedable {
  public session_id = 0;
  public joueur_id = 0;
  public map: string | null = null;

  constructor(options?: Partial<partie_api>) {
    super();
    this.feed(options);
  }
}
