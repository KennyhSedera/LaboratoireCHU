<template>
    <div>
        <v-autocomplete
            v-model="patient"
            :items="items"
            solo
            prepend-inner-icon="fa-user"
            :rules="[v => !!v || 'Cette champ est vide!']"
            label="Patient"
            placeholder="Patient"
            item-value="id_patient"
            item-text="Nom"
        >
            <template v-slot:selection="data">
                <span
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                >
                    {{ data.item.nom}}
                </span>
            </template>
            <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content>{{data.item}}</v-list-item-content>
                </template>
                <template v-else>
                    <v-list-item-content>
                    <v-list-item-title>{{data.item.nom}}</v-list-item-title>
                    </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
    </div>
</template>
<script>
import Service from '@/services/PatientService'



export default {
    data() {
        return {
            items: [],
            patient:''
        }
    },
    methods: {
        getId(){
            return this.patient
        },
        setValue(value){
            this.patient = this.items.filter(element=>element.nom === value)[0]
        },

        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.patients
            })
        },
    },
    mounted() {
        this.getAll()
    },
}
</script>