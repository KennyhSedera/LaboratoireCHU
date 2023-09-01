<template>
    <div>
        <v-autocomplete
            v-model="type"
            :items="items"
            solo
            prepend-inner-icon="mdi-alpha-t-box"
            :rules="[v => !!v || 'Cette champ est vide!']"
            label="Type analyse"
            placeholder="Type analyse"
            item-value="id_type"
            item-text="libelle_type"
            :search-input.sync="search"
        >
            <template v-slot:selection="data">
            <span
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
            >
                {{ data.item.libelle_type }}
            </span>
            </template>
            <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content>{{data.item}}</v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title>{{data.item.libelle_type}}</v-list-item-title>
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
    </div>
</template>
<script>
import Service from '@/services/TypeAnalyseService'

export default {
    data() {
        return {
            items: [],
            type:'',
            search:''
        }
    },
    methods: {
        getId(){
            return this.type
        },
        
        setValue(value){
            this.type = this.items.filter(element=>element.id_type === value)[0].id_type
        },
        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.types
            })
        },
        async create(){
            await Service.register({libelle_type: this.search})
            .then(()=>{
                this.getAll()
            })
        },
    },
    mounted() {
        this.getAll()
    },
}
</script>