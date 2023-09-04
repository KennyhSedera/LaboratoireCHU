<template>
    <v-img src="CHU-TAMBOHOBE.png" class="fill-height img d-flex align-center" max-height="100vh">
        <v-row>
            <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="12" md="7" class="d-flex align-center">
                <v-row class="mx-1">
                    <div class="text-center font-weight-black white--text text-uppercase ml-4 text-md-h4">laboratoire d'analyse CHU TAMBOHOBE</div>
                    <v-col class="mx-1" v-for="i in usersession" :key="i.id_user">
                        <v-card height="260px" width="220px" class="rounded-lg">
                            <v-img :src="i.user_profil" height="62%">
                                <v-row flat class="mx-1 my-1" color="rgba(0, 0, 0, 0)">
                                    <v-spacer />
                                    <v-icon color="error" style="text-shadow: 2px 2px 5px black;" @click="console.log('close')">mdi-close-circle</v-icon>
                                </v-row>
                            </v-img>
                            <div class="my-2 mx-4" @click="selectconnect(i)" style="cursor: pointer;">
                                <div class="headline">{{i.username}}</div>
                                <div class="text-caption">({{i.email }})</div>
                                 <v-btn
                                    text
                                    small
                                    block
                                    @click="selectconnect(i)"
                                    color="primary text-capitalize mb-4 text-caption py-4 font-weight-bold col-12 "
                                >Se connecter </v-btn>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="5">
                <v-card max-width="650" max-height="400" class="transparent mx-auto mr-md-8">
                    <v-stepper v-model="e1" class="transparent">
                        <v-stepper-items>
                            <v-stepper-content step="1" :class="$vuetify.theme.dark?'opacity1':'opacity2'">
                                <v-row class="pb-2 pl-4">
                                    <v-col cols="12" md="1"></v-col>
                                    <v-col cols="12" md="10" class="text-center">
                                        <div class="text-center font-weight-bold mb-5 text-md-h4 text-h5">
                                            Authentification
                                        </div>
                                        <v-form ref="connect" v-model="valid1">
                                            <v-text-field
                                                solo
                                                :rules="[rules.required]"
                                                v-model="email"
                                                prepend-inner-icon="mdi-email"
                                                label="Adresse email"
                                                placeholder="Entrez votre adresse email"
                                                @keyup.enter="connecter()"
                                            ></v-text-field>
                                            <v-text-field
                                                solo
                                                :rules="[rules.required]"
                                                v-model="password"
                                                prepend-inner-icon="fa-lock"
                                                :append-icon="show ?'fa-eye':'fa-eye-slash'"
                                                :type="show ? 'text':'password'"
                                                @click:append="show = !show"
                                                label="Mot de passe"
                                                placeholder="Entrez votre mot de passe"
                                                @keyup.enter="connecter()"
                                            ></v-text-field>
                                        </v-form>
                                        <v-btn @click="connecter" color="primary" class="col-md-10 text-capitalize">se connecter</v-btn>
                                        <v-btn @click="reset1" text color="red" class=" ml-2 text-capitalize" v-if="invalid">Annuler</v-btn>
                                    <div class="text-center text-body-1 mt-2" :class="$vuetify.theme.dark ? 'primary--text' : 'black--text font-weight-black'" ><span class="curser" @click="$refs.connect.reset();e1++">Créer nouveau compte.</span></div>
                                    </v-col>
                                </v-row>
                                <div class="text-left text-caption">
                                    Created by <a href="https://www.facebook.com/profile.php?id=100006716355270" target="_blank">Kennyh Sedera</a>
                                </div>
                            </v-stepper-content>
                            <v-stepper-content step="2" :class="$vuetify.theme.dark?'opacity1':'opacity2'" class=" text-center">
                                    <nav class="text-center text-h4"> Nouveau compte </nav>
                                    <v-form ref="form" v-model="valid">
                                        <v-row class="text-center mt-2">
                                            <v-col cols="6" md="6">
                                                <comboboxRoleVue ref="cbxrole"/>
                                                <v-text-field
                                                    solo
                                                    v-model="email1"
                                                    :rules="[rules.required, rules.email]"
                                                    prepend-inner-icon="mdi-email"
                                                    label="Adresse email"
                                                    placeholder="Entrez votre adresse email"
                                                    @keyup.enter="create"
                                                ></v-text-field>
                                                <v-text-field
                                                    solo
                                                    v-model="password1"
                                                    required
                                                    :error-messages="pwdErrors"
                                                    @input="$v.password1.$touch()"
                                                    @blur="$v.password1.$touch()"
                                                    prepend-inner-icon="fa-lock"
                                                    :append-icon="show1 ?'fa-eye':'fa-eye-slash'"
                                                    :type="show1 ? 'text':'password'"
                                                    @click:append="show1 = !show1"
                                                    label="Mot de passe"
                                                    placeholder="Entrez votre mot de passe"
                                                    @keyup.enter="create"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="6" md="6">
                                                <v-text-field
                                                    solo
                                                    v-model="name"
                                                    :rules="[rules.required]"
                                                    prepend-inner-icon="mdi-alpha-n-box"
                                                    label="Nom ou prenom"
                                                    placeholder="Entrez votre nom"
                                                    @keyup.enter="create"
                                                ></v-text-field>
                                                <v-text-field
                                                    solo
                                                    v-model="phone"
                                                    :rules="[rules.required]"
                                                    prepend-inner-icon="mdi-phone"
                                                    label="Contact"
                                                    placeholder="Entrez votre numero mobile"
                                                    @keyup.enter="create"
                                                ></v-text-field>
                                                <v-text-field
                                                    solo
                                                    v-model="password2"
                                                    :rules="[rules.required, rules.confirm]"
                                                    prepend-inner-icon="fa-lock"
                                                    :append-icon="show2 ?'fa-eye':'fa-eye-slash'"
                                                    :type="show2 ? 'text':'password'"
                                                    @click:append="show2 = !show2"
                                                    label="Confirmer mot de passe"
                                                    placeholder="Confirmer votre mot de passe"
                                                    @keyup.enter="create"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-btn color="primary" @click="create()" class="mt-n1 text-capitalize mx-auto col-md-8">créer compte</v-btn>
                                        <v-btn @click="reset" text color="red" class=" ml-1 text-capitalize" v-if="invalid2">Annuler</v-btn>
                                    <div class="text-center text-body-1 mt-2 " :class="$vuetify.theme.dark ?'primary--text':'black--text font-weight-black'"><span class="curser" @click="$refs.form.reset();reset(); e1--">Se connecter.</span></div>
                                    </v-form>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-card>
            </v-col>
        </v-row>
        <alertdialog :open="alert" :message="message" :title="title" @accept="alert=false"/>
        <alertMessageVue :active="active" :Message="alertMsg" :type="typeAlert"/>
        <connectDialogVue :open="open" @close="open=false" ref="refcon" />
    </v-img>
