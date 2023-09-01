<template>
    <div>
        <v-select
            v-model="examen"
            :items="items"
            solo
            color="grey"
            prepend-inner-icon="mdi-clipboard-list"
            label="Examen"
            placeholder="Examen"
            item-value="id_examen"
            item-text="nom_examen"
            :rules="[v => !!v || 'Cette champ est vide!']"
        >
            <template v-slot:selection="data">
            <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
            >
                {{ data.item.nom_examen }}
            </v-chip>
            </template>
            <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content>{{data.item}}</v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title>{{data.item.nom_examen}}</v-list-item-title>
                </v-list-item-content>
            </template>
            </template>
        </v-select>
    </div>
</template>
<script>
import Service from '@/services/ExamenService'



export default {
    data() {
        return {
            items: [],
            examen:''
        }
    },
    methods: { 
      getId(){
        return this.examen
      },
        setValue(value){
            this.examen = this.items.filter(element=>element.nom_examen === value)[0]
        },
        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.examens
            })
        }
    },
    mounted() {
        this.getAll()
    },
}
</script>