<template>
    <div>
        <v-autocomplete
            solo
            color="grey"
            :items="items"
            label="materiel"
            v-model="materiel"
            placeholder="materiel"
            item-value="id_materiel"
            item-text="libelle_materiel"
            prepend-inner-icon="mdi-flask"
            :rules="[v => !!v || 'Cette champ est vide!']"
        >
            <template v-slot:selection="data">
            <span
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
            >
                {{ data.item.libelle_materiel }}
            </span>
            </template>
            <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content>{{data.item}}</v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title>{{data.item.libelle_materiel}}</v-list-item-title>
                </v-list-item-content>
            </template>
            </template>
        </v-autocomplete>
    </div>
</template>
<script>
import Service from '@/services/materielService'

export default {
    data() {
        return {
            items: [],
            materiel:'',
            libelle:'',
        }
    },
    methods: { 
        getId(){
            return this.materiel
        },
        setValue(value){
            this.materiel = this.items.filter(element=>element.id_materiel === value)[0]
        },
        getLibelle(){
            return this.libelle =  this.items.filter(element=>element.id_materiel === this.materiel)[0].libelle_materiel
        },
        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.materiel
            })
        }
    },
    mounted() {
        this.getAll()
    },
}
</script>