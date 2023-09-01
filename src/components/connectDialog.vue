<template>
    <div>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="300px"
            transition="dialog-transition"
        >
            <v-card :class="$vuetify.theme.dark ? 'sombre':'normal'" class="text-center rounded-lg rounded-br-0">
                <v-img
                    :src="img"
                    flat
                    height="220"
                    tile
                >
                    <v-row flat class="mx-1 mt-1 mb-16" color="rgba(0, 0, 0, 0)">
                        <v-spacer />
                        <v-icon @click="$emit('close'); reset()" color="error" style="text-shadow: 2px 2px 5px black;">mdi-close-circle</v-icon>
                    </v-row>
                    <v-card flat 
                        color="rgba(0, 0, 0, 0)" class="d-flex mt-16 align-end justify-end" 
                        height="45%" style="position:relative; top:20px;"
                    >
                        <span class="pa-2 font-weight-black black--text text-h5" style="text-shadow: 2px 2px 5px white;"> {{ Pseudo }} </span>
                    </v-card>
                </v-img>
                <v-form ref="form" v-model="valid">
                    <v-text-field
                        label="Mot de passe"
                        placeholder="Mot de passe"
                        :append-icon="show ? 'fa-eye': 'fa-eye-slash'"
                        :type="show ? 'text':'password'"
                        @click:append="show =! show" 
                        class="col-12 mt-4"
                        @keyup.enter="connecter()"
                        v-model="Password"
                    ></v-text-field>
                </v-form>
                
                <v-btn
                    small
                    class="text-capitalize mb-4 py-4 font-weight-bold col-9 primary white--text"
                    :loading="load" 
                    @click="connecter()"
                >Se connecter</v-btn>
            </v-card>  
        </v-dialog>
        <dialogMsg :open="acitve" :message="dialogmess" :title="title" @accept="acitve = false" />
        <!-- <progressDialog :open="progress"/> -->
    </div>
</template>
<script>
import loginservice from '../services/LoginService'
import dialogMsg from '@/components/PasswordDialog'
// import progressDialog from '@/components/progressDialog.vue'


export default {
    props:['open', 'data', 'form'],
    components: {
        dialogMsg,
        // progressDialog,
    },
    data(){
       return { 
            show: false,
            Pseudo: 'Undefined',
            Email:'Undefined@gmail.com',
            img:'chu.jpg',
            Password:'',
            title: '',
            load:false,
            progress: false,
            dialogmess: '',
            acitve: false,
            valid: false,
            rules:{
                min: v => v.length > 7 || 'Entrer au moins 8 (huit) caracters'
            },
            user:[],
        }
    },
    methods: {
        connect(data){
            this.Email = data.email
            this.Pseudo = data.username
            this.img = data.user_profil
        },
        async connecter(){
            this.$refs.form.validate()
            if(this.valid){
                if (this.Email && this.Password) {
                    await loginservice.login({email: this.Email , password: this.Password})
                    .then(res =>{
                            this.load = true
                        if (res.data.error) {
                            setTimeout(()=>{
                                this.load = false
                                this.acitve = true
                            },3000)
                            this.dialogmess = res.data.error
                            this.title = res.data.title
                        }
                        else {
                            this.user.push(res.data.User)
                            localStorage.setItem('user', JSON.stringify(this.user));
                            this.show2 = true
                            setTimeout(()=>{
                                this.load = false
                                this.$router.push({name: 'home'})
                                this.reset()
                            }, 5000)
                        }
                    })
                    .catch(() =>{
                        // 
                    })
                }
            }
        },
        reset(){
            this.$refs.form.reset()
        }
    },
    computed: {
        dialog(){return this.open}
    }
}
</script>
<style> 
.sombre {
  background-color: rgb(35, 35, 35);
  animation: sombre 15s infinite;
}

@keyframes sombre {
  0%   {background-color:rgb(35, 35, 35);}
  25%  {background-color:rgb(110, 110, 110);}
  50%  {background-color:rgb(35, 35, 35);}
  75%  {background-color:rgb(110, 110, 110);}
  100% {background-color:rgb(35, 35, 35);}
}
.normal {
  background-color: rgb(255, 255, 255);
  animation: normal 15s infinite;
}

@keyframes normal {
  0%   {background-color:rgb(255, 255, 255);}
  25%  {background-color:rgb(78, 78, 78);}
  50%  {background-color:rgb(255, 249, 249);}
  75%  {background-color:rgb(78, 78, 78);}
  100% {background-color:rgb(255, 253, 253);}
}
</style>
