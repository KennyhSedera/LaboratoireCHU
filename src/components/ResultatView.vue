<template>
    <div>
        <v-dialog v-model="dialog" width="800px" persistent transition="dialog-transition">
            <v-card class="mx-auto">
                <v-app-bar :class="$vuetify.theme.dark ? 'grey' : 'light-green accent-2'">
                    <v-spacer></v-spacer>
                    <span class="font-weight-black black--text text-h5 text-uppercase">Resultat d'analyse</span>
                    <v-spacer></v-spacer>
                    <v-icon @click="generatePDF()" color="black">fa-download</v-icon>
                    <v-icon class="mx-4" @click="printPDF()" color="black">mdi-printer</v-icon>
                    <v-icon @click="$emit('close')" color="error">fa-window-close</v-icon>
                </v-app-bar>

                <v-container>
                    <v-card height="508" color="transparent" outlined class="overflow-auto">
                        <v-card color="transparent" class="text-center border my-2">
                            <v-row class="ma-1">
                                <v-col class="mx-auto">
                                    <v-card color="transparent" class="border pa-1">
                                        <div class="font-weight-black"> CHU de Fianarantsoa<br> Tambohobe </div>
                                    </v-card>
                                </v-col>
                                <v-col class="mx-auto"><span class="text-uppercase font-weight-black">repoblikan'i
                                        Madagasikara</span><br>
                                    <div class="font-weight-black"> Fitiavana - Tanindrazana - Fandrosoana <br> Ministère de
                                        la Santé Publique </div>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-card-actions>
                            <div class="font-weight-black">Services des Laboratoires</div>
                        </v-card-actions>
                        <v-card color="transparent" class="border" v-for="patient in patients" :key="patient">
                            <v-card-actions>
                                <v-col>
                                    <span class="font-weight-black">Num Quitance: </span>{{ patient.Num_Quitance }} <br>
                                    <span class="font-weight-black">Age: </span> {{ patient.Age }} ans <br>
                                    <span class="font-weight-black">Adresse: </span> {{ patient.Adresse }}
                                </v-col>
                                <v-col>
                                    <span class="font-weight-black">Nom: </span>{{ patient.Nom }} <br>
                                    <span class="font-weight-black">Sexe: </span> {{ patient.Sexe }}
                                </v-col>
                                <v-col>
                                    <span class="font-weight-black">Numero: </span>{{ patient.Numero }}<br>
                                    <span class="font-weight-black">Service: </span> <span
                                        class="text-uppercase">{{ patient.Service }}</span><br>
                                    <span class="font-weight-black">Prescripteur: </span>
                                    {{ patient.Prescripteur.Nom_Prescripteur }}
                                </v-col>
                            </v-card-actions>
                        </v-card>
                        <v-data-iterator :items="items" :sort-by="sortBy.toLowerCase()" :page.sync="page"
                            hide-default-footer>
                            <template v-slot:default="props">
                                <v-divider class="mt-2" />
                                <v-simple-table fixed-header max-height="385" :search="search">
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left font-weight-black text-subtitle-1 text-uppercase">
                                                    Examens </th>
                                                <th class="text-center font-weight-black text-subtitle-1 text-uppercase">
                                                    Resultat </th>
                                                <th class="text-center font-weight-black text-subtitle-1 text-uppercase">
                                                    Valeur de reference </th>
                                            </tr>
                                        </thead>
                                        <tbody v-for="group in groups" :key="group.id">
                                            <span v-if="group.Examen.id_TypeAnalyse === 1" class="font-weight-black">
                                                BIOCHIMIE </span>
                                        </tbody>
                                        <tbody v-for="item in props.items" :key="item.id">
                                            <tr v-if="item.Examen.id_TypeAnalyse === 1">
                                                <td class="text-left text-subtitle-1">{{ item.Examen.Nom_Examen }}</td>
                                                <td class="text-center">{{ item.Valeur_Res }} {{ item.Examen.Unite }}</td>
                                                <td class="text-center">{{ item.Valeur_Ref }} {{ item.Examen.Unite }}</td>
                                            </tr>
                                        </tbody>
                                        <tbody v-for="group in groups" :key="group.id">
                                            <span v-if="group.Examen.id_TypeAnalyse === 2" class="font-weight-black">
                                                HEMATOLOGIE </span>
                                        </tbody>
                                        <tbody v-for="item in props.items" :key="item.id">
                                            <tr v-if="item.Examen.id_TypeAnalyse === 2">
                                                <td class="text-left text-subtitle-1">{{ item.Examen.Nom_Examen }}</td>
                                                <td class="text-center">{{ item.Valeur_Res }} {{ item.Examen.Unite }}</td>
                                                <td class="text-center">{{ item.Valeur_Ref }} {{ item.Examen.Unite }}</td>
                                            </tr>
                                        </tbody>
                                        <tbody v-for="group in groups" :key="group.id">
                                            <span v-if="group.Examen.id_TypeAnalyse === 3"
                                                class="font-weight-black">PARASITOLOGIE</span>
                                        </tbody>
                                        <tbody v-for="item in props.items" :key="item.id">
                                            <tr v-if="item.Examen.id_TypeAnalyse === 3">
                                                <td class="text-left text-subtitle-1">{{ item.Examen.Nom_Examen }}</td>
                                                <td class="text-center">{{ item.Valeur_Res }} {{ item.Examen.Unite }}</td>
                                                <td class="text-center">{{ item.Valeur_Ref }} {{ item.Examen.Unite }}</td>
                                            </tr>
                                            <!-- <v-divider></v-divider> -->
                                        </tbody>
                                        <tbody v-for="group in groups" :key="group.id">
                                            <span v-if="group.Examen.id_TypeAnalyse === 4"
                                                class="font-weight-black">BACTERIOLOGIE</span>
                                        </tbody>
                                        <tbody v-for="item in props.items" :key="item.id">
                                            <tr v-if="item.Examen.id_TypeAnalyse === 4">
                                                <td class="text-left text-subtitle-1">{{ item.Examen.Nom_Examen }}</td>
                                                <td class="text-center">{{ item.Valeur_Res }} {{ item.Examen.Unite }}</td>
                                                <td class="text-center">{{ item.Valeur_Ref }} {{ item.Examen.Unite }}</td>
                                            </tr>
                                            <!-- <v-divider></v-divider> -->
                                        </tbody>
                                        <tbody v-for="group in groups" :key="group.id">
                                            <span v-if="group.Examen.id_TypeAnalyse === 5"
                                                class="font-weight-black">IMMUNOLOGIE</span>
                                        </tbody>
                                        <tbody v-for="item in props.items" :key="item.id">
                                            <tr v-if="item.Examen.id_TypeAnalyse === 5">
                                                <td class="text-left text-subtitle-1">{{ item.Examen.Nom_Examen }}</td>
                                                <td class="text-center">{{ item.Valeur_Res }} {{ item.Examen.Unite }}</td>
                                                <td class="text-center">{{ item.Valeur_Ref }} {{ item.Examen.Unite }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                                <v-divider />
                            </template>
                        </v-data-iterator>
                        <v-row class="ma-4">
                            <img v-for="patient in patients" :key="patient" :src="patient.Qrcode"
                                style="width:100px; height:100px; position:relative; left:15px;" />
                            <v-spacer />
                            <span class="font-weight-black mr-2"> Fianarantsoa, le</span> <span class="text-capitalize">{{
                                setDate(date) }}</span>
                        </v-row>
                    </v-card>
                </v-container>

                <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="false" :preview-modal="true"
                    :paginate-elements-by-height="1400" filename="Resultat" :pdf-quality="3" :manual-pagination="false"
                    pdf-format="a4" pdf-orientation="portrait" pdf-content-width="780px" @progress="onProgress($event)"
                    ref="print">
                    <section slot="pdf-content">
                        <div style="margin: 5px 50px; position:relative; top:30px">
                            <div color="transparent" class="border">
                                <v-row class="ma-2">
                                    <v-col class="mx-auto">
                                        <div color="transparent" class=" text border">
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
                                            </b>A001</div><br>
                                        <div><b style="color:black; position:relative; right:5px">Age: </b> 12
                                            ans</div><br>
                                        <div><b style="color:black; position:relative; right:5px">Adresse: </b>
                                            Isaha</div>
                                    </v-col>
                                    <v-col>
                                        <div><b style="color:black; position:relative; right:5px">Nom: </b>Randria
                                        </div><br>
                                        <div><b style="color:black; position:relative; right:5px">Sexe: </b>
                                           Homme</div>
                                    </v-col>
                                    <v-col>
                                        <div outlined class="mr-6"><b
                                                style="color:black; position:relative; right:5px">Numero:
                                            </b>0001E</div><br>
                                        <div class="mr-6"><b style="color:black; position:relative; right:5px">Service: </b>
                                            <span class="text-uppercase">Externe</span></div><br>
                                        <div class="mr-6"><b style="color:black; position:relative; right:5px">Prescripteur:
                                            </b> Dr. Rija</div>
                                    </v-col>
                                </v-card-actions>
                            </div>
                            <v-data-iterator :items="items" :sort-by="sortBy.toLowerCase()" :page.sync="page"
                                hide-default-footer>
                                <template v-slot:default="props">
                                    <v-divider class="mt-2" />
                                    <v-simple-table fixed-header>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th style="position:relative; right:20px; color:black"> <b>EXAMENS </b>
                                                    </th>
                                                    <th style="position:relative; right:10px; color:black"><b> RESULTAT </b>
                                                    </th>
                                                    <th style="position:relative; right:20px; color:black"><b> VALEUR DE
                                                            REFERENCE </b></th>
                                                </tr>
                                            </thead>

                                            <tbody v-for="group in groups" :key="group.id">
                                                <b v-if="group.Examen.id_TypeAnalyse === 1"> BIOCHIMIE </b>
                                            </tbody>
                                            <tbody v-for="item in props.items" :key="item.id">
                                                <tr v-if="item.Examen.id_TypeAnalyse === 1">
                                                    <td><b style="position:relative; left:5px; color:black">{{
                                                        item.Examen.nom_Examen }}</b></td>
                                                    <td><span style="position:relative; color:black">{{ item.valeur_Res }}
                                                            {{ item.Examen.Unite }}</span></td>
                                                    <td><span style="position:relative; left:50px; color:black">{{
                                                        item.valeur_Ref }} {{ item.Examen.Unite }}</span></td>
                                                </tr>
                                            </tbody>

                                            <tbody v-for="group in groups" :key="group.id">
                                                <b v-if="group.Examen.id_TypeAnalyse === 2"
                                                    style="position:relative; left:5px; color:black">HEMATOLOGIE</b>
                                            </tbody>
                                            <tbody v-for="item in props.items" :key="item.id">
                                                <tr v-if="item.Examen.id_TypeAnalyse === 2">
                                                    <td><b style="position:relative; left:5px; color:black">{{
                                                        item.Examen.Nom_Examen }}</b></td>
                                                    <td><span style="position:relative; color:black">{{ item.Valeur_Res }}
                                                            {{ item.Examen.Unite }}</span></td>
                                                    <td><span style="position:relative; left:50px; color:black">{{
                                                        item.Valeur_Ref }} {{ item.Examen.Unite }}</span></td>
                                                </tr>
                                            </tbody>

                                            <tbody v-for="group in groups" :key="group.id">
                                                <b v-if="group.Examen.id_TypeAnalyse === 3"
                                                    style="position:relative; left:5px; color:black">PARASITOLOGIE</b>
                                            </tbody>
                                            <tbody v-for="item in props.items" :key="item.id">
                                                <tr v-if="item.Examen.id_TypeAnalyse === 3">
                                                    <td><b style="position:relative; left:5px; color:black">{{
                                                        item.Examen.Nom_Examen }}</b></td>
                                                    <td><span style="position:relative; color:black">{{ item.Valeur_Res }}
                                                            {{ item.Examen.Unite }}</span></td>
                                                    <td><span style="position:relative; left:50px; color:black">{{
                                                        item.Valeur_Ref }} {{ item.Examen.Unite }}</span></td>
                                                </tr>
                                            </tbody>

                                            <tbody v-for="group in groups" :key="group.id">
                                                <b v-if="group.Examen.id_TypeAnalyse === 4"
                                                    style="position:relative; left:5px; color:black">BACTERIOLOGIE</b>
                                            </tbody>
                                            <tbody v-for="item in props.items" :key="item.id">
                                                <tr v-if="item.Examen.id_TypeAnalyse === 4">
                                                    <td><b style="position:relative; left:5px; color:black">{{
                                                        item.Examen.Nom_Examen }}</b></td>
                                                    <td><span style="position:relative; color:black">{{ item.Valeur_Res }}
                                                            {{ item.Examen.Unite }}</span></td>
                                                    <td><span style="position:relative; left:50px; color:black">{{
                                                        item.Valeur_Ref }} {{ item.Examen.Unite }}</span></td>
                                                </tr>
                                            </tbody>

                                            <tbody v-for="group in groups" :key="group.id">
                                                <b v-if="group.Examen.id_TypeAnalyse === 5"
                                                    style="position:relative; left:5px; color:black">IMMUNOLOGIE</b>
                                            </tbody>
                                            <tbody v-for="item in props.items" :key="item.id">
                                                <tr v-if="item.Examen.id_TypeAnalyse === 5">
                                                    <td><b style="position:relative; left:5px; color:black">{{
                                                        item.Examen.Nom_Examen }}</b></td>
                                                    <td><span style="position:relative; color:black">{{ item.Valeur_Res }}
                                                            {{ item.Examen.Unite }}</span></td>
                                                    <td><span style="position:relative; left:50px; color:black">{{
                                                        item.Valeur_Ref }} {{ item.Examen.Unite }}</span></td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                    <v-divider />
                                </template>
                            </v-data-iterator>
                            <v-card-actions>
                                <img v-for="patient in patients" :key="patient" :src="patient.Qrcode"
                                    style="width:110px; height:110px; position:relative;top:-7px; left:15px;" />
                                <v-spacer />
                                <div style="color:black; position:relative; right:15px; top:-20px">
                                    <b style="color:black; position:relative; right:5px"> Fianarantsoa, le</b> {{ setDate(
                                        date) }}
                                </div>
                            </v-card-actions>
                        </div>
                    </section>
                </vue-html2pdf>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
// import Service from '@/service/ListeService'
// import PatientService from '@/service/PatientService'
import moment from 'moment'
import VueHtml2pdf from "vue-html2pdf";


export default {
    data() {
        return {
            add: false,
            search: '',
            filter: {},
            page: 1,
            sortBy: 'TypeAnalyse.Nom_TypeAnalyse',
            keys: ['Nom_Examen'],
            items: [],
            patients: [],
            groups: [],
            total: 0,
            date: new Date()
        }
    },
    methods: {
        onProgress(event) {
            console.log(`Processed: ${event} / 100`);
        },
        generatePDF() {
            if (this.$vuetify.theme.dark === true) {
                this.$refs.html2Pdf.generatePdf();
                this.$vuetify.theme.dark = false;
                setTimeout(() => {
                    this.$vuetify.theme.dark = true;
                }, 1)
            } else return this.$refs.html2Pdf.generatePdf()
        },
        printPDF() {
            // if (this.$vuetify.theme.dark === true) {
            //     this.$refs.print.generatePdf();
            //     this.$vuetify.theme.dark = false;
            //     setTimeout(() => {
            //         this.$vuetify.theme.dark = true;
            //     }, 1)
            // } else return
            this.$refs.print.generatePdf();
        },

        setDate(date) {
            return moment(date).format('Do MMMM YYYY ')
        },

        // async getAll(id) {
        //     await Service.getAnalyse(id)
        //         .then(res => {
        //             this.items = res.data
        //         })
        // },

        // async getAllG(id) {
        //     await Service.ResultatGroupe(id)
        //         .then(res => {
        //             this.groups = res.data
        //             console.log(res.data)
        //         })
        // },

        // async getPatient(id) {
        //     await PatientService.getResultat(id)
        //         .then(res => {
        //             this.patients = res.data
        //         })
        // }
    },
    mounted() {
        // this.getAll(JSON.parse(this.data))
        // this.getAllG(JSON.parse(this.data))
        // this.getPatient(JSON.parse(this.data))
    },
    props: ['data', 'open'],
    computed: {
        dialog() {
            return this.open
        }
    },
    components: {
        VueHtml2pdf,
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


.v-btn--fab.v-btn--absolute.v-btn--top {
    top: -10px !important;
}

.v-btn--absolute.v-btn--left,

.v-btn--fixed.v-btn--left {
    left: 740px !important;
}</style>