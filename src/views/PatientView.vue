<template>
    <v-container fluid>
        <v-toolbar :color="!$vuetify.theme.dark ? 'green darken-3' : 'grey darken-3'">
            <v-btn v-if="$vuetify.breakpoint.mdAndUp" color="primary" @click="add = true"
                class="ml-2 text-capitalize font-weight-black" large>
                Nouveau <v-icon class="ml-2">mdi-account-plus</v-icon>
            </v-btn>
            <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
            <span class="font-weight-black white--text text-h4 ml-4"><span
                    class="ml-1 primary--text text-h2 font-weight-black">P</span>atients</span>
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
                    <v-card-text class="px-md-12" style="max-height:465px;">
                        <v-simple-table class="elevation-3">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left font-weight-bold text-body-1">Numéro</th>
                                        <th class="text-left font-weight-bold text-body-1">Nom</th>
                                        <th class="text-left font-weight-bold text-body-1">Age</th>
                                        <th class="text-left font-weight-bold text-body-1">Genre</th>
                                        <th class="text-left font-weight-bold text-body-1">Adresse</th>
                                        <th class="text-left font-weight-bold text-body-1">Contact</th>
                                        <th class="text-center font-weight-bold text-body-1">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in props.items" :key="item.numero">
                                        <td><v-chip color="primary">{{ item.numero }}</v-chip></td>
                                        <td>{{ item.nom }}</td>
                                        <td>{{ item.age }} Ans</td>
                                        <td>{{ item.sexe }}</td>
                                        <td>{{ item.adresse }}</td>
                                        <td>{{ item.contact }}</td>
                                        <td class="text-center">
                                            <v-icon small class="red--text" @click="deleteItem(item)">fa-trash</v-icon>
                                            <v-icon small class="primary--text ml-2 mt-1"
                                                @click="editItem(item)">fa-edit</v-icon>
                                            <v-icon small class="primary--text ml-2 mt-0"
                                                @click="newItem(item)">mdi-plus-circle</v-icon>
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
            <div v-else class="text-center text-h5 font-weight-bold mt-16"> Aucun patient enregistrer.</div>
        </v-card>
        <newpatient :active="add" @close="add = false; getAll()" ref="form" />
        <deleteDialog :open="del" :message="delMsg" @close="del = false" @accept="delPatient()" />
        <alertMessage :active="alert" :Message="alertMsg" :type="typeAlert" />
    </v-container>
</template>
<script>
import actionService from '@/services/actionService'
import PatientService from '@/services/PatientService'
import newpatient from '@/components/addPatient'
import deleteDialog from '@/components/deleteDialog'
import alertMessage from '@/components/alertMessage'

export default {
    components: { newpatient, deleteDialog, alertMessage, },
    data() {
        return {
            add: false,
            del: false,
            delMsg: '',
            alert: false,
            alertMsg: '',
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
            idconnect: null,
            roleId: null,
            nompat: '',
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
            await PatientService.getAll()
                .then((res) => {
                    this.items = res.data.Patients
                }).catch((err) => {
                    console.log(err)
                });
        },
        editItem(data) {
            this.add = true
            this.$refs.form.edit(data)
        },
        deleteItem(data) {
            this.del = true
            this.delMsg = `Voulez-vous supprimer vraiment "${data.nom}" ?`
            this.patselect = data.numero
            this.nompat = data.nom
        },
        delPatient() {
            actionService.create({
                text: ` supprimée le patient ${this.nompat}.`,
                id_user: this.idconnect,
            });
            PatientService.delete(this.patselect)
                .then((res) => {
                    this.del = false, this.patselect = '', this.$refs.form.getAll(), this.getAll()
                    this.alert = true, this.alertMsg = res.data.succee, setTimeout(() => { this.alert = false }, 3000)
                }).catch((err) => {
                    console.log(err)
                });
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
    },
    mounted() {
        document.title = this.$route.meta.title || "Laboratoire d'analyse"
        this.getAll(); this.$refs.form.getAll()
        this.getUserConnected()
        if (this.roleId != 5 && this.roleId != 3) {
            alert('Vous n\'êtes pas d\'accée à cette page.')
            window.history.back()
        }
    },
}
</script>