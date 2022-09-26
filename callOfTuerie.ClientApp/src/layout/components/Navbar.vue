<template>
    <q-header elevated class="translucide-pink">
        <q-toolbar>
            <q-btn flat round dense icon="menu" class="q-mr-sm" @click="vm.openClose()" />
            <q-btn flat round dense icon="home" :to="{ name: Routes.Session}" />
        </q-toolbar>
    </q-header>
</template>
<script setup lang="ts">
import { subscribe } from '@/global/injector';
import Routes from '@/router';
import { DrawerVm } from './drawerVm';

const vm = subscribe(DrawerVm)
</script>