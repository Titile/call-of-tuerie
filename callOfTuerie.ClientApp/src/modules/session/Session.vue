<template>
    <section>
        <q-card class="q-mt-sm">
            <q-btn @click="vm.newGame()">Nouvelle game 🎮</q-btn>

            <q-card class="q-ma-md" bordered v-for="session in vm.repoSession.orderedSession"
                @click="vm.goToPartie(session.id)">
                <q-card-section>
                    <div class="flex justify-around">
                        {{vm.formatedDate(session.date)}}
                    </div>

                </q-card-section>
            </q-card>

        </q-card>
        <SessionDialog />
    </section>
</template>
<script lang="ts" setup>
import { register } from '@/global/injector';
import SessionDialog from './SessionDialog.vue';
import SessionVm from './sessionVm';
const vm = register(new SessionVm())
</script>