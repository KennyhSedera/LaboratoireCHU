<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="400"
            persistent
            transition="dialog-transition"
        >
        <v-card>
            <v-card-title v-if="$vuetify.breakpoint.mdAndUp">
            <v-avatar size="70" class="mr-2 border" style="border: 2px solid grey;">
              <v-img :src="img"></v-img>
            </v-avatar>
               <span class="font-weight-black text-left text-h6 pt-2 ml-2">{{ username }} .</span>
            </v-card-title>
            <v-card-text class="text-center my-4 text-md-body-1">
               <span class="mt-4"> Souhaitez-vous vraiment vous déconnecter ?</span>
            </v-card-text>
          <v-row class="mb-0 mx-1">
            <v-col>
              <v-spacer></v-spacer>
              <v-btn
                block
                class="elevation-1 text-capitalize"
                @click="$emit('close')"
              > Non </v-btn>
            </v-col>
            <v-col>
              <v-btn
                block
                class="elevation-1 text-capitalize blue white--text"
                @click="$emit('accept')"
              > Oui </v-btn>
            </v-col>
          </v-row>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
import LoginService from '@/services/LoginService'


export default {
    props:['active'],
    computed:{
        dialog(){return this.active}
    },
    methods: { 
    getUser(id) {
      LoginService.getOne(id)
        .then(res => {
          this.img = res.data.user[0].user_profil
          this.username = res.data.user[0].username
        })
    },
    user() {
      let user = localStorage.getItem('user')
      user = JSON.parse(user)
      this.id = user[0].id_user
      this.getUser(this.id)
    },
    },
    mounted() {
        this.user()
    },
    data() {
        return {
            username:'',
            img:''
        }
    },
}
</script>