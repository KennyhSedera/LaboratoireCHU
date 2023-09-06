<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="420px">
            <v-card :class="$vuetify.theme.dark ? '' : ''">
                <v-card-title class="text-h5 text-left py-2"> Validée ? </v-card-title>
                <div class=" text-center text-body-1 mt-4 mb-6 ">{{ message }}</div>
                <v-row class="mx-2 mb-0">
                    <v-col>
                        <v-btn block class="text-capitalize" @click="$emit('close')"> Annuler </v-btn>
                    </v-col>
                    <v-col>
                        <v-spacer></v-spacer>
                        <v-btn block color="primary" class="text-capitalize" @click="matSortie()"> Validée </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <alertMessage :active="alert" :Message="alertMsg" :type="typeAlert" />
    </v-row>
</template>
<script>
import analyseService from '@/services/analyseService'
import matService from '@/services/materielService'
import service from '@/services/ExamenService'
import ListeService from '@/services/ListeService'
import actionService from '@/services/actionService'
import alertMessage from '@/components/alertMessage'

export default {
    components: { alertMessage },
    props: ['open', 'message', 'data'],
    computed: {
        dialog() { return this.open }
    },
    data() {
        return {
            idconnect: '',
            id: '',
            examens: [],
            materiel: [],
            idExamens: [],
            sorties: [],
            ids: [],
            alert: false,
            alertMsg: '',
            typeAlert: 'error',
        }
    },
    methods: {
        getId(data) {
            this.id = data
            ListeService.getAll(this.id)
                .then((res) => {
                    this.idExamens.splice(0, this.idExamens.length)
                    this.examens = res.data
                    this.examens.forEach(el => this.idExamens.push(el.id_examen))
                    this.getmateriel()
                }).catch((err) => {
                    console.log(err)
                })
        },
        getmateriel() {
            this.materiel.splice(0, this.materiel.length)
            this.ids.splice(0, this.ids.length)
            this.idExamens.forEach(el =>
                service.getAllMat(el)
                .then(res => {
                    for (let index = 0; index < res.data.data.length; index++){
                        this.materiel.push({ id: res.data.data[index].id_materiel, quant: res.data.data[index].quantite_mat })
                        const id = this.ids.filter(el => el === res.data.data[index].id_materiel)
                        if (id!==[]) {
                            console.log(id);
                        } else {
                            this.ids.push(res.data.data[index].id_materiel)
                        }
                        if (index === res.data.data.length-1) {
                            this.materielctrl()
                        }
                    }
                })
            )
        },
        materielctrl() {
            console.log(this.ids);
            // this.materiel.forEach(el =>
            //     { for (let index = 0; index < this.materiel.length; index++) {
            //         const ids = this.materiel.filter(data => data.id== el.id)
            //         console.log(ids);
            //     }}
            // )
        },
        async matSortie() {
           this.materiel.forEach(el =>
                matService.sortie(el)
                    .then(res => {
                        if (res.data.error) {
                            this.alert = true
                            this.alertMsg = res.data.error
                            this.typeAlert = 'error'
                        }
                    })
            )
            setTimeout(() => { this.valide() }, 1000)
        },
        valide() {
            analyseService.validation(this.id)
                .then(res => {
                    actionService.create({
                        text: ` validée l'analyse numéro ${this.id}.`,
                        id_user: this.idconnect,
                    });
                    this.alert = true
                    this.alertMsg = res.data.succee
                    this.typeAlert = 'success'
                   
                    setTimeout(() => { this.$emit('close'), this.alert = false }, 3000)
                })
        },
        getUserConnected() {
            let user = localStorage.getItem('user')
            user = JSON.parse(user)
            this.idconnect = user[0].id_user
        },
    },
    mounted() {
        this.getUserConnected()
    },
}
</script>