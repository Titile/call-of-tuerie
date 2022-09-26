import { Dialog, Notify } from "quasar";
export class ErrorApi {
  code = "";
  details = "";
  hint = null;
  message = "";
}
export default class Notification {
  public static success(message: string) {
    Notify.create({
      message: message,
      color: "green",
    });
  }

  public static error(message: string) {
    Notify.create({
      message: message,
      color: "red",
    });
  }
  public static errorFromApi(message: ErrorApi) {
    Notify.create({
      message: message.message,
      color: "red",
    });
  }

  public static confirm(
    message: string,
    title: string,
    callbackOk: () => void
  ) {
    return Dialog.create({
      title: title,
      message: message,
      ok: {
        label: "Oui",
      },
      cancel: {
        push: true,
        label: "Non",
      },
      persistent: true,
    }).onOk(() => {
      callbackOk();
    });
  }

  public static confirmCustom(
    message: string,
    title: string,
    ok: string = "Oui",
    cancel: string = "Annuler",
    callbackOk: () => void
  ) {
    return Dialog.create({
      title: title,
      message: message,
      ok: {
        label: ok,
      },
      cancel: {
        push: true,
        label: cancel,
      },
      persistent: true,
    }).onOk(() => {
      callbackOk();
    });
  }
}
