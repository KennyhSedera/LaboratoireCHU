<template>
    <v-container fluid>
        <v-toolbar :color="!$vuetify.theme.dark?'green darken-3':'grey darken-3'">
            <v-spacer></v-spacer>
            <span class="font-weight-bold white--text text-md-h4 ml-4"><span class="ml-1 primary--text text-md-h2 font-weight-bold">P</span>rescripteurs</span>
            <v-spacer></v-spacer>
                <v-text-field
                    class="mt-8 col-md-3 col-6"
                    v-model="search"
                    append-icon="mdi-magnify"
                    clearable
                    label="Recherche ..."
                    solo
                />
        </v-toolbar>
        <v-card outlined class="overflow-auto transparent px-4 py-1" height="520">
            <div v-if="items.length == 0" class="mt-16 text-center text-md-h5 font-weight-bold">Auccun prescripteur enregistrer.</div>
            <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
                :page.sync="page"
                :search="search"
                hide-default-footer
                v-else
            > 
            <template v-slot:default="props">
                <v-row class="pa-2 mt-4">
                    <v-col md="3" cols="12" v-for="e in props.items" :key="e.nom_prescripteur" class="my-2">
                        <v-card :class="$vuetify.theme.dark?'grey darken-3':'elevation-3 '" min-height="100px" id="create">
                            <v-speed-dial 
                            direction="right"
                            transition="scale-transition"
                            >
                                <template v-slot:activator>
                                    <v-btn :class="$vuetify.theme.dark?'grey darken-3':'white'" class="elevation-3 ml-n5 mt-n7 " small icon>
                                        <v-icon small :class="$vuetify.theme.dark?'white--text':'black--text'">mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                                <v-btn  class="blue" small icon @click="editItem(e)">
                                    <v-icon class="white--text" small>fa-edit</v-icon>
                                </v-btn>
                                <v-btn  class="red" small icon @click="deletItem(e)">
                                    <v-icon class="white--text" small>fa-trash</v-icon>
                                </v-btn>
                            </v-speed-dial>
                            <v-card class="pa-2 mt-n4 transparent" outlined>
                                <v-card img="pre (3).jpg" height="150px" class="mx-auto"></v-card>
                                <v-divider class="my-2"></v-divider>
                                <div v-if="edt && e.id_prescripteur==selected" class="text-center font-weight-bold text-h6 text-capitalize">
                                    <v-text-field
                                        prepend-inner-icon="fa-user-md"
                                        v-model="nom_prescripteur"
                                        @keyup.enter="edit()"
                                        append-icon="mdi-close-circle"
                                        @click:append="close"
                                    ></v-text-field>
                                </div>
                                <div v-else class="text-center font-weight-bold text-h6 text-capitalize">
                                    <v-chip class="col-12 text-center" color="primary">{{ e.nom_prescripteur }}</v-chip>
                                </div>
                            </v-card>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
            </v-data-iterator>
        </v-card>
        <alertmessage :active="alert" :Message="alertMsg" :type="alertType"/>
        <DeleteDialog :open="delDialog" :message="delMsg" @accept="deleteprescripteur" @close="delDialog=false"/>
    </v-container>
</template>
<script>
import alertmessage from '@/components/alertMessage.vue';
import Service from '@/services/PrescripteurService';
import DeleteDialog from '@/components/deleteDialog';


export default {
    components:{
        alertmessage,
        DeleteDialog,
    },
    data() {
        return {
            tab: 0,
            alert: false,
            alertType:'success',
            alertMsg:'',
            edt: false,
            items: [],
            keys: [ 'nom_examen', ],
            sortBy: 'nom_examen',
            itemsPerPageArray: [4, 8, 12],
            sortDesc: false,
            page: 1,
            itemsPerPage: 8,
            tabTypes: [],
            typeId: 1,
            delDialog: false,
            delMsg: '',
            selected: null,
            nom_prescripteur:'',
            search:'',
        }
    },
    methods: {
        getAll(){
            Service.getAll()
            .then((res) => {
                this.items = res.data.prescripteur
            }).catch((err) => {
                console.log(err);
            });
        },
        deletItem(data){
            this.selected = data.id_prescripteur
            this.delDialog = true
            this.delMsg = `Voulez-vous supprimer definitivement "${data.nom_prescripteur}"`
        },
        editItem(data){
            this.edt=true
            this.nom_prescripteur = data.nom_prescripteur
            this.selected = data.id_prescripteur
        },
        deleteprescripteur(){
            Service.delete(this.selected)
            .then((res) => {
                this.alert = true
                this.alertMsg = res.data.succee
                this.alertType = "success"
                this.delDialog=false
                setTimeout(() => {
                    this.alert=false
                    this.getAll()
                }, 3000);
            }).catch((err) => {
                console.log(err);
            });
        },
        edit(){
            Service.update({nom_prescripteur: this.nom_prescripteur}, this.selected)
            .then((res) => {
                this.alert = true
                this.alertMsg = res.data.succee
                this.alertType = "success"
                this.edt=false
                this.nom_prescripteur=''
                this.getAll()
                setTimeout(() => {
                    this.alert=false
                }, 3000);
            }).catch((err) => {
                console.log(err);
            });
        },
        close(){
            this.edt=false
            this.nom_prescripteur=''
        },
    },
    computed: {
        
    },
    mounted() {
        document.title = this.$route.meta.title || "Laboratoire d'analyse"
        this.getAll()
    },
}
</script>
<style>
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>