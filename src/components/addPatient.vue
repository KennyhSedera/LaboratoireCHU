<template>
    <div>
        <v-dialog v-model="dialog" width="620" persistent transition="dialog-transition">
            <v-card class="pa-4 grey darken-3">
                <div class="text-md-h5 ml-4 font-weight-bold" v-if="step==1">Formulaire Patient
                    <v-icon @click="close()" class="red--text" style="position:absolute; left:95%; top:4px">mdi-close-circle</v-icon>
                </div>
                <div class="text-md-h5 ml-4 font-weight-bold" v-if="step==2 && btnTitle=='suivant' && newanal==false">Analyse
                    <v-icon @click="step--" class="red--text" style="position:absolute; left:95%;">fa-chevron-circle-left</v-icon>
                </div>
                <div class="text-md-h5 ml-4 font-weight-bold" v-if="step==2 && newanal==true">Analyse du patient {{ nom }}
                    <v-icon @click="$emit('close'); numpat=''; step=1; newanal=false; $refs.form3.reset();analyses=[]; sel=[]" class="red--text" style="position:absolute; left:95%;">mdi-close-circle</v-icon>
                </div>
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <v-card-text>
                            <v-form ref="form" v-model="valid">
                                <v-row class="pa-1 mt-2">
                                    <v-col cols="12" md="6">
                                        <v-text-field class="text--grey" :rules="[v=> !!v || 'Cette champ est vide!']" prepend-inner-icon="mdi-alpha-n-box" readonly v-model="numero" solo label="Numero" placeholder="Numero"/>
                                        <v-text-field v-model="age" type="number" class="text--grey" :rules="[v=> !!v || 'Cette champ est vide!']" prepend-inner-icon="mdi-alpha-a-box" solo label="Age" placeholder="Age"/>
                                        <v-autocomplete v-model="genre" :items="sexes" :rules="[v=> !!v || 'Cette champ est vide!']" class="text--grey" prepend-inner-icon="fa-venus-mars" solo label="Sexe" placeholder="Sexe"/>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="nom" class="text--grey" :rules="[v=> !!v || 'Cette champ est vide!']" prepend-inner-icon="fa-street-view" solo label="Nom" placeholder="Nom"/>
                                        <v-text-field v-model="adress" class="text--grey" :rules="[v=> !!v || 'Cette champ est vide!']" prepend-inner-icon="mdi-map-marker" solo label="Adresse" placeholder="Adresse"/>
                                        <v-text-field v-model="contact" type="number" class="text--grey" :rules="[v=> !!v || 'Cette champ est vide!']" prepend-inner-icon="mdi-cellphone" solo label="Contact" placeholder="Contact"/>
                                    </v-col>
                                </v-row>
                                <div class="text-right mx-2" v-if="btnTitle=='suivant'">
                                    <v-btn v-if="isvalid" class="text-capitalize error px-2 mr-2" @click="clearform">
                                        annuller <v-icon small class="ml-2">fa-refresh</v-icon>
                                    </v-btn>
                                    <v-btn :disabled="!valid" class="text-capitalize primary px-8" @click="next">
                                        {{ btnTitle }} <v-icon small class="ml-2">{{ iconTitle }}</v-icon>
                                    </v-btn>
                                </div>
                                <div class="text-center" v-else><v-btn class="text-capitalize primary px-8" @click="next">{{ btnTitle }} <v-icon small class="ml-2">{{ iconTitle }}</v-icon></v-btn></div>
                            </v-form>
                        </v-card-text>
                    </v-window-item>
                    <v-window-item :value="2">
                        <v-card-text class="text-center" style="">
                            <v-form v-model="valid3" ref="form3">
                                <v-row>
                                    <v-col class="col-12 col-md-6">
                                        <v-text-field v-model="num" readonly :rules="[v=> !!v || 'Cette champ est vide!']" prepend-inner-icon="mdi-alpha-n-box" solo label="Service" placeholder="Service"/>
                                        <v-text-field v-model="service" :rules="[v=> !!v || 'Cette champ est vide!']" prepend-inner-icon="fa-snowflake-o" solo label="Service" placeholder="Service"/>
                                    </v-col>
                                    <v-col class="text--grey col-12 col-md-6">
                                        <cbxprescripteur ref="cbxpre"/>
                                        <v-btn large class="primary" block @click="dialog2=true; getExam()">Examen</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                            <div class="text-right mx-2">
                                <v-btn v-if="isvalid3" class="text-capitalize error px-2 mr-2" @click="$refs.form3.resetValidation(); isvalid3=false">
                                    annuller <v-icon small class="ml-2">fa-refresh</v-icon>
                                </v-btn>
                                <div class="text-center">
                                    <v-btn :disabled="analyses.length<=0" class="text-capitalize primary px-8" @click="add()">Enregistrer 
                                    <v-icon small class="ml-2">fa-download</v-icon>
                                </v-btn> </div>
                            </div>
                        </v-card-text>
                    </v-window-item>
                </v-window>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" width="800" persistent transition="dialog-transition">
            <v-card class="pa-4 grey darken-3">
                <v-row>
                    <v-col cols="12" md="8"> <div class="text-md-h5 font-weight-bold mr-4">Examens</div></v-col>
                    <v-col cols="12" md="4"> <v-text-field clearable label="Chercher examen" append-icon="mdi-magnify" solo v-model="search"
                    @input="filteredKeys()"
                    @blur="filteredKeys()" /> </v-col>
                </v-row>
                <v-card-text class="rounded-lg grey darken-4 overflow-auto" style="max-height:400px; ">
                    <v-item-group v-model="sel" multiple>
                        <v-container>
                        <v-row>
                            <v-col v-for="(item, n) in examenAll" :key="n" cols="12" md="4">
                            <v-item v-slot="{ active, toggle }">
                                <v-card :color="active ? 'success' : ''" @click="toggle">
                                    <div class="pa-2 text-center" @click="!active? setItem(item):delItem(item)">{{ item.nom_examen }}</div>
                                </v-card>
                            </v-item>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-item-group>
                </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn class="primary text-capitalize col-md-3" @click="dialog2 = false" > Ajouter </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <alertMessage :active="alert" :Message="alertMsg" :type="typeAlert"/>
    </div>
