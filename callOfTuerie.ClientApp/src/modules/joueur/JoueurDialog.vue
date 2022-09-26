<template>
    <q-dialog v-model="vm.dialog.isOpen" transition-show="slide-up" transition-hide="slide-down">
        <q-card style="min-width: 100vw" class="translucide-pink flex justify-center">
            <q-card style="min-width: 90%" class="q-ma-md">
                <q-toolbar color="primary">
                    <template v-if="vm.joueur.id == 0">Ajout d'un joueur</template>
                    <template v-else>Editer le joueur</template>
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                </q-toolbar>
                <q-separator class="q-mb-md" />

                <q-card-section class="q-pt-none">
                    <q-input v-model="vm.joueur.pseudo" rounded outlined label="Pseudo nlisany e"></q-input>
                </q-card-section>
                <q-card-section class="flex justify-between">
                    <q-btn flat rounded color="red" v-close-popup>Annuler</q-btn>
                    <q-btn color="primary" rounded @click="vm.addOrEdit()">
                        <template v-if="vm.joueur.id == 0">Ajouter</template>
                        <template v-else>Modifier</template>
                    </q-btn>
                </q-card-section>
            </q-card>

        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { register, subscribe } from '@/global/injector';
import JoueurVm from "./joueurVM"
import { useQuasar } from 'quasar';
import { watch } from 'vue';

const vm = subscribe(JoueurVm)
watch(vm.dialog, (currentValue) => {
    if (!currentValue.isOpen) vm.joueur.pseudo = ''
})
</script>