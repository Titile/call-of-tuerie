<template>
    <section>
        <q-card class="q-mt-sm">
            <div class="flex items-center justify-between">
                <q-btn @click="vm.newGame()" color="secondary">Nouvelle game 🎮</q-btn>
                <div class="flex column text-center">
                    <div>Amboa chefon'ny amboa :</div>
                    <div class="text-h6 text-accent">👏👏 {{vm.pseudoJoueur(vm.winnerOfWinner)}} 👏👏</div>
                </div>

                <q-btn icon="refresh" flat round @click="vm.get()">

                </q-btn>
            </div>

            <q-card bordered v-if="vm.sessions.length" class="q-ma-md shadow-2" v-for="session in vm.sessions"
                @click="vm.goToPartie(session.id)">
                <q-card-section>
                    <div class="flex justify-around">
                        <div>{{vm.formatedDate(session.date)}}</div>
                        <div>{{session.parties.length}} parties</div>
                    </div>
                    <div class="text-overline text-center">
                        <q-badge align="middle" color="orange">
                            <q-icon name="mdi-crown" />
                        </q-badge>
                        {{session.pseudoWinners(vm.repoJoueurs.joueurs)}}
                        <q-badge align="middle" color="orange">
                            <q-icon name="mdi-crown" />
                        </q-badge>
                    </div>

                </q-card-section>
            </q-card>

        </q-card>
        <SessionDialog />
    </section>
</template>
<script lang="ts" setup>
import { register } from '@/global/injector';
import { onMounted } from 'vue';
import SessionDialog from './SessionDialog.vue';
import SessionVm from './sessionVm';
const vm = register(new SessionVm())

onMounted(() => {
    vm.get()
})
</script>