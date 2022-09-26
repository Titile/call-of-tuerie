import "@quasar/extras/material-icons/material-icons.css";

import "quasar/src/css/index.sass";
import { Dialog, Notify, Quasar } from "quasar";
import theme from "./theme";
import quasarIconSet from "quasar/icon-set/mdi-v6";
// import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
// import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v6/mdi-v6.css";
export default function quasar() {
  return Quasar;
}

export function config() {
  return {
    plugins: [Notify, Dialog],
    config: { brand: theme },
    supportTS: true,
    iconSeet: quasarIconSet,
  };
}
