<template>
  <q-layout class="bg-img">
    <Navbar />
    <Drawer />
    <q-page-container>
      <q-page class="q-pa-md">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { register } from '@/global/injector'
import "@quasar/extras/material-icons/material-icons.css";
import Routing from '@/router/routing'
import Configuration from './configuration';
import Navbar from './layout/components/Navbar.vue';
import Drawer from './layout/components/Drawer.vue';
import { onBeforeMount, onMounted, onServerPrefetch } from 'vue';
import { DrawerVm } from './layout/components/drawerVm';
import Supabase from './plugins/backend/supabase';
import JoueurRepository from './repositories/joueur/joueurRepository';
import SessionRepository from './repositories/session/sessionRepository';
import moment from 'moment';
import PartieRepository from './repositories/partie/partieRepository';
import MapRepository from './repositories/map/mapRepository';
import CustomSocket from './plugins/backend/server';

const configuration = register(new Configuration())
const drawerVm = register(new DrawerVm())
const router = register(new Routing())
const api = register(new Supabase(configuration.apiUrl, configuration.apiKey))


const repoJoueur = register(new JoueurRepository(api))
const repoSession = register(new SessionRepository(api))
const repoPartie = register(new PartieRepository(api))
const repoMap = register(new MapRepository(api))
// const connection = new WebSocket("wss://echo.websocket.org");
const connection = register(new CustomSocket())


// onMounted(() => {
//   connection.webSocket.onopen = function (event) {
//     console.log(event)
//   }

//   connection.webSocket.onmessage = function (event) {
//     console.log(event)
//   }

// })


moment.locale("fr")
onMounted(() => {
  api.subscribe(repoJoueur, repoSession, repoPartie, repoMap)

})


onBeforeMount(async () => {
  // await repoJoueur.reload();
  // await repoSession.reload();
  // await repoPartie.reload();
})

</script>
<style lang="scss">
@import './layout/scss/background.scss';
@import './layout/scss/app.scss';
</style>

