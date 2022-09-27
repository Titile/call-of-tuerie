<template>
    <section>
        <q-card class="q-mt-sm">
            <q-btn @click="vm.newGame()" color="secondary">Nouvelle game 🎮</q-btn>

            <q-card bordered v-if="vm.sessions.length" class="q-ma-md shadow-2" v-for="session in vm.sessions"
                @click="vm.goToPartie(session.id)">
                <q-card-section>
                    <div class="flex justify-around">
                        <div>{{vm.formatedDate(session.date)}}</div>
                        <div>{{session.parties.length}} parties</div>

                        <!-- <q-badge color="secondary" class="text-white">{{vm.pseudoJoueur(session.winner().id)}}
                        </q-badge> -->
                    </div>
                    <div class="text-overline text-center">
                        {{vm.pseudoJoueur(session.winner().id)}}
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