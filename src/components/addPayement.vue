<template>
    <div>
        <v-dialog v-model="dialog" width="550" persistent transition="dialog-transition">
            <v-card :class="$vuetify.theme.dark?'grey darken-4':''">
                <v-row flat class="mx-1 mt-1 py-2 mb-1" color="rgba(0, 0, 0, 0)">
                    <span class="ml-4 text-h6 font-weight-bold">Droit d'analyse.</span>
                    <v-spacer />
                </v-row>
                <v-row class="mx-1">
                    <v-col v-for="i in items" :key="i.id_list" cols="6">
                        <v-card class="pa-2 text-center success">
                            {{ i.Examen.nom_examen }}
                        </v-card>
                    </v-col>
                </v-row>
                <v-form v-model="valid" ref="form">
                    <v-row class="mx-1 mb-1 mt-2">
                        <v-col>
                            <v-text-field
                                solo
                                label="Numero quittance"
                                v-model="numQut"
                                prepend-inner-icon="mdi-book"
                                :rules="[v => !!v || 'Champ vide!']"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                solo
                                label="Prix total"
                                v-model="total"
                                suffix="Ar"
                                prepend-inner-icon="mdi-alpha-p-box"
                                :rules="[v => !!v || 'Champ vide!']"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
                <v-row class="mb-0 mx-1">
                    <v-col>
                        <v-spacer></v-spacer>
                        <v-btn block class="elevation-1 text-capitalize" @click="$emit('close'); reset()"> Annuler </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block class="elevation-1 text-capitalize blue white--text" @click="payer()">Payer</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <AlertMessage :active="alert" :type="typeAlert" :Message="alertMsg"/>
    </div>
</template>

<script>
import Service from '@/services/ListeService'
import ServicePaye from '@/services/analyseService'
import AlertMessage from '@/components/alertMessage.vue'
import actionService from '@/services/actionService'

export default {
    components: { AlertMessage },
    props: ['open', 'data'],
    computed: {
        dialog() { return this.open }
    },
    methods: {
        user() {
            let user = localStorage.getItem('user')
            user = JSON.parse(user)
            this.idconnect = user[0].id_user
        },
        async getAll(data) {
            this.idAnalyse = data
            this.total = null
            await Service.getAll(data)
                .then(res => {
                    this.items = res.data
                    this.somme()
                })
        },
        somme() {
            this.items.forEach(element => {
                this.total += element.Examen.code_prix
            })
        },
        reset() {
            this.$refs.form.reset()
        },
        async payer() {
            this.$refs.form.validate()
            if (this.valid) {
                this.alert = true
                await ServicePaye.payement({ payment: true, num_quitance: this.numQut }, this.idAnalyse)
                .then(res => {
                    actionService.create({
                        text: ` ajoutée le paiement de l'analyse numéro ${this.idAnalyse}.`,
                        id_user: this.idconnect,
                    });
                    this.typeAlert = "success"
                    this.alertMsg = res.data.succee
                    this.reset()
                    setTimeout(() => {
                        this.$emit('close')
                        this.alert = false
                    }, 2000);
                })
                .catch(err => {
                    this.typeAlert = "error"
                    this.alertMsg = err.data.error
                    setTimeout(() => {
                        this.alert = false
                    }, 2000);
                })
            }
        },
    },
    mounted() {
        this.user()
    },
    data() {
        return {
            username: '',
            img: '',
            items:[],
            numQut: '',
            total: null,
            idconnect: null,
            idAnalyse: '',
            valid:true,
            alert: false,
            alertMsg: '',
            typeAlert: 'success',
        }
    },
}
</script>