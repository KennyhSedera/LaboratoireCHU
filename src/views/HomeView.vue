<template>
  <container class="fill-height" fluid>
    <v-row class="pa-2">
      <v-col class="col-12">
          <carrousel class="mx-auto"/>
      </v-col>
      
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="12" class="top">
        <v-row class="justify-center align-center">
          <v-card 
            v-for="n in liens" 
            :key="n.title" width="200" height="155" 
            :class="$vuetify.theme.dark?'sombre':''" 
            class="ma-1 pb-10 elevation-8 text-center" 
            router :to="n.route" 
          >
            <v-icon size="120">{{n.icon}}</v-icon>
            <div class=" text-h5 font-weight-black" >{{ n.title }}</div>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </container>
</template>

<script>
    import carrousel from '@/components/cardCarousel'
    import moment from 'moment'

    export default{
        data(){
          return{
            logout: false,
            patients:[],
            chartData: {
              labels: [],
              datasets: []
            },
            entreeData: {
              labels: [],
              datasets: []
            },
            sortieData: {
              labels: [],
              datasets: []
            },
            materielData: {
              labels: [],
              datasets: []
            },
            liens:[
              {title:'Examens', icon:'mdi-tag-multiple', route:'/examen'},
              {title:'Prescripteurs', icon:'fa-user-md', route:'/prescripteur'},
              {title:'Matériels', icon:'mdi-flask', route:'/materiel'},
              {title:'Patients', icon:'mdi-account-group', route:'/patient'},
              {title:'Analyses', icon:'mdi-tag', route:'/analyse'},
              {title:'Utilisateurs', icon:'mdi-account-circle', route:'/utilisateur'},
            ],
            Pseudo: '',
            img: '',
          }
        },
        components:{
            carrousel,
        },
        methods:{
          setDate(date){
            return moment(date).format('DD MMM')
          },
        },
        mounted(){
          document.title = this.$route.meta.title || "Laboratoire d'analyse"
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
  