</template>

<script>
import moment from 'moment'
import cbxprescripteur from '@/components/comboboxPrescripteur'
import alertMessage from '@/components/alertMessage'
import service from '@/services/ExamenService'
import PatientService from '@/services/PatientService'
import Analyse from '@/services/ListeService'
import analyseService from '@/services/analyseService'
import actionService from '@/services/actionService'

export default {
    components:{cbxprescripteur, alertMessage},
    props:['active', 'update'],
    data() {
        return {
            btnTitle:'suivant',
            iconTitle:'fa-chevron-circle-right',
            sexes:['Homme', 'Femme'],
            step:1,
            valid:true,
            valid3:true,
            isvalid:false,
            isvalid3:false,
            dialog2:false,
            items:[],
            sel:[],
            analyses:[],
            keys: [ 'nom_examen', ],
            sortBy: 'id_examen',
            search: '',
            itemsPerPageArray: [4, 8, 12],
            sortDesc: false,
            page: 1,
            itemsPerPage: 6,
            selected:[],
            num:'',
            service:'',
            numero:'',
            numpat:'',
            nom:'',
            adress:'',
            genre:'',
            contact:'',
            age:null,
            select:'',
            alertMsg:'',
            typeAlert:'success',
            alert:false,
            idconnect:null,
            tmp:[],
            newanal:false,
            numanal:'',
        }
    },
    methods: {
        getUserConnected() {
            let user = localStorage.getItem('user')
            user = JSON.parse(user)
            this.idconnect = user[0].id_user
        },
        setDate (date) {
         return moment(date).format('Do MMMM YYYY ')
        },
        filteredKeys () { 
            if (this.search===''){ this.getExam() }
            else{
               this.tmp = this.items.filter(element=>element.nom_examen.toLowerCase().includes(this.search.toLowerCase())||
               element.Type_Analyse.libelle_type.toLowerCase().includes(this.search.toLowerCase()) )   
            }
        },
        next(){
            this.$refs.form.validate()
            if(this.valid){
                if(this.btnTitle=='suivant'){ this.step++, this.getAllAnalyse() }else {this.updatePat()}
            }else{this.isvalid=true}
        },

        next2(){ this.$refs.form3.validate(); if(this.valid3){ this.step++, this.getExam() }else{this.isvalid3=true} },

        clearform(){this.$refs.form.resetValidation(), this.isvalid=false, this.getAll(), this.selected=[], this.btnTitle='suivant', this.iconTitle='fa-chevron-circle-right'},

        close(){ 
            if (this.btnTitle==='suivant') {
                if(!this.valid){this.$emit('close')}
                else if(this.valid && !this.valid3){ this.$refs.form.reset(); this.getAll(), this.btnTitle='suivant', this.iconTitle='fa-chevron-circle-right', this.step=1, this.$emit('close')} 
                else if(this.valid && this.valid3 && this.analyses.length>=0){ this.analyses=[], this.sel=[], this.$refs.form.reset(); this.$refs.form3.reset(), this.getAll(), this.btnTitle='suivant', this.iconTitle='fa-chevron-circle-right', this.step=1, this.$emit('close')} 
                else { this.$refs.form.reset(); this.$refs.form3.reset(), this.getAll(), this.btnTitle='suivant', this.iconTitle='fa-chevron-circle-right', this.step=1, this.$emit('close')}         
            } else if (this.btnTitle==='Modifier') {
                this.$emit('close'), this.$refs.form.reset(), this.btnTitle='suivant', this.iconTitle='fa-chevron-circle-right'
            }},

        getExam(){service.getAll() .then((res)=>{this.items=res.data.examens, this.tmp=this.items})},

        setItem(value){ this.analyses.push(value.id_examen) },

        delItem(value){ this.analyses.splice(this.analyses.indexOf(value.id_examen), 1) },

        async getAll(){
            await PatientService.getAll()
            .then((res)=>{ 
                this.patients = res.data.Patients
                if (this.patients.length<= 0){
                    this.numero= '0001E'
                }else {
                    var max  = this.patients[this.patients.length - 1].numero
                    var reference = ''
                    var number = ''
                    for(var i=0;i<max.length;i++){
                        if(isNaN(max[i])){
                            reference+=max[i]
                        }else{
                            number+=max[i]
                        }
                    }
                    const num = parseInt(number)+1
                    this.numero=(num<1000)?(num<100)?(num<10) ? '000'+num+reference : '00'+num+reference : '0'+num+reference : num+reference
                }
            })
        },

        async getAllAnalyse(){
            await analyseService.getAll()
            .then((res)=>{ 
                const analyses = res.data.analyses
                if (analyses.length<= 0){ this.num= 'A0001' }
                else {
                    var max  = analyses[analyses.length - 1].id; var reference = ''; var number = ''
                    for(var i=0;i<max.length;i++){ if(isNaN(max[i])){ reference+=max[i] }else{ number+=max[i] } }
                    const num = parseInt(number)+1
                    this.num=(num<1000)?(num<100)?(num<10) ? reference+'000'+num : reference+'00'+num : reference+'0'+num : reference+num
                    this.numanal=(num<1000)?(num<100)?(num<10) ? reference+'000'+num : reference+'00'+num : reference+'0'+num : reference+num
                }
            })
        },

        async AjoutPatients(){
            this.alert = true
            this.$refs.form.validate()
            if (this.valid) {
                await PatientService.create({
                    numero:this.numero, id: this.num, nom:this.nom, sexe:this.genre,  
                    age:this.age, adresse: this.adress, contact: this.contact, id_user:this.idconnect, 
                    service:this.service, id_prescripteur: this.$refs.cbxpre.getId(), date: this.setDate(new Date())
                }).then((res) => {
                    if(res.data.error){ this.alertMsg = res.data.error; this.typeAlert = 'error'; setTimeout(() => { this.alert = false}, 3000) }
                    else{this.alertMsg = res.data.succee; this.typeAlert = 'success'; setTimeout(()=>{ this.addAnalyse(), this.getAll()}, 1000)
                        setTimeout(() => { this.close(); this.alert = false}, 3000); 
                    }
                })
                .catch((err) => { console.log(err) });
            }
        },

        async updatePat(){
            await PatientService.update({ nom:this.nom, adresse:this.adress, age:this.age, sexe:this.genre, contact:this.contact },this.select)
            .then(res=>{
                this.alert=true
                this.alertMsg=res.data.succee
                this.$refs.form.reset()
                this.$emit('close')
                setTimeout(()=>{this.alert=false}, 3000)
            })
            .catch(err=>{console.log(err)})
        },

        async addAnalyse(){
            this.analyses.forEach(element => {
                Analyse.create({ id: this.num, id_examen: element, })
                .then(()=>{ this.getAll();})
                .catch((err)=>{ console.log(err) }) 
            })
        },

        add(){
            this.$refs.form3.validate()
            if(this.newanal==true){
                this.addnewanalyse()
            }else{
                this.AjoutPatients()
            }
        },

        edit(update){
        this.select = update.numero
        this.numero = update.numero,
        this.nom = update.nom,
        this.adress = update.adresse,
        this.age = update.age,
        this.genre = update.sexe,
        this.contact = update.contact,
        this.iconTitle = 'fa-edit',
        this.btnTitle ='Modifier'
        },

        newAnalyse(update){
            this.step=2
            this.numpat=update.numero
            this.nom=update.nom
            this.newanal=true
            this.getAllAnalyse()
        },
        async addnewanalyse(){
            if (this.valid3) {
                await analyseService.create({
                    numero:this.numpat, id: this.num, id_user:this.idconnect, 
                    service:this.service, id_prescripteur: this.$refs.cbxpre.getId(), date: this.setDate(new Date())
                }).then((res) => {
                    if(res.data.error){ this.alert = true, this.alertMsg = res.data.error; this.typeAlert = 'error' }
                    else{
                        actionService.create({
                            text: ` ajoutée un noveau analyse numéro ${this.num} du patient ${this.nom}.`,
                            id_user: this.idconnect,
                        });
                        this.alert = true, this.alertMsg = res.data.succee; this.typeAlert = 'success'; setTimeout(()=>{
                        this.analyses.forEach(element => {
                        Analyse.create({ id: this.numanal, id_examen: element, })
                        .then(()=>{ this.getAll(); this.$emit('close')})
                        .catch((err)=>{ console.log(err) }) 
                    });
                    }, 1000)
                    this.numpat=''; this.step=1; this.newanal=false; this.$refs.form3.reset() }
                    setTimeout(() => { this.alert = false }, 3000);
                })
                .catch((err) => { console.log(err) });
            }
        },
    },
    computed: {
        dialog(){return this.active},
        examenAll(){return this.tmp}
    },
    mounted() {
        this.getAll()
        this.getUserConnected()
    },
}
</script>