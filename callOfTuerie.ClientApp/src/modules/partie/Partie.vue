<template>
    <section class="q-gutter-sm">
        <q-card v-if="vm.session">
            <q-card-section>
                <div class="text-center text-h6">Qui qui gagne ?</div>
            </q-card-section>
            <q-separator></q-separator>
            <!-- {{vm.session}} -->
            <!-- <q-btn-group>
            <q-btn v-for="joueur in vm.joueurs">{{joueur.pseudo}}</q-btn>
        </q-btn-group> -->
            <q-btn-toggle v-model="vm.partie.joueur_id" toggle-color="secondary" :options="vm.optionsJoueurs">
            </q-btn-toggle>
            <q-separator></q-separator>
            <q-card-section>
                <div class="text-center text-h6">Sur quelle map ?</div>
            </q-card-section>
            <q-btn-toggle v-model="vm.partie.map" toggle-color="secondary" :options="vm.optionsMaps"></q-btn-toggle>
            <q-separator></q-separator>
            <q-card-actions class="flex justify-end">
                <q-btn class="q-mt-sm" color="primary" @click="vm.validatePartie()">Aller ! 🧨🧨</q-btn>
            </q-card-actions>
        </q-card>
        <q-card>
            <q-card-section>
                <div class="text-center text-h6">Les score !!!</div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section>
                <div v-for="joueur in vm.joueurs">
                    {{joueur.pseudo}}
                    <q-space></q-space>
                    {{vm.scoreJoueur(joueur.id)}}
                </div>
            </q-card-section>
        </q-card>
        <q-card>
            <q-card-section>
                <div class="text-center text-h6">Les games</div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section>
                <div v-for="partie in vm.repoPartie.orderedParties(vm.id)">
                    <span class="text-bold">Winner :</span> <span
                        class="text-overline text-secondary">{{vm.pseudoJoueurPartie(partie.joueur_id)}}</span>
                    sur
                    {{partie.map}}<template v-if="!partie.map">---</template>
                    <q-separator></q-separator>

                </div>
            </q-card-section>
        </q-card>
    </section>

</template>
<script lang="ts" setup>
import { register } from '@/global/injector';
import { onMounted, reactive, ref } from 'vue';
import PartieVm from './partieVm';
const vm = register(new PartieVm())
onMounted(() => {
    vm.get(vm.id)
})

</script>