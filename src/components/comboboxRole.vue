<template>
    <div>
        <v-autocomplete
            v-model="role"
            :items="items"
            solo
            color="grey"
            prepend-inner-icon="mdi-alpha-r-box"
            label="Role"
            placeholder="Role"
            item-value="id_role"
            item-text="libelle_role"
            :rules="[v => !!v || 'Cette champ est vide!']"
        >
            <template v-slot:selection="data">
            <span
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
            >
               {{ data.item.libelle_role }}
               
            </span>
            </template>
            <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content>{{data.item}}</v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                <v-list-item-title>{{ data.item.libelle_role }}</v-list-item-title>
                </v-list-item-content>
            </template>
            </template>
        </v-autocomplete>
    </div>
</template>
<script>
import Service from '@/services/roleService'

export default {
    data() {
        return {
            items: [],
            role:''
        }
    },
    methods: {
        getId(){
            return this.role
        },
        setValue(value){
            this.role = this.items.filter(element=>element.iibelle_role === value)[0]
        },
        async getAll(){
            await Service.getAll()
            .then((res) =>{
                this.items = res.data.roles
            })
        }
    },
    mounted() {
        this.getAll()
    },
}
</script>