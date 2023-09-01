<template>
    <v-container fluid>
        <v-row class="fill-height">
            <div class="col-md-4 pr-15 col-12" style="height: 599px; position: sticky;">
                <v-card img="chu.jpg" height="180px"/>
                <div style="position: absolute; top:15%" class="px-4 text-center">
                    <photoProfilVue/>
                    <div class="my-2 font-weight-bold text-h6">{{username}}</div>
                    <v-btn class="text-capitalize">Modifier le profil</v-btn>
                </div>
            </div>
            <div class="col-md-4 col-12 px-2 overflow-auto" style="height: 599px;">
                <v-card v-for="i in actions" :key="i.id_action" class="mb-2 sombre" max-height="200px">
                    <v-card-actions>
                        <v-card :img="i.User.user_profil" class="rounded-circle" width="50" height="50" style="border: 1px solid whitesmoke;" />
                        <div class="d-flex flex-column ml-2">
                            <div class="text-boby-2">{{i.User.username}}</div>
                            <div class="text-caption text--disabled">{{setDate(i.createdAt)}}</div>
                        </div>
                        <v-spacer></v-spacer>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-card-actions>
                    <v-card-text>
                        {{i.id_user===idconnect? 'Vous avez '+i.text : i.User.username +' a '+i.text}}
                    </v-card-text>
                </v-card>
            </div>
            <div class="col-md-4 col-12" style="height: 599px; position: sticky;">
                
            </div>
        </v-row>
    </v-container>
</template>
<script>
import photoProfilVue from '@/components/photo_Profil.vue'
import LoginService from '@/services/LoginService'
import actionService from '@/services/actionService'
import moment from 'moment'

export default {
    components:{ photoProfilVue },
    data(){return{
        img:'',
        username: '',
        idconnect: null,
        iduser:null,
        actions:[],
        role:null,
    }},
    methods:{
        getUser() {
            LoginService.getOne(this.idconnect)
            .then(res => {
                this.img = res.data.user[0].user_profil
                this.username = res.data.user[0].username
                this.role = res.data.user[0].id_role
                this.getAction()
            })
        },
        getUserConnected() {
            let user = localStorage.getItem('user')
            user = JSON.parse(user)
            this.idconnect = user[0].id_user
        },
        getAction() {
            if(this.role==5){
                actionService.getActionAll()
                .then(res => {
                    this.actions = res.data.data
                })
            } else {
                actionService.getAll(this.idconnect)
                .then(res => {
                    this.actions = res.data.data
                })  
            }
        },
        setDate(date) {
            return moment(date).format('Do MMMM YYYY ')
        },
    },
    mounted() {
        this.getUserConnected()
        this.getUser()
        document.title = this.u || "Laboratoire d'analyse"
    },
}
</script>