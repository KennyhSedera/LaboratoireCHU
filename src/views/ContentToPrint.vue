<template>
    <div id="app" style="margin-left: 50px; margin-right: 50px;">
        <div color="transparent" class="border" style="padding: 5px; margin-top:50px;">
            <v-row class="ma-2">
                <v-col class="mx-auto">
                    <div color="transparent" class=" text border" style="padding: 2px;">
                        <b>
                            <div class="text"
                                style="position:relative; left:75px; top:2px; color:black"> CHU de
                                Fianarantsoa</div>
                            <div style="position:relative; left:110px; bottom:2px; color:black">
                                Tambohobe </div>
                        </b>
                    </div>
                </v-col>
                <v-col class="mx-auto"><b><span
                            style="position:relative; left:48px; top:2px">REPOBLIKAN'I
                            MADAGASIKARA</span><br>
                        <div style="position:relative; left:34px; "> Fitiavana - Tanindrazana -
                            Fandrosoana</div>
                        <div style="position:relative; left:68px; bottom:2px">Ministère de la Santé
                            Publique </div>
                    </b></v-col>
            </v-row>
        </div>
        <v-card-actions><b>Services des Laboratoires</b></v-card-actions>
        <div color="transparent" class="border">
            <v-card-actions>
                <v-col>
                    <div><b style="color:black; position:relative; right:5px">Num Quitance:
                        </b>{{numqutance}}</div><br>
                    <div><b style="color:black; position:relative; right:5px">Age: </b> {{age}}
                        ans</div><br>
                    <div><b style="color:black; position:relative; right:5px">Adresse: </b>
                        {{adress}}</div>
                </v-col>
                <v-col>
                    <div><b style="color:black; position:relative; right:5px">Num Analyse: </b>{{numanalyse}}
                    </div><br>
                    <div><b style="color:black; position:relative; right:5px">Nom: </b>{{nom}}
                    </div><br>
                    <div><b style="color:black; position:relative; right:5px">Sexe: </b>
                        {{sexe}}</div>
                </v-col>
                <v-col>
                    <div outlined class="mr-6"><b
                            style="color:black; position:relative; right:5px">Num Patient:
                        </b>{{numpat}}</div><br>
                    <div class="mr-6"><b style="color:black; position:relative; right:5px">Service: </b>
                        <span class="text-uppercase">{{service}}</span></div><br>
                    <div class="mr-6"><b style="color:black; position:relative; right:5px">Prescripteur:
                        </b>{{prescripteur}}</div>
                </v-col>
            </v-card-actions>
        </div>
        <table class="elevation-3 white" fixed-header max-height="300px">
            <thead>
                <tr>
                    <th class="text-left"> Examen </th>
                    <th class="text-left"> Valeur de référence </th>
                    <th class="text-left"> Valeur de résultat </th>
                </tr>
            </thead>
            <tbody>
                <tr><b>Biochimie :</b></tr>
                <tr v-for="item in examens" :key="item.id_list">
                    <td v-if="item.Examen.id_type==1">{{ item.Examen.nom_examen }}</td>
                    <td v-if="item.Examen.id_type == 1">{{ item.valeur_ref }}</td>
                    <td v-if="item.Examen.id_type == 1">{{ item.valeur_res }}</td>
                </tr>
                
                <tr style="margin-top:20px;"><b>Hematologie :</b></tr>
                <tr v-for="item in examens" :key="item.id_list">
                    <td v-if="item.Examen.id_type==2">{{ item.Examen.nom_examen }}</td>
                    <td v-if="item.Examen.id_type == 2">{{ item.valeur_ref }}</td>
                    <td v-if="item.Examen.id_type == 2">{{ item.valeur_res }}</td>
                </tr>

                <tr style="margin-top:20px;"><b>Parasitologie :</b></tr>
                <tr v-for="item in examens" :key="item.id_list">
                    <td v-if="item.Examen.id_type==3">{{ item.Examen.nom_examen }}</td>
                    <td v-if="item.Examen.id_type == 3">{{ item.valeur_ref }}</td>
                    <td v-if="item.Examen.id_type == 3">{{ item.valeur_res }}</td>
                </tr>

                <tr style="margin-top:20px;"><b>Bacteriologie :</b></tr>
                <tr v-for="item in examens" :key="item.id_list">
                    <td v-if="item.Examen.id_type==4">{{ item.Examen.nom_examen }}</td>
                    <td v-if="item.Examen.id_type==4">{{ item.Examen.nom_examen }}</td>
                    <td v-if="item.Examen.id_type == 4">{{ item.valeur_ref }}</td>
                </tr>

                <tr style="margin-top:20px;"><b>Immunologie :</b></tr>
                <tr v-for="item in examens" :key="item.id_list">
                    <td v-if="item.Examen.id_type == 5">{{ item.valeur_ref }}</td>
                    <td v-if="item.Examen.id_type == 5">{{ item.valeur_res }}</td>
                    <td v-if="item.Examen.id_type == 5">{{ item.valeur_res }}</td>
                </tr>
            </tbody>
        </table>
        <v-card-actions class="">
            <img :src="qrcode" class="border"
                style="width:100px; height:100px; position:relative;top:-1px;" />
            <v-spacer />
            <div style="color:black; position:relative; top:-20px">
                <b style="color:black; position:relative; right:5px"> Fianarantsoa, le</b> {{ setDate(
                    date) }}
            </div>
        </v-card-actions>
    </div>
</template>

<script>
import listservice from '@/services/ListeService'
import analyseservice from '@/services/analyseService'
import moment from 'moment'

export default {
    data() {
        return {
            numqutance: '',
            service: '',
            prescripteur: '',
            qrcode: '',
            numpat: '',
            numanalyse: '',
            nom: '',
            age: '',
            sexe: '',
            adress: '',
            phone: '',
            valref: '',
            valres: '',
            examen: '',
            date: new Date(),
            examens:[],
        }
    },
    methods: {
        setDate(date) {
            return moment(date).format('Do MMMM YYYY ')
        },
        async getAnalyse(data) {
            this.getExamen(data)
            await analyseservice.getOne(data)
            .then(res => {
                this.analyses = res.data
                this.numanalyse = res.data[0].id
                this.numqutance = res.data[0].num_quitance
                this.service = res.data[0].service
                this.prescripteur = res.data[0].Prescripteur.nom_prescripteur
                this.date = res.data[0].createdAt
                this.qrcode = res.data[0].qrcode
                this.nom = res.data[0].Patient.nom
                this.age = res.data[0].Patient.age
                this.sexe = res.data[0].Patient.sexe
                this.adress = res.data[0].Patient.adresse
                this.phone = res.data[0].Patient.contact
                this.numpat = res.data[0].Patient.numero
            }).catch(err => {
                console.log(err)
            })
        },
        async getExamen(data) {
            await listservice.getAll(data)
                .then(res => {
                    this.examens = res.data
                }).catch(err => {
                    console.log(err)
                })
        },
    },
    mounted() {
    },
    props: ['data', 'open'],
    computed: {
        dialog() {
            return this.open
        }
    },
    components: {
    },
}
</script> 
<style scoped>
.border {
    border: 2px solid black !important;
}

.text {
    position: relative;
    top: 5px;
    bottom: 5px;
    left: 5px;
    right: 5px
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}
#app {
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>