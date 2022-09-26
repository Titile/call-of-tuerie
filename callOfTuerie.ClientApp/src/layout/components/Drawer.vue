<template>
    <q-drawer v-model="drawer.isOpen" side="left" :breakpoint="700" overlay behavior="desktop"
        class="bg-primary text-white">
        <q-scroll-area class="fit">
            <q-list bordered separator>
                <q-item clickable v-ripple :to="{ name: Routes.Session }">
                    <q-item-section>
                        <q-item-label>Session</q-item-label>
                        <q-item-label class="text-white" overline>Les games</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple :to="{ name: Routes.Joueur }">
                    <q-item-section>
                        <q-item-label>Joueurs</q-item-label>
                        <q-item-label class="text-white" overline>Iza pory e</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>
<script lang="ts" setup>
import { subscribe } from '@/global/injector';
import Routes from '@/router';
import { DrawerVm } from './drawerVm';

const drawer = subscribe(DrawerVm)
</script>
