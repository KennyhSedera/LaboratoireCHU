<template>
  <container class="fill-height" fluid>
    <v-row class="pa-2">
      <v-col class="col-12">
          <carrousel class="mx-auto"/>
      </v-col>
      
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="12" class="top">
        <v-row class="justify-center align-center">
          <v-card 
            width="200" height="155" 
            :class="$vuetify.theme.dark?'sombre':''" 
            class="ma-1 pb-10 elevation-8 text-center" 
            router to="/examen" 
            v-if="roleId==5 || roleId==3 || roleId == 1 || roleId == 2"
          >
            <v-icon size="120">mdi-tag-multiple</v-icon>
            <div class=" text-h5 font-weight-black" >Examens</div>
          </v-card>
          <v-card 
            width="200" height="155" 
            :class="$vuetify.theme.dark?'sombre':''" 
            class="ma-1 pb-10 elevation-8 text-center" 
            router to="/prescripteur" 
            v-if="roleId==5 || roleId == 3"
          >
            <v-icon size="120">fa-user-md</v-icon>
            <div class=" text-h5 font-weight-black" >Prescripteurs</div>
          </v-card>
          <v-card 
            width="200" height="155" 
            :class="$vuetify.theme.dark?'sombre':''" 
            class="ma-1 pb-10 elevation-8 text-center" 
            router to="/materiel" 
            v-if="roleId==5 || roleId == 1 || roleId == 2"
          >
            <v-icon size="120">mdi-flask</v-icon>
            <div class=" text-h5 font-weight-black" >Matériels</div>
          </v-card>
          <v-card 
            width="200" height="155" 
            :class="$vuetify.theme.dark?'sombre':''" 
            class="ma-1 pb-10 elevation-8 text-center" 
            router to="/patient" 
            v-if="roleId==5 || roleId == 3"
          >
            <v-icon size="120">mdi-account-group-outline</v-icon>
            <div class=" text-h5 font-weight-black" >Patients</div>
          </v-card>
          <v-card 
            width="200" height="155" 
            :class="$vuetify.theme.dark?'sombre':''" 
            class="ma-1 pb-10 elevation-8 text-center" 
            router to="/analyse" 
            v-if="roleId==5 || roleId == 1 || roleId == 2 || roleId == 4 || roleId == 3"
          >
            <v-icon size="120">mdi-tag-outline</v-icon>
            <div class=" text-h5 font-weight-black" >Analyses</div>
          </v-card>
          <v-card 
            width="200" height="155" 
            :class="$vuetify.theme.dark?'sombre':''" 
            class="ma-1 pb-10 elevation-8 text-center" 
            router to="/utilisateur" 
            v-if="roleId==5"
          >
            <v-icon size="120">mdi-account-supervisor-circle-outline</v-icon>
            <div class=" text-h5 font-weight-black" >Utilisateurs</div>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </container>
</template>

<script>
    import carrousel from '@/components/cardCarousel'
    import moment from 'moment'

export default {
      name:'HomeView',
        data(){
          return{
            roleId: null,
            idconnect: null,
          }
        },
        components:{
            carrousel,
        },
        methods:{
          setDate(date){
            return moment(date).format('DD MMM')
          },
          getUserConnected() {
            let user = localStorage.getItem('user')
            user = JSON.parse(user)
            this.idconnect = user[0].id_user
            this.roleId = user[0].id_role
          },
        },
        mounted(){
          document.title = this.$route.meta.title || "Laboratoire d'analyse"
          this.getUserConnected()
        }
    }
</script>
<style>
.top{
  position:absolute;
  top:210px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
  