</template>
<script>
import userService from '@/services/LoginService'
import Service from '@/services/TypeAnalyseService'
import roleService from '@/services/roleService'
import alertdialog from '@/components/PasswordDialog'
import connectDialogVue from '@/components/connectDialog.vue'
import comboboxRoleVue from '@/components/comboboxRole.vue'
import alertMessageVue from '@/components/alertMessage.vue'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'


export default {
    mixins: [validationMixin],
    components:{ alertdialog, comboboxRoleVue, alertMessageVue, connectDialogVue },
    validations: { password1: { required, minLength: minLength(8) } },
    data() {
        return {
            open:false,
            show:false,
            active:false,
            alertMsg:'',
            typeAlert:'success',
            show1:false,
            show2:false,
            invalid:false,
            invalid2:false,
            valid:true,
            valid1:true,
            e1:1,
            rules:{
                required: v => !!v || 'Cette champs est vide !',
                email: v => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
                    return pattern.test(v) || 'Adresse email invalidée.'
                },
                confirm: () => (this.password1 === this.password2) || 'Les mots de passe doivent-etre identique !'
            },
            admin:false,
            password:'',
            password1:'',
            password2:'',
            name:'',
            email:'',
            email1:'',
            phone:'',
            message:'',
            title:'',
            alert:false,
            user:[],
            usersession:[],
        }
    },
    methods: {
        selectconnect(data) {
            this.open = true
            this.$refs.refcon.connect(data)
        },
        async create(){
        this.$v.$touch()
        this.$refs.form.validate()
            if (this.valid) {
                await userService.verifyEmail({email: this.email1})
                .then(res =>{
                    if (res.data.error) {
                        this.alert=true
                        this.message=res.data.error
                        this.title="Erreur !"
                    }
                    else if (res.data.success){
                        this.createUser()
                    }
                })
            }
            this.invalid2 = true
        },
        async connecter(){
        this.$refs.connect.validate()
            if (this.valid1) {
                this.invalid = false
                await userService.login({email: this.email, password: this.password})
                .then(res =>{
                    if (res.data.error) {
                        this.alert=true
                        this.message=res.data.error
                        this.title=res.data.title
                    }
                    else {
                        this.invalid = false
                        this.user.push(res.data.User)
                        localStorage.setItem('user', JSON.stringify(this.user));
                        let sessions = localStorage.getItem('users');
                        sessions=JSON.parse(sessions)
                        if (sessions) {
                            let array = sessions
                            if(array.length == 3){
                                array.pop()
                                array.unshift(res.data.User)
                                localStorage.setItem('users', JSON.stringify(array));
                            }else{
                                array.unshift(res.data.User)
                                localStorage.setItem('users', JSON.stringify(array));
                            }
                        } else {
                            let array = []
                            array.push(res.data.User)
                            localStorage.setItem('users', JSON.stringify(array));
                        }
                        setTimeout(()=>{
                            this.$router.push({name: 'home'})
                            this.reset1()
                        }, 1000)
                    }
                })
                .catch((err) =>{
                    console.log(err); 
                })
            } this.invalid = true
        },
        reset(){
            this.$v.$reset()
            this.$refs.form.resetValidation()
            this.password1=''
            this.show1 = false
            this.show2 = false
            this.invalid2 = false
        },
        reset1(){
            this.$refs.connect.resetValidation()
            this.show = false
            this.invalid = false
        },
        ferme(){
            this.reset()
            this.e1--
        },
        async createUser(){
            await userService.register({
                email: this.email1, 
                password: this.password1, 
                username: this.name, 
                contact:this.phone,
                status_compte:'inactive', 
                id_role:this.$refs.cbxrole.getId(),
                user_profil:"User_Profil_1676662369351.webp",
            })
            .then(res =>{
                if (res.data.error) {
                    this.alert=true
                    this.message=res.data.error
                }
                else {
                    this.active=true
                    this.alertMsg="Votre compte est cree avec succee. Mais en attente de l'activation par l'administrateur."
                    this.typeAlert="success"
                    setTimeout(() => {
                        this.active=false
                        this.ferme()
                    }, 3000);
                }
            })
            .catch((err) =>{
                console.log(err); 
            })
        },
        getType(){
            Service.getAll()
            .then(res=>{
                if(res.data.types.length === 0){
                    localStorage.removeItem('users')
                    Service.create()
                    .then(() => {
                        roleService.create()
                        .then(() => {
                            this.getUser()
                        })
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getRole(){
            roleService.getAll()
            .then(res=>{
                this.u=this.localStorage.getItem('username')
                if(res.data.roles.length === 0){
                    roleService.create()
                    .then(()=>{
                        this.getUser()
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getUser(){
            userService.get({status_compte : !'blocked'}) 
            .then((res) => {
            if (res.data.users.length === 0) {
                userService.register({
                    email: "admin@gmail.com", 
                    password: "admin1234", 
                    username: "Admin", 
                    contact: "034",
                    status_compte:'active', 
                    id_role:5,
                    user_profil:"User_Profil_1676662369351.webp",
                })
                .then(()=>{
                    this.alert=true
                    this.title="Compte Admin"
                    this.message="Email: admin@gmail.com. Mot de passe: admin1234"
                })
            }
            }).catch((err) => {
                console.log(err);
            });
        },
        mode(){
            const dark = localStorage.getItem('dark')
            if(dark=='true'){  this.$vuetify.theme.dark=true }
            else if(dark=='false'){ this.$vuetify.theme.dark=false }
        },
        getSession(){
            let users = localStorage.getItem('users')
            users = JSON.parse(users)
            if(users){
                this.usersession = users
            }
        },
    },
    computed: {
      pwdErrors () {
        const errors = []
        if (!this.$v.password1.$dirty) return errors
        !this.$v.password1.minLength && errors.push('Entrer au moins 8 (huit) caracters')
        !this.$v.password1.required && errors.push('Cette champs est vide !')
        return errors
      },
        
    },
    mounted() {
        this.getSession()
        this.getType()
        document.title = this.$route.meta.title || "Laboratoire d'analyse"
        this.mode()
    },
}
</script>
<style>
.curser {cursor: pointer;}
.opacity1 { background: rgba(28, 28, 28, 0.845); }
.opacity2 { background: rgba(255, 253, 253, 0.328); }
v-img.img {opacity: 0.7;}
::-webkit-scrollbar{
    width:5px;
}
::-webkit-scrollbar-track{
    background-color:rgb(255, 255, 255);
}
::-webkit-scrollbar-thumb{
    background-color:rgb(157, 152, 152);
}
</style>