<template>
    <v-container fluid>
        <v-toolbar :color="!$vuetify.theme.dark?'green darken-3':'grey darken-3'">
            <v-btn v-if="$vuetify.breakpoint.mdAndUp" color="primary" @click="add=true" class="ml-2 text-capitalize font-weight-black" large>
            Nouveau <v-icon class="ml-2">mdi-tag-multiple</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <span class="font-weight-black white--text text-md-h4 ml-4"><span class="ml-1 primary--text text-md-h2 font-weight-black">E</span>xamens</span>
            <v-spacer></v-spacer>
            <v-col md="3" cols="6">
                <v-text-field class="mt-8" solo v-model="search" append-icon="mdi-magnify" clearable label="Recherche ..."/>
            </v-col>
        </v-toolbar>
        
        <v-card class="transparent" outlined height="520">
            <v-data-iterator hide-default-footer :items="items" :items-per-page.sync="itemsPerPage" :page.sync="page" :search="search" :sort-desc="sortDesc" v-if="items.length>0">
                <template v-slot:default="props">
                    <v-card-text class="px-md-14" style="max-height:465px;">
                        <v-simple-table class="elevation-3">
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-left font-weight-bold text-md-body-1">Type examen</th>
                                <th class="text-left font-weight-bold text-md-body-1">Libellé examen</th>
                                <th class="text-center font-weight-bold text-md-body-1">Tout en public</th>
                                <th class="text-center font-weight-bold text-md-body-1">Prise en charge</th>
                                <th class="text-center font-weight-bold text-md-body-1">Matériel</th>
                                <th class="text-center font-weight-bold text-md-body-1">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in props.items" :key="item.name">
                                    <td>{{ item.Type_Analyse.libelle_type }}</td>
                                    <td><v-chip class="col-12" color="primary">{{ item.nom_examen }}</v-chip></td>
                                    <td class="text-center">{{ item.code_prix }} Ar</td>
                                    <td class="text-center">{{ item.code_prix*2 }} Ar</td>
                                    <td class="text-center">
                                        <v-menu bottom left offset-x offset-y :close-on-click="onclick" :close-on-content-click="oncontent">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon  v-bind="attrs" v-on="on" class="grey--text ml-2" @click="selectItem(item)">mdi-flask-empty</v-icon>
                                            </template>
                                            <v-card width="400" class="pa-1 grey darken-3" >
                                            <v-row class="my-1 pa-1">
                                                <v-col class="col-md-6" v-for="(item, index) in materiels" :key="index"> 
                                                    <v-card color="success text-center pa-2">
                                                        {{ item.Matériel.libelle_materiel }}
                                                        <span class="white success--text py-1 mt-n10 mr-n4 rounded-circle px-2">{{ item.quantite_mat }}</span>
                                                    </v-card>
                                                </v-col> 
                                            </v-row>
                                            </v-card>
                                        </v-menu>
                                    </td>
                                    <td class="text-center">
                                        <v-icon small class="red--text" @click="deleteItem(item)">fa-trash</v-icon>
                                        <v-icon small class="primary--text ml-2 mt-1" @click="editItem(item)">fa-edit</v-icon>
                                    </td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </template>
                <template v-slot:footer>
                    <v-row class="mx-md-8 mx-1">
                        <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
                        <span v-if="$vuetify.breakpoint.mdAndUp" class="mr-4 mt-2 grey--text font-weght-bold" >
                            Page {{ page }} sur {{ numberOfPages }}
                        </span>
                        <v-btn color="blue darken-3" class="mr-1 elevation-3 white--text text-capitalize" @click="formerPage">
                        <v-icon >mdi-chevron-left</v-icon> Précedent 
                        </v-btn>
                        <v-btn color="blue darken-3" class="ml-1 elevation-3 white--text text-capitalize mr-6" @click="nextPage">
                        Suivant <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>
        <div v-else class="text-center text-h5 font-weight-bold mt-16"> Aucun examen enregistrer.</div>
        </v-card>
        <newExamen :open="add" @close="add=false; getAll()" ref="form"/>
        <deleteDialog :open="del" :message="delMsg" @close="del=false" @accept="delExamen()"/>
        <alertMessage :active="alert" :Message="alertMsg" :type="typeAlert"/>
    </v-container>
</template>
<script>
import newExamen from '@/components/addExamen'
import deleteDialog from '@/components/deleteDialog'
import alertMessage from '@/components/alertMessage'
import service from '@/services/ExamenService'

export default {
    data(){
        return{ 
            onclick: true,
            oncontent: false,
            add:false,
            del:false,
            delMsg:'',
            alert:false,
            alertMsg:'',
            typeAlert:'success',
            items:[],
            materiels:[],
            itemsPerPageArray: [ 8, 12],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 8,
            sortBy: 'nom',
            keys: ['nom', 'adresse', 'contact', 'numero', 'age', 'numero', 'sexe'],
            examselect:null,
            idSelected:null,
        }
    },
    components:{newExamen,deleteDialog,alertMessage,},
    computed: {
      numberOfPages () { return Math.ceil(this.items.length / this.itemsPerPage) },
      filteredKeys () { return this.keys.filter(key => key !== 'Name') },
    },
    methods: {
        nextPage () { if (this.page + 1 <= this.numberOfPages) this.page += 1 },
        formerPage () { if (this.page - 1 >= 1) this.page -= 1 },
        updateItemsPerPage (number) { this.itemsPerPage = number },
        async getAll(){
            await service.getAll()
            .then((res)=>{
                this.items=res.data.examens
            }).catch(err=>{
                console.log(err)
            })
        },
        editItem(data){
            this.add=true
            this.$refs.form.edit(data)
        },
        deleteItem(data){
            this.del=true
            this.delMsg=`Voulez-vous supprimer vraiment l'examen "${data.nom_examen}" ?`
            this.examselect=data.id_examen
        },
        delExamen(){
            service.delete(this.examselect)
            .then((res) => {
                this.del=false, this.examselect='', this.getAll(), this.$refs.form.getAll()
                this.alert=true, this.alertMsg=res.data.succee, setTimeout(()=>{this.alert=false}, 3000)
            }).catch((err) => {
                console.log(err)
            });
        },
        async selectItem(data){
          await service.getAllMat(data.id_examen)
          .then(res=>{this.materiels=res.data.data})
          .catch(err=>{console.log(err)})
        }
    },
    mounted(){
        document.title = this.$route.meta.title || "Laboratoire d'analyse"
        this.getAll()
    }
}
</script>