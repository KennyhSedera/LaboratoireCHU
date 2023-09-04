<template>
    <v-container fluid>
      <v-toolbar :color="!$vuetify.theme.dark?'green darken-3':'grey darken-3'">
          <v-spacer></v-spacer>
          <span class="font-weight-black white--text text-md-h4 ml-4"><span class="ml-1 primary--text text-md-h2 font-weight-black">M</span>atériel</span>
          <v-spacer></v-spacer>
          <v-col md="3" cols="6">
              <v-text-field class="mt-8" solo v-model="search" append-icon="mdi-magnify" clearable label="Recherche ..."/>
          </v-col>
      </v-toolbar>
      
      <v-row class="pa-1">
        <v-col>
          <v-card class="transparent" outlined height="500" width="700">
            <v-data-iterator hide-default-footer :items="items" :items-per-page.sync="itemsPerPage" :page.sync="page" :search="search" :sort-desc="sortDesc" v-if="items.length>0">
              <template v-slot:default="props">
                <v-card-text class="px-md-2" style="max-height:465px;">
                  <v-simple-table class="elevation-3">
                    <template v-slot:default>
                      <thead>
                        <tr>
                        <th class="text-left font-weight-bold text-md-body-1">Id</th>
                        <th class="text-left font-weight-bold text-md-body-1">Libellé</th>
                        <th class="text-center font-weight-bold text-md-body-1">Quantité</th>
                        <th class="text-center font-weight-bold text-md-body-1">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in props.items" :key="item.name">
                          <td><v-chip :color="item.quantite > 10 ? 'primary' : 'red'">{{ item.id_materiel }}</v-chip></td>
                          <td>{{ item.libelle_materiel }}</td>
                          <td class="text-center">{{ item.quantite }} </td>
                          <td class="text-center">
                            <v-icon small class="red--text" @click="deleteItem(item)">fa-trash</v-icon>
                            <v-icon small class="primary--text ml-2 mt-0" @click="editItem(item)">fa-edit</v-icon>
                            <!-- <v-icon small class="grey--text ml-2" @click="mvtItem(item)">fa-eye</v-icon> -->
                            <v-icon small class="primary--text ml-2 mt-0" @click="entreeItem(item)">mdi-plus-circle</v-icon>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </template>
              <template v-slot:footer>
                  <v-row class="">
                      <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
                      <span v-if="$vuetify.breakpoint.mdAndUp" class="grey--text mr-4 mt-2 font-weght-bold" >
                          Page {{ page }} sur {{ numberOfPages }}
                      </span>
                      <v-btn color="blue darken-3" class="elevation-3 mr-1 white--text text-capitalize" @click="formerPage">
                      <v-icon >mdi-chevron-left</v-icon> Précedent 
                      </v-btn>
                      <v-btn color="blue darken-3" class="elevation-3 ml-1 white--text text-capitalize mr-6" @click="nextPage">
                      Suivant <v-icon>mdi-chevron-right</v-icon>
                      </v-btn>
                  </v-row>
              </template>
            </v-data-iterator>
            <div v-else class="text-center text-h5 font-weight-bold mt-16"> Aucun matériel enrégistrer.</div>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mt-5 elevation-3">
            <div class="font-weight-bold text-center py-4 text-h5">{{ title }} matériel</div>
            <div class="mx-6 text-center">
              <v-form v-model="valid" ref="form">
                <v-text-field v-model="libelle" solo prepend-inner-icon="mdi-flask" label="Libellée" :rules="[v=>!!v || 'Cette champ est vide !']"/>
                <v-text-field v-model="qte" solo prepend-inner-icon="mdi-alpha-q-box" label="Quantité" :rules="[v=>!!v || 'Cette champ est vide !']"/>
                <v-btn class="mb-4 text-capitalize white--text primary px-10" @click="validate">
                  {{ btnTitle }} 
                  <v-icon class="ml-2" small>{{ iconTitle }}</v-icon>
                </v-btn>
              </v-form>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <deleteDialog :open="del" :message="delMsg" @close="del=false" @accept="DelMateriel"/>
      <alertMessage :active="alert" :Message="alertMsg" :type="typeAlert"/>
    </v-container>
  </template>
  <script>
  import deleteDialog from '@/components/deleteDialog'
  import alertMessage from '@/components/alertMessage'
  import service from '@/services/materielService'

  export default {
    components:{deleteDialog, alertMessage},
    data () {
      return {
        valid:true,
        libelle:'',
        qte:null,
        title:'Nouveau',
        btnTitle:'Enregistrer',
        iconTitle:'fa-download',
        del:false,
        delMsg:'',
        items:[],
        itemsPerPageArray: [ 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 8,
        sortBy: 'id_materiel',
        keys: ['libelle_materiel'],
        selected:null,
        alert:false,
        alertMsg:'',
        typeAlert:'success',
        id_user: null,
        roleId:null,
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
    methods: {
      nextPage() {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage() {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage(number) {
        this.itemsPerPage = number
      },
      async getAll(){
        await service.getAll()
        .then(res=>{
          this.items = res.data.materiel
        }).catch(err=>{console.log(err)})
      },
      deleteItem(data){
        this.del=true
        this.delMsg=`Voulez-vous supprimer vraiment la matériel "${data.libelle_materiel}" ?`
        this.selected=data.id_materiel
      },
      async DelMateriel(){
        await service.delete(this.selected)
        .then(res=>{
          this.del=false, this.selected=null, this.getAll()
          this.alert=true, this.alertMsg=res.data.succee, setTimeout(()=>{this.alert=false}, 3000)
        })
        .catch(err=>console.log(err))
      },
      editItem(data){
        this.selected=data.id_materiel
        this.libelle=data.libelle_materiel
        this.qte=data.quantite
        this.btnTitle='Modifier'
        this.title='Modification'
        this.iconTitle='fa-edit'
      },
      entreeItem(data){
        this.selected=data.id_materiel
        this.libelle=data.libelle_materiel
        this.btnTitle='Ajouter'
        this.title='Entrée'
        this.iconTitle='mdi-flask-plus'
      },
      validate(){
        this.$refs.form.validate()
        if (this.valid) {
          if (this.btnTitle==='Enregistrer') {
            service.create({libelle_materiel:this.libelle, quantite:this.qte, id_user:this.id_user})
            .then((res) => {
              if (res.data.error) {
                this.alert=true, this.typeAlert='error', this.alertMsg=res.data.error, setTimeout(()=>{this.alert=false}, 3000)
              } else {
                this.$refs.form.reset()
                this.getAll(), this.alert=true, this.typeAlert='success', this.alertMsg=res.data.succee, setTimeout(()=>{this.alert=false}, 3000)
              }
            }).catch((err) => {
              console.log(err);
            });
          } else if (this.btnTitle==='Modifier') {
            service.update({libelle_materiel:this.libelle}, this.selected)
            .then((res) => {
              this.title='Nouveau'
              this.btnTitle='Enregistrer'
              this.iconTitle='fa-download'
              this.$refs.form.reset(), this.selected=null
              this.getAll(), this.alert=true, this.alertMsg=res.data.succee, setTimeout(()=>{this.alert=false}, 3000)
            }).catch((err) => {
              console.log(err);
            });
          }else {
            service.entree({id_materiel:this.selected, quantite_entree:this.qte, id_user:this.id_user})
            .then((res) => {
              this.title='Nouveau'
              this.btnTitle='Enregistrer'
              this.iconTitle='fa-download'
              this.$refs.form.reset(), this.selected=null
              this.getAll(), this.alert=true, this.alertMsg=res.data.succee, setTimeout(()=>{this.alert=false}, 3000)
            }).catch((err) => {
              console.log(err);
            });
          }
        }
      },
      getUserConnected() {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        this.id_user = user[0].id_user
        this.roleId = user[0].id_role
      },
    },
    mounted() {
      document.title = this.$route.meta.title || "Laboratoire d'analyse"
      this.getAll()
      this.getUserConnected()
      if (this.roleId != 5 && this.roleId != 1 && this.roleId != 2) {
        alert('Vous n\'êtes pas d\'accée à cette page.')
        window.history.back()
      }
    },
  }
</script>