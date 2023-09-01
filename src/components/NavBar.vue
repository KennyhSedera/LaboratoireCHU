<template>
    <div>
        <v-app-bar :color="!$vuetify.theme.dark?'green darken-3':'grey darken-3'" class="white--text" app>
            <v-icon class="white--text " v-if="$route.name!='home' && $route.name!='profile'" large @click="home()">fa-home</v-icon>
            <v-menu v-else offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="white--text " v-bind="attrs" v-on="on" large @click="drawer=true">mdi-menu</v-icon>
                </template>
                <v-card width="210">
                    <v-list dense>
                        <v-list-item-group color="primary" class="px-2">
                            <v-list-item router to="/examen">
                                <v-list-item-icon> <v-icon>mdi-tag-multiple</v-icon> </v-list-item-icon>
                                <v-list-item-content> <v-list-item-title>Examens</v-list-item-title> </v-list-item-content>
                            </v-list-item>
                            <v-list-item router to="/prescripteur">
                                <v-list-item-icon> <v-icon>fa-user-md</v-icon> </v-list-item-icon>
                                <v-list-item-content> <v-list-item-title>Prescripteurs</v-list-item-title> </v-list-item-content>
                            </v-list-item>
                            <v-list-item router to="/patient">
                                <v-list-item-icon> <v-icon>mdi-account-group</v-icon> </v-list-item-icon>
                                <v-list-item-content> <v-list-item-title>Patients</v-list-item-title> </v-list-item-content>
                            </v-list-item>
                            <v-list-item router to="/analyse">
                                <v-list-item-icon> <v-icon>mdi-tag</v-icon> </v-list-item-icon>
                                <v-list-item-content> <v-list-item-title>Analyses</v-list-item-title> </v-list-item-content>
                            </v-list-item>
                            <v-list-item router to="/materiel">
                                <v-list-item-icon> <v-icon>mdi-flask</v-icon> </v-list-item-icon>
                                <v-list-item-content> <v-list-item-title>Materiels</v-list-item-title> </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-if="this.roleId==5" router to="/utilisateur">
                                <v-list-item-icon> <v-icon>mdi-account-circle</v-icon> </v-list-item-icon>
                                <v-list-item-content> <v-list-item-title>Utilisateurs</v-list-item-title> </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-menu>
            <v-spacer></v-spacer>
            <nav v-if="$vuetify.breakpoint.mdAndUp" class=" text-h4 font-weight-black">Laboratoire d'analyse CHU Tambohobe</nav>
            <nav v-if="!$vuetify.breakpoint.mdAndUp" class="text-body-2 font-weight-black">Laboratoire d'analyse CHU Tambohobe</nav>
            <v-spacer></v-spacer>
            <v-icon class="white--text " @click="darkmode()">{{$vuetify.theme.dark? 'mdi-weather-night' : 'fa-sun-o'}}</v-icon>
            <v-icon class="white--text mx-6">fa-bell</v-icon>
            <v-menu bottom offset-y :close-on-click="onclick" :close-on-content-click="oncontent" offset-x>
                <template v-slot:activator="{ on, attrs }">
                    <v-card 
                        v-bind="attrs" 
                        v-on="on" 
                        :img="img" 
                        class="rounded-circle ml-4" 
                        width="50px" height="50px" 
                        style="border: 2px solid grey;"
                    ></v-card>
                </template>
                <v-card width="300px" min-height="200px">
                    <div class="pa-1">
                        <v-card 
                            :img="img" 
                            class="rounded-circle" 
                            width="80px" height="80px" 
                            style="border: 2px solid grey;"
                        ></v-card>
                        <nav class="ml-2 font-weight-black text-h6 mt-4"> {{ username }} </nav>
                    </div>
                    <v-list dense>
                        <v-list-item-group>
                            <v-list-item @click="$router.push({ path: `/profile` })">
                                <v-list-item-content>
                                    <v-list-item-title class="text-body-2">Voir votre profile</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon>mdi-account-circle</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            <v-list-item @click="logout = true">
                                <v-list-item-content>
                                    <v-list-item-title class="text-body-2">Se deconnecter</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-icon>mdi-logout</v-icon>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer :color="!$vuetify.theme.dark?'green darken-3':'grey darken-3'" app v-model="drawer" v-if="$route.name!='home' && $route.name!='profile' && $vuetify.breakpoint.mdAndUp">
            <img src="lab (1).jpg"/>
            <v-list dense>
                <v-subheader class="text-body-1 white--text">Laboratoire CHU Tambohobe</v-subheader>
                <v-list-item-group color="primary" class="pa-2">
                    <v-list-item class="my-1 white--text" router to="/home">
                        <v-list-item-icon> <v-icon class="white--text">mdi-home</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Accueil</v-list-item-title> </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="my-1 white--text" router to="/examen">
                        <v-list-item-icon> <v-icon class="white--text">mdi-tag-multiple</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Examens</v-list-item-title> </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="my-1 white--text" router to="/prescripteur">
                        <v-list-item-icon> <v-icon class="white--text">fa-user-md</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Prescripteurs</v-list-item-title> </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="my-1 white--text" router to="/patient">
                        <v-list-item-icon> <v-icon class="white--text">mdi-account-group</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Patients</v-list-item-title> </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="my-1 white--text" router to="/analyse">
                        <v-list-item-icon> <v-icon class="white--text">mdi-tag</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Analyses</v-list-item-title> </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="my-1 white--text" router to="/materiel">
                        <v-list-item-icon> <v-icon class="white--text">mdi-flask</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Materiels</v-list-item-title> </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="this.roleId==5" class="my-1 white--text" router to="/utilisateur">
                        <v-list-item-icon> <v-icon class="white--text">mdi-account-circle</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Utilisateurs</v-list-item-title> </v-list-item-content>
                    </v-list-item>
                    <!-- <v-list-item class="my-1 white--text" router to="/statistique">
                        <v-list-item-icon> <v-icon class="white--text">mdi-chart-bar</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Statistique</v-list-item-title> </v-list-item-content>
                    </v-list-item> -->
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <LogoutDialog :active="logout" @close="logout=false" @accept="deco()"/> 
    </div>
</template>
<script>
import LoginService from '@/services/LoginService';
import LogoutDialog from './LogoutDialog.vue';

export default {
    components:{LogoutDialog},
    data() {
        return {
            logout: false,
            drawer: true,
            onclick: true,
            oncontent: true,
            id: '',
            img: '',
            username:'',
            roleId: 0,
        }
    },
    methods:{
        getUser() {
            LoginService.getOne(this.id)
            .then(res => {
                this.img = res.data.user[0].user_profil
                this.username = res.data.user[0].username
                this.roleId = res.data.user[0].id_role
            })
        },
      user(){
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        this.id = user[0].id_user
      },
      deco(){
        localStorage.removeItem('user');
        this.$router.push({name: 'login'})
      },
      darkmode(){
        const theme = !this.$vuetify.theme.dark
        this.$vuetify.theme.dark=!this.$vuetify.theme.dark
        localStorage.removeItem('dark');
        localStorage.setItem('dark', theme);
      },
      mode(){
        const dark = localStorage.getItem('dark')
        if(dark=='true'){  this.$vuetify.theme.dark=true }
        else if(dark=='false'){ this.$vuetify.theme.dark=false }
      },
    },
    mounted() {
        this.$vuetify.theme.dark=localStorage.getItem('dark');
        this.user()
        this.mode()
        this.getUser()
    },
}
</script>