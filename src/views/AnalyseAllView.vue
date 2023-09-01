<template>
    <v-container fluid>
        <v-toolbar :color="!$vuetify.theme.dark ? 'green darken-3' : 'grey darken-3'">
            <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
            <span class="font-weight-black white--text text-h4 ml-4"><span
                    class="ml-1 primary--text text-h2 font-weight-black">A</span>nalyses</span>
            <v-spacer></v-spacer>
            <v-col md="3" cols="7">
                <v-text-field class="mt-8 mr-2" solo v-model="search" append-icon="mdi-magnify" clearable
                    label="Recherche ..." />
            </v-col>
        </v-toolbar>

        <v-card class="transparent" outlined height="520">
            <v-btn style="position:sticky; top:600px; left:80%;" v-if="!$vuetify.breakpoint.mdAndUp" color="primary"
                @click="add = true" fab class="ml-2 text-capitalize font-weight-black">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-data-iterator hide-default-footer :items="items" :items-per-page.sync="itemsPerPage" :page.sync="page"
                :search="search" :sort-desc="sortDesc" v-if="items.length > 0">
                <template v-slot:default="props">
                    <v-card-text class="px-12" style="max-height:465px;">
                        <v-simple-table class="elevation-3">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left font-weight-bold text-body-1"></th>
                                        <th class="text-left font-weight-bold text-body-1">Numéro</th>
                                        <th class="text-left font-weight-bold text-body-1">Num Quttance</th>
                                        <th class="text-left font-weight-bold text-body-1">Patiens</th>
                                        <th class="text-left font-weight-bold text-body-1">Prescripteur</th>
                                        <th class="text-left font-weight-bold text-body-1">Service</th>
                                        <th class="text-left font-weight-bold text-body-1">Date</th>
                                        <th class="text-center font-weight-bold text-body-1">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in props.items" :key="item.id">
                                        <td>
                                            <v-icon v-if="item.payment && roleId==4" color="success">mdi-check-circle</v-icon>
                                            <v-icon v-if="!item.payment && roleId==4" color="error" @click="payementItem(item)">mdi-close-circle</v-icon>
                                            <v-icon v-if="item.validation && roleId==1" color="success">mdi-check-circle</v-icon>
                                            <v-icon v-if="!item.validation && roleId==1" color="error" @click="validItem(item)">mdi-close-circle</v-icon>
                                        </td>
                                        <td><v-chip color="primary">{{ item.id }}</v-chip></td>
                                        <td>{{ item.num_quitance }}</td>
                                        <td>{{ item.Patient.nom }}</td>
                                        <td>{{ item.Prescripteur.nom_prescripteur }}</td>
                                        <td>{{ item.service }}</td>
                                        <td>{{ setDate(item.createdAt) }}</td>
                                        <td class="text-center">
                                            <v-icon small class="red--text" @click="deleteItem(item)">fa-trash</v-icon>
                                            <v-icon v-if="item.validation == true " small class="grey--text ml-2" @click="selectItem(item)">fa-eye</v-icon>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </template>
                <template v-slot:footer>
                    <v-row class="mx-6">
                        <v-spacer />
                        <span class="mr-4 mt-2 grey--text font-weght-bold">
                            Page {{ page }} sur {{ numberOfPages }}
                        </span>
                        <v-btn color="blue darken-3" class="elevation-3 white--text mr-1 text-capitalize"
                            @click="formerPage">
                            <v-icon>mdi-chevron-left</v-icon> Précedent
                        </v-btn>
                        <v-btn color="blue darken-3" class="elevation-3 white--text ml-1 text-capitalize mr-6"
                            @click="nextPage">
                            Suivant <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>
            <div v-else class="text-center text-h5 font-weight-bold mt-16"> Aucun analyse enregistrer.</div>
        </v-card>
        <newanalyse :active="add" @close="add = false; getAll()" ref="form" />
        <deleteDialog :open="del" :message="delMsg" @close="del = false" @accept="delanalyse()" />
        <alertMessage :active="alert" :Message="alertMsg" :type="typeAlert" />
        <validateDialog :open="validateOpen" ref="validate" :message="validMsg" @close="validateOpen = false; getAll()" />
        <addPayement :open="payeOpen" ref="payment" @close="payeOpen = false; getAll()"/>
    </v-container>
</template>
<script>
import AnalyseService from '@/services/analyseService'
import newanalyse from '@/components/addPatient'
import deleteDialog from '@/components/deleteDialog'
import alertMessage from '@/components/alertMessage'
import validateDialog from '@/components/validateDialog'
import addPayement from '@/components/addPayement'
import moment from 'moment'

export default {
    components: { newanalyse, deleteDialog, alertMessage, validateDialog, addPayement },
    data() {
        return {
            payeOpen: false,
            validateOpen: false,
            add: false,
            del: false,
            delMsg: '',
            alert: false,
            alertMsg: '',
            validMsg: '',
            typeAlert: 'success',
            items: [],
            itemsPerPageArray: [8, 12],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 8,
            sortBy: 'nom',
            keys: ['nom', 'adresse', 'contact', 'numero', 'age', 'numero', 'sexe'],
            patselect: '',
            roleId:null,
        }
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.items.length / this.itemsPerPage)
        },
        filteredKeys() {
            return this.keys.filter(key => key !== 'Name')
        },
    },
    methods: {
        setDate(date) {
            return moment(date).format('DD - MM - YYYY ')
        },
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number
        },
        async getAll() {
            await AnalyseService.getAll()
                .then((res) => {
                    this.items = res.data.analyses
                }).catch((err) => {
                    console.log(err)
                });
        },
        deleteItem(data) {
            this.del = true
            this.delMsg = `Voulez-vous supprimer vraiment l'analyse numéro "${data.id}" ?`
            this.patselect = data.id
        },
        delanalyse() {
            AnalyseService.delete(this.patselect)
                .then((res) => {
                    this.del = false, this.patselect = '', this.$refs.form.getAll(), this.getAll()
                    this.alert = true, this.alertMsg = res.data.succee, setTimeout(() => { this.alert = false }, 3000)
                }).catch((err) => {
                    console.log(err)
                });
        },
        selectItem(data) {
            this.$router.push({ path: `/analyse/${data.id}` })
        },
        newItem(data) {
            this.add = true
            this.$refs.form.newAnalyse(data)
        },
        getUserConnected() {
            let user = localStorage.getItem('user')
            user = JSON.parse(user)
            this.idconnect = user[0].id_user
            this.roleId = user[0].id_role
        },
        validItem(data) {
            this.validateOpen = true
            this.$refs.validate.getId(data.id)
            this.validMsg = `Voulez-vous validée cette analyse numéro "${data.id}"`
        },
        payementItem(data) {
            this.payeOpen = true
            this.$refs.payment.getAll(data.id)
        },
    },
    mounted() {
        document.title = this.$route.meta.title || "Laboratoire d'analyse"
        this.getAll(); this.$refs.form.getAll()
        this.getUserConnected()
    },
}
</script>