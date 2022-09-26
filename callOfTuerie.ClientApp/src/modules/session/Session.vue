<template>
    <section>
        <q-btn @click="vm.newGame()">Nouvelle game 🎮</q-btn>
        <q-card class="q-mt-sm">
            <q-card-section v-for="session in vm.repoSession.sessions" @click="vm.goToPartie(session.id)">
                <div>
                    {{session}}
                </div>

            </q-card-section>
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