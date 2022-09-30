<template>
    <section class="q-gutter-sm">
        <q-card v-if="vm.session && vm.isToday">
            <q-btn flat @click="vm.get(vm.id)" class="card-floating-action right">
                <q-icon name="mdi-refresh"></q-icon>
            </q-btn>
            <q-card-section>
                <div class="text-center text-h6">Qui qui gagne ?</div>
            </q-card-section>
            <q-separator></q-separator>
            <q-btn-toggle v-model="vm.partie.joueur_id" toggle-color="secondary" :options="vm.optionsJoueurs">
            </q-btn-toggle>
            <q-separator></q-separator>
            <q-card-section>
                <div class="text-center text-h6">Sur quelle map ?</div>
            </q-card-section>
            <!-- <q-btn-toggle v-model="vm.partie.map" toggle-color="secondary" :options="vm.optionsMaps"></q-btn-toggle> -->
            <div class="q-ma-md">
                <q-btn v-for="map in vm.repoMap.maps" @click="vm.partie.map = map.nom"
                    :class="{'selected': vm.partie.map == map.nom}">
                    {{map.nom}}</q-btn>
            </div>
            <q-separator></q-separator>
            <q-card-actions class="flex justify-end">
                <q-btn :disable="vm.partie.joueur_id == 0" class="q-mt-sm" color="primary" @click="vm.validatePartie()">
                    Aller ! 🧨🧨</q-btn>
            </q-card-actions>
        </q-card>
        <q-card>
            <q-card-section>
                <div class="text-center text-h6">Les scores !!!</div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section>
                <div v-for="joueur in vm.joueurs" class="flex">
                    <div class="q-mr-sm">{{joueur.pseudo}}</div> :
                    <div class="q-ml-sm">{{vm.scoreJoueur(joueur.id)}}</div>
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
<style lang="scss">
.selected {
    background-color: var(--q-secondary);
    color: white;
}

.card-floating-action {
    position: absolute;
    z-index: 2;

    &.right {
        right: 0;

    }

    top: 0;
}
</style>