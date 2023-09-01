<template>
    <v-container fluid class="fill-height fill-width">
        <v-toolbar :color="!$vuetify.theme.dark?'green darken-3':'grey darken-3'">
            <v-icon @click="$router.push({path:'/analyse'})"  class="mr-2" >mdi-arrow-left-circle</v-icon>
            <v-spacer></v-spacer>
            <span class="font-weight-black white--text text-h4 ml-4"><span class="ml-1 primary--text text-h2 font-weight-black">A</span>nalyse</span>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-row class=" pa-1">
            <v-col 
                :class="$vuetify.theme.dark?'pa-4 mt-4 darktrue':'pa-4 mt-4 darkfalse'" 
                style="height:510px;"
                cols="4" md="4"
            >
                <div>
                    <div>Numero  : {{ numpat }}</div>
                    <div>Nom     : {{nom}}</div>
                    <div>Age     : {{age}} ans</div>
                    <div>Adresse : {{adress}}</div>
                    <div>Genre   : {{sexe}}</div>
                    <div>Contact : {{phone}}</div>
                </div>
                <v-row class="pa-0 mt-6">
                    <v-col v-for="i in examens" :key="i.id_list" cols="6">
                        <v-card @click="selectItem(i)" class="py-1 text-center" :color="i.valeur_res ? 'success' : 'grey darken-3'">
                            {{ i.Examen.nom_examen }}
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col class="" cols="8" md="8">
                <v-row class="ma-2">
                    <v-col cols="8">
                        <div class="d-flex">Numero analyse: {{numanalyse}} <v-spacer />Service: {{ service }} </div>
                        <div class="d-flex"> Numero quittance: {{ numqutance }}<v-spacer /> Prescripteur: {{ prescripteur }}</div>
                    </v-col>
                    <v-col cols="4" class="text-center">
                        <v-btn class="text-capitalize success" @click="generatePDF()">Imprimer <v-icon class="ml-2">mdi-printer</v-icon></v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-2 pa-2">
                    <v-col cols="12" md="8" :class="$vuetify.theme.dark?'darktrue':'darkfalse'">
                        <div class="mb-2 text-center">Examens</div>
                        <v-simple-table class="elevation-3" fixed-header max-height="300px">
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left"> Examen </th>
                                    <th class="text-left"> Valeur de référence </th>
                                    <th class="text-left"> Valeur de résultat </th>
                                    <th class="text-left"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in examens" :key="item.id_list" >
                                    <td>{{ item.Examen.nom_examen }}</td>
                                    <td>{{ item.valeur_ref }}</td>
                                    <td>{{ item.valeur_res }}</td>
                                    <td><v-icon small class="primary--text"  @click="selectItem(item)" >fa-edit</v-icon></td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                        <v-row class="mt-2 mx-1">
                            <v-card :img="qrcode" width="80px" height="80px"/>
                            <v-spacer></v-spacer>
                            <nav>le, {{ setDate(date) }}</nav>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="text-center mb-2">{{ examen? examen:'Nom' }}</div>
                        <v-form v-model="valid" ref="form">
                            <v-text-field solo label="Valeur de référence ..." placeholder="Valeur de référence ..." v-model="valref" />
                            <v-text-field solo label="Valeur de résultat ..." placeholder="Valeur de résultat ..." :rules="[v => !!v || 'Champ vide!']" v-model="valres" />
                            <v-btn block class="primary text-capitalize" @click="addResultat">Enregistrer</v-btn>
                        </v-form>
                    </v-col>
                </v-row>
                
            </v-col>
        </v-row>
        <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="false" :preview-modal="true"
            :paginate-elements-by-height="1400" filename="resultat" :pdf-quality="2" :manual-pagination="false"
            pdf-format="a4" pdf-orientation="portrait" pdf-content-width="800px" @progress="onProgress($event)"
            ref="html2Pdf">
            <ContentToPrint ref="referencepdf" slot="pdf-content" />
        </vue-html2pdf>
        <alertMessage :active="alert" :Message="alertMsg" :type="success"/>
        <v-dialog transition="dialog-bottom-transition" width="300" v-model="progressdialog" >
            <v-progress-linear v-model="progress" color="blue-grey" height="25" >
                <template v-slot:default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                </template>
            </v-progress-linear>
        </v-dialog>
    </v-container>
