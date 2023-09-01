<template>
    <div>
        <v-autocomplete
            solo
            clearable
            :items="items"
            v-model="model"
            label="Prescripteur"
            placeholder="Prescripteur"
            :search-input.sync="search"
            item-value="id_prescripteur"
            item-text="nom_prescripteur"
            clear-icon="mdi-close-circle"
            prepend-inner-icon="fa-user-md"
            :rules="[v => !!v || 'Cette champ est vide !']"
        >
            <template v-slot:selection="data">
                <span
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                >
                    {{ data.item.nom_prescripteur }}
            </span>
            </template>
            <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content>{{data.item.nom_prescripteur}}</v-list-item-content>
                </template>
                <template v-else>
                    <v-list-item-content>
                    <v-list-item-title>{{data.item.nom_prescripteur}}</v-list-item-title>
                    </v-list-item-content>
                </template>
            </template>
            <template v-slot:no-data>
                <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                           Auccun resultat "<strong>{{ search }}</strong>".
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon @click="create()" class="ml-16" color="green darken-3">fa-check-circle</v-icon>
                </v-list-item-action>
                </v-list-item>
            </template>
        </v-autocomplete>
        <alertMessage :active="alert" :type="typeAlert" :Message="alertMsg" ref="ref"/>
    </div>
</template>
<script>
import Service from '@/services/PrescripteurService'
import alertMessage from '@/components/alertMessage'



export default {
    components:{alertMessage},
    data() {
        return {
            items: [],
            model:'',
            search: null,
            alert: false,
            alertMsg:'',
            typeAlert:'success'
        }
    },
    methods: {
        getId(){
            return this.model
        },
        setValue(value){
            this.model = this.items.filter(element=>element.nom_prescripteur === value)[0]
        },
        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.prescripteur
            })
        },
        async create(){
            await Service.create({nom_prescripteur: this.search})
            .then(()=>{
                this.getAll()
            })
        },
        async deletePrescripteur(data){
            this.selected = data.id_prescripteur,
            await Service.delete({data:{id: this.selected}})
            .then(()=>{
                this.getAll()
            })
        }
    },
    mounted() {
        this.getAll()
    }
}
</script>