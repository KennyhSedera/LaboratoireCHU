<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="550">
            <v-card>
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <v-icon class="red--text" style="position:absolute; left:94%; top:10px;" @click="close">mdi-close-circle</v-icon>
                        <v-card-title class="font-weight-bold">{{ title }} examen</v-card-title>
                        <v-form v-model="valid" ref="form">
                            <v-row class="ma-1 pa-1">
                                <v-col class="col-12 col-md-6">
                                    <cbxType ref="cbxtype"/>
                                    <v-text-field @input="prise=prix*2" v-model="prix" solo prepend-inner-icon="mdi-alpha-p-box" label="Tout public" :rules="[v=>!!v || 'Cette champ est vide !']"/>
                                </v-col>
                                <v-col class="col-12 col-md-6">
                                    <v-text-field v-model="libelle" solo prepend-inner-icon="mdi-tag" label="Libellé" :rules="[v=>!!v || 'Cette champ est vide !']"/>
                                    <v-text-field v-model="prise" readonly solo prepend-inner-icon="mdi-alpha-p-box" label="Prise en charge" :rules="[v=>!!v || 'Cette champ est vide !']"/>
                                </v-col>
                            </v-row>
                            <div v-if="btnTitle==='Suivant'" class="d-flex mt-n4 pb-3 justify-end">
                                <v-btn v-if="invalid" class="text-capitalize red px-4 mr-2" @click="clearform">Annuler<v-icon class="ml-2" small>fa-refresh</v-icon></v-btn>
                                <v-btn class="text-capitalize primary px-4 mr-6" :disabled="!valid" @click="suivant">{{ btnTitle }}<v-icon class="ml-2" small>{{ iconTitle }}</v-icon></v-btn>
                            </div>
                            <div v-else class="d-flex mt-n4 pb-3 justify-center">
                                <v-btn v-if="invalid" class="text-capitalize red px-4 mr-2" @click="clearform">Annuler<v-icon class="ml-2" small>fa-refresh</v-icon></v-btn>
                                <v-btn class="text-capitalize primary px-4 mr-6 col-md-4" :disabled="!valid" @click="suivant">{{ btnTitle }}<v-icon class="ml-2" small>{{ iconTitle }}</v-icon></v-btn>
                            </div>
                        </v-form>
                    </v-window-item>
                    <v-window-item :value="2">
                        <v-card-title class="font-weight-bold">Ajout matériel</v-card-title>
                        <v-form>
                            <v-row class="ma-1 py-1">
                                <v-col cols="12" md="5" class="">
                                    <v-form v-model="valid2" ref="form2">
                                    <cbxMat ref="cbxmat"/>
                                    <v-text-field solo v-model="qte" append-icon="mdi-send" @click:append="ajout" prepend-inner-icon="mdi-alpha-q-box" label="Quantité" :rules="[v=>!!v || 'Cette champ est vide !']"/>
                                    </v-form>
                                </v-col>
                                <v-col cols="12" md="7" class="">
                                    <v-row style="height:180px" class=" overflow-auto">
                                        <v-col md="6" v-for="item, i in matselected" :key="i">
                                            <v-card v-if="matselected.length>0" class="success pa-2">
                                               <v-icon class="mt-n10 ml-n4 red--text" small @click="supp(item)">mdi-close-circle</v-icon> 
                                               {{ item.mat }}<span class="white success--text py-1 mt-n10 mr-n4 rounded-circle px-2">{{ item.quantite_mat }}</span>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                        <div class="d-flex mt-n4 pb-3 justify-center">
                            <v-btn text color="error" class="text-capitalize col-2 mr-2" @click="step--;$refs.form2.reset()" >Retour</v-btn>
                            <div text class="text-capitalize col-3 mr-2"></div>
                            <v-btn class="text-capitalize col-5 primary" :disabled="!valid" @click="create">Enregistrer<v-icon class="ml-2" small>fa-download</v-icon></v-btn>
                        </div>
                    </v-window-item>
                </v-window>
            </v-card>
        </v-dialog>
        <alertMessage :active="alert" :Message="alertMsg" :type="typeAlert"/>
    </div>
