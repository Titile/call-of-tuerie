<template>
  <q-layout>
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
import { onMounted } from 'vue';
import { DrawerVm } from './layout/components/drawerVm';
import Supabase from './plugins/backend/supabase';
import JoueurRepository from './repositories/joueur/joueurRepository';

const configuration = register(new Configuration())
const drawerVm = register(new DrawerVm())
const router = register(new Routing())
const api = register(new Supabase(configuration.apiUrl, configuration.apiKey))


const repoJoueur = register(new JoueurRepository(api))
onMounted(() => {
  repoJoueur.reload()
})

// requester.account

</script>
<style lang="scss">
@import './layout/scss/background.scss';
@import './layout/scss/app.scss';
</style>

