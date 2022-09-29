<template>
    <q-card>
        <q-card-section class="flex justify-between">
            <div class="text-h5">K'aiza e !?!</div>
            <q-btn @click="vm.newMap()" color="secondary" outline round icon="mdi-plus"></q-btn>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
            <q-list>
                <q-item v-for="ts in vm.repository.maps">
                    <q-item-section avatar>
                        <q-avatar size="md" color="secondary" class="text-white">
                            {{ts.id}}
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ts.nom}}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="md" flat dense round icon="mdi-pen" @click="vm.showEdit(ts)" />
                            <q-btn size="md" color="red" flat dense round icon="mdi-delete" @click="vm.delete(ts.id)" />
                        </div>

                    </q-item-section>
                </q-item>

            </q-list>
        </q-card-section>
        <map-dialog></map-dialog>
    </q-card>
</template>
<script lang="ts" setup>
import { register } from '@/global/injector';
import MapVm from './mapVm';
import MapDialog from './MapDialog.vue';
import { onMounted } from 'vue';

const vm = register(new MapVm())

onMounted(async () => {
    vm.get()
})
</script>