</template>
<script>
import moment from 'moment'
import listservice from '@/services/ListeService'
import analyseservice from '@/services/analyseService'
import alertMessage from '@/components/alertMessage'
import VueHtml2pdf from "vue-html2pdf";
import ContentToPrint from "./ContentToPrint";

export default {
    props:['num'],
    data(){return{
        valid:true,
        tableau:true,
        progressdialog:false,
        valref:'',
        valres:'',
        examen:'',
        examens:[],
        analyses:[],
        numanalyse:'',
        nom:'',
        age:'',
        sexe:'',
        adress:'',
        phone:'',
        selected:null,
        alert:false,
        alertMsg:'',
        success:'success',
        numqutance:'',
        service:'',
        prescripteur:'',
        date:'',
        qrcode:'',
        numpat:'',
        progress:0,
    }},
    computed:{

    },
    components: {
        alertMessage,
        VueHtml2pdf,
        ContentToPrint,
    },
    methods:{
        setDate (date) {
         return moment(date).format('Do MMMM YYYY ')
        },
        selectItem(data){
            this.examen=data.Examen.nom_examen
            this.valref=data.valeur_ref
            this.valres=data.valeur_res
            this.selected=data.id_list
        },
        addResultat(){
            this.$refs.form.validate()
            this.alert=true
            if(this.valid){
                listservice.addResultat(this.selected, {valeur_ref:this.valref, valeur_res:this.valres})
                .then(res=>{
                    this.alertMsg=res.data.succee
                    this.$refs.form.reset()
                    this.examen=''
                    setTimeout(()=>{this.alert=false, this.getExamen(this.numanalyse)}, 3000)
                })
            }
        },
        selectAnalyse(data){
            this.numanalyse=data.id
            this.numqutance=data.num_quitance
            this.service=data.service
            this.prescripteur=data.Prescripteur.nom_prescripteur
            this.date=data.createdAt
            this.qrcode=data.qrcode
        },
        async getExamen(data){
            await listservice.getAll(data)
            .then(res=>{
                this.examens=res.data
            }).catch(err=>{
                console.log(err)
            })
        },
        async getAnalyse(){
            await analyseservice.getOne(this.num)
            .then(res=>{
                this.analyses=res.data
                this.numanalyse=res.data[res.data.length -1].id
                this.numqutance=res.data[res.data.length -1].num_quitance
                this.service=res.data[res.data.length -1].service
                this.prescripteur=res.data[res.data.length -1].Prescripteur.nom_prescripteur
                this.date=res.data[res.data.length -1].createdAt
                this.qrcode=res.data[res.data.length -1].qrcode
                this.getExamen(res.data[res.data.length -1].id)
                this.nom = res.data[res.data.length -1].Patient.nom
                this.age = res.data[res.data.length -1].Patient.age
                this.sexe = res.data[res.data.length -1].Patient.sexe
                this.adress = res.data[res.data.length -1].Patient.adresse
                this.phone = res.data[res.data.length -1].Patient.contact
                this.numpat = res.data[res.data.length -1].Patient.numero
            }).catch(err=>{
                console.log(err)
            })
        },
        onProgress(event) {
            this.progress = event
            if (this.progress == 100) {
                this.progressdialog = false
                setTimeout(this.progress = 0 , 1000)
            }
        },
        generatePDF() {
            this.progressdialog = true
            this.$refs.referencepdf.getAnalyse(this.num)
            setTimeout(() => {
                this.$refs.html2Pdf.generatePdf();
            }, 1000);
        },
    },
    mounted(){
        document.title = `Analyse ${this.num}`
        this.getAnalyse()
    }
}
</script>
<style>
.darktrue { 
    border-right:2px solid white;
}
.darkfalse { 
    border-right:2px solid black;
}
</style>