</template>
<script>
import alertMessage from '@/components/alertMessage.vue'
import cbxType from './comboboxType'
import cbxMat from './comboboxMateriel'
import service from '@/services/ExamenService'
export default {
   components:{cbxType, cbxMat, alertMessage},
   props:['open','update'],
   data(){
    return{
        step:1,
        title:'Nouveau',
        btnTitle:'Suivant',
        iconTitle:'fa-chevron-circle-right',
        invalid:false,
        valid:true,
        valid2:true,
        matselected:[],
        examens:[],
        qte:null,
        prise:null,
        prix:null,
        idselect:null,
        libelle:'',
        alertMsg:'',
        typeAlert:'success',
        alert:false,
        id:null,
    }
   }, 
   computed:{
    dialog(){return this.open}
   },
   methods:{
    close(){ this.btnTitle='Suivant', this.iconTitle='fa-chevron-circle-right',  this.$emit('close'), this.$refs.form.reset(), this.$refs.form2.reset()},
    suivant(){
        this.$refs.form.validate()
        if(this.valid){ 
            if (this.btnTitle=='Suivant') {
                this.step++, this.invalid=false, this.getAll()
            } else { this.editExamen() }
        } else{this.invalid=true}
    },
    clearform(){ this.$refs.form.resetValidation(), this.invalid=false, this.btnTitle='Suivant', this.iconTitle='fa-chevron-circle-right' },
    ajout(){
        this.$refs.form2.validate()
        if(this.valid2){ 
            const data =  this.matselected.filter(element=>element.mat === this.$refs.cbxmat.getLibelle())[0]
            if(!data){ 
                this.matselected.push({id_examen:this.id, id_materiel:this.$refs.cbxmat.getId(),mat:this.$refs.cbxmat.getLibelle(), quantite_mat:this.qte, })
                this.$refs.form2.reset() 
            }
        }
    },
    supp(value){
        this.matselected.splice(this.matselected.indexOf(value), 1)
    },
    edit(update){
        this.idselect=update.id_examen
        this.prix=update.code_prix
        this.prise=update.code_prix*2
        this.libelle=update.nom_examen
        this.title='Modification'
        this.btnTitle='Modifier'
        this.iconTitle='fa-edit'
        this.$refs.cbxtype.setValue(update.id_type)
    },
    async editExamen(){
        await service.update({ id_type:this.$refs.cbxtype.getId(), code_prix:this.prix, nom_examen:this.libelle, },this.idselect)
        .then(res=>{
            this.alert=true
            this.alertMsg=res.data.succee
            this.$refs.form.reset()
            this.close()
            setTimeout(()=>{this.alert=false}, 3000)
        })
        .catch(err=>{console.log(err)})
    },
    async create(){
        if(this.matselected.length>0){
            await service.create({ id_examen:this.id, id_type:this.$refs.cbxtype.getId(), nom_examen:this.libelle, code_prix:this.prix })
            .then((res)=>{
                setTimeout(()=>{ this.matselected.forEach(element=> service.createmat( element ) ) },1000)
                this.alert=true
                this.alertMsg=res.data.succee
                this.close()
                this.getAll()
                this.step=1
                this.$refs.form.reset()
                this.$refs.form2.reset() 
                setTimeout(()=>{this.alert=false, this.matselected=[]}, 3000)
            })
            .catch(err=>{console.log(err)})
        }
    },
    async getAll(){
        await service.getAll()
        .then((res)=>{
            const exam = res.data.examens
            if(exam.length<=0){this.id = 1}
            else{
                service.getMax()
                .then((res)=>{
                    const examens=res.data
                    var max = examens[0].id
                    this.id = parseInt(max)+1
                })
            }
        })
    },
   },
   mounted(){
    this.getAll()
   },
}
</script>