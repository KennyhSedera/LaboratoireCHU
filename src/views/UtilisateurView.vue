<template>
    <v-container fluid>
        <v-toolbar :color="!$vuetify.theme.dark?'green darken-3':'grey darken-3'">
            <v-spacer></v-spacer>
            <span class="font-weight-black white--text text-md-h4 text-body-1 ml-4"><span class="ml-1 primary--text text-md-h2 font-weight-black">U</span>tilisateurs</span>
            <v-spacer></v-spacer>
            <v-col md="3" cols="6">
                <v-text-field
                    class="mt-10"
                    v-model="search"
                    append-icon="mdi-magnify"
                    @input="filteredKeys()"
                    @blur="filteredKeys()"
                    solo
                    label="Recherche..."
                ></v-text-field>
            </v-col>
            <template v-slot:extension>
                <v-tabs v-model="tab" align-with-title @change="getUser()">
                    <v-tabs-slider  :color="!$vuetify.theme.dark?'white':'yellow'"></v-tabs-slider>
                    <v-tab class="white--text" v-for="item in items" :key="item.title">
                        <v-badge v-if="item.title=='Inactif' && count!=0" color="error" :content="count" > {{ item.title }} </v-badge>
                        <span v-else>{{ item.title }}</span>
                    </v-tab>
                </v-tabs>
                <v-spacer></v-spacer>
            </template>
        </v-toolbar>

        <v-card outlined class="overflow-auto transparent pa-4" height="475">
            <v-row class="py-2 pa-1">
                <v-col md="3" cols="12" v-for="u in userAll" :key="u.id_user">
                    <v-card min-height="100px" class="elevation-5 pb-2">
                        <v-btn v-if="tab==2" class="ml-n4 mt-n5 red" small icon @click="deletItem(u)"><v-icon small class="white--text">fa-trash</v-icon></v-btn>
                        <v-card class="pa-2 mt-n4 transparent" outlined>
                            <v-card :img="u.user_profil" height="120px" class="mx-auto"></v-card>
                            <v-divider class="my-2"></v-divider>
                            <v-icon>mdi-account-circle</v-icon>: {{ u.username }}<br>
                            <v-icon>mdi-email</v-icon>: {{ u.email }}<br>
                            <v-icon>mdi-phone</v-icon>: {{ u.contact }}<br>
                            <v-icon class="ml-1">fa-user-md</v-icon>: {{ u.Role.libelle_role }}
                        </v-card>
                        <div v-if="tab==2" class="text-center px-5 mx-4">
                            <v-btn color="primary" @click="activation(u)" block small>Activer</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <div v-if="users.length == 0" class="text-center text-h5 font-weight-black">Il n'y a auccun utilisateur .</div>
        </v-card>

        <DeleteDialogVue :open="delDialog" :message="delMsg" @close="delDialog=false" @accept="deleteUser()"/>
        <alertMessageVue :active="alert" :Message="alertMsg" :type="typeAlert"/>
    </v-container>
</template>
<script>
import Service from '@/services/LoginService'
import DeleteDialogVue from '@/components/deleteDialog'
import alertMessageVue from '@/components/alertMessage.vue'
import actionService from '@/services/actionService'

export default {
    components:{ DeleteDialogVue, alertMessageVue,},
    data() {
        return {
            menu:null,
            items:[
                {title:'Tous'}, 
                {title:'Actif'}, 
                {title:'Inactif'}, 
            ], 
            users:[],
            tmp:'',
            status:'tous',
            tab:0,
            delDialog: false,
            delMsg: '',
            alert : false,
            typeAlert : "success",
            alertMsg : "",
            search:'',
            filter: {},
            count: null,
            idconnect:null,
        }
    },
    methods: {
        getUserConnected() {
            let user = localStorage.getItem('user')
            user = JSON.parse(user)
            this.idconnect = user[0].id_user
        },   
        filteredKeys () { 
            if (this.search===''){
                this.getUser()
            }else{
               this.tmp = this.users.filter(element=>element.username.toLowerCase().includes(this.search.toLowerCase())||
               element.email.toLowerCase().includes(this.search.toLowerCase())||
               element.contact.toLowerCase().includes(this.search.toLowerCase())||
               element.Role.libelle_role.toLowerCase().includes(this.search.toLowerCase())
               )
                
            }
        },
        async getUser(){
          if(this.tab==0){
            await Service.get({status_compte : !'blocked'})
            .then(res=>{
                this.users=res.data.users
                this.tmp=this.users
            })
          }else if(this.tab==1){
            await Service.get({status_compte : 'active'})
            .then(res=>{
                this.users=res.data.users
                this.tmp=this.users
            })
          }else if(this.tab==2){
            await Service.get({status_compte : 'inactive'})
            .then(res=>{
                this.users=res.data.users
                this.tmp=this.users
            })
          }
        },
        async getcount(){
            await Service.get({status_compte : 'inactive'})
            .then(res=>{
                this.count=res.data.users.length
            })
        },
        deletItem(data){
            this.selected = data.id_user
            this.delDialog = true
            this.delMsg = `Voulez-vous supprimer vraiment l'utilisateur "${data.username}"`
        },
        async activation(data){
            await Service.activer(data.id_user)
            .then((res) => {
                actionService.create({
                    text: `Vous avez activée la compte du ${data.username}.`,
                    id_user:this.idconnect
                })
                this.alert = true
                this.typeAlert = "success"
                this.alertMsg = res.data.succee
                setTimeout(() => {
                    this.alert = false 
                    this.getUser()
                    this.getcount()
                }, 3000);
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    computed: {
        userAll(){return this.tmp}
    },
    mounted() {
        document.title = this.$route.meta.title || "Laboratoire d'analyse"
        this.getUser()
        this.getcount()
        this.getUserConnected()
    },
}
</script>