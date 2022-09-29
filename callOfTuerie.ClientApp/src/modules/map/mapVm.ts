import { subscribe } from "@/global/injector";
import Openable from "@/global/openable";
import Notification from "@/plugins/Notification";
import MapRepository from "@/repositories/map/mapRepository";
import Map from "@/repositories/map/map";

// test ajout commentaire pour le build qui ne se lance pas
export default class MapVm {
  dialog = new Openable();
  map = new Map();
  repository!: MapRepository;

  constructor() {
    this.repository = subscribe(MapRepository);
  }

  public newMap() {
    this.dialog.open();
    this.map = new Map();
  }

  public showEdit(map: Map) {
    this.map = new Map(map);
    this.dialog.open();
  }

  public delete(id: number) {
    Notification.confirm(
      "Etes-vous sûr(e) de vouloir supprimer cette map ?",
      "Confirmation de suppression",
      () => {
        this.repository.delete(id).then((x) => {
          if (x) Notification.success("Le sauvage a bien été supprimé ");
        });
      }
    );
  }

  public addOrEdit() {
    if (this.map.id == 0) {
      this.repository.add(this.map).then(() => this.dialog.close());
    } else {
      this.repository.edit(this.map).then(() => this.dialog.close());
    }
  }

  public async get() {
    await this.repository.get();
  }
}
