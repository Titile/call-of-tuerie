<template>
    <q-dialog v-model="vm.dialog.isOpen" persistent :maximized="true" transition-show="slide-up"
        transition-hide="slide-down">
        <q-card class="">
            <q-toolbar class="bg-secondary text-white">
                <div class="text-h6">Nouvelle game 🧨🧨🧨</div>
                <q-space />
                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-toolbar>

            <q-card-section>
                <p class="text-overline">Réveillez vous !!! C'est l'heure de s'entretuer. Maintenant la question qui se
                    pose c'est :</p>
                <p class="text-h5 text-overline">C'est qui qui joue ???</p>
                <q-list>
                    <q-item>
                        <q-item-section avatar @click="vm.selectAll()">
                            <q-avatar v-if="!vm.allSelected" color="red" class="text-white">
                                <q-icon name="mdi-close"></q-icon>
                            </q-avatar>
                            <q-avatar v-else color="secondary" class="text-white">
                                <q-icon name="mdi-check"></q-icon>
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Olo jiaby</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item v-for="joueur in vm.repoJoueurs.joueurs">
                        <q-item-section avatar @click="vm.addOrRemoveInGame(joueur.id)">
                            <q-avatar v-if="!vm.inGame(joueur.id)" color="red" class="text-white">
                                <q-icon name="mdi-close"></q-icon>
                            </q-avatar>
                            <q-avatar v-else color="secondary" class="text-white">
                                <q-icon name="mdi-check"></q-icon>
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{joueur.pseudo}}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
            <q-card-actions class="flex justify-between">
                <q-btn flat color="red" icon="close" @click="vm.dialog.close()">Annuler</q-btn>
                <q-btn :disable="!vm.oneSelected" color="primary" rounded icon="mdi-check" @click="vm.add()">
                    Commencer</q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { subscribe } from '@/global/injector';
import { watch } from 'vue';
import SessionVm from './sessionVm';

const vm = subscribe(SessionVm)

// watch(vm.modal, (currentValue) => {
//     if (!vm.modal.isOpen) vm.reset()
// })

</script>
