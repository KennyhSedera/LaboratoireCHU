<template>
  <Doughnut :chart-options="option"  :chart-data="data" />
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

import Service from '../services/materielService'

export default {
  name: 'App',
  components: {
    Doughnut
  },
  data() {
    return{
      data:{
        labels: [],
        datasets: []
      },
      option: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods:{
    async count(){
      await Service.getAll()
      .then((res)=>{
        this.data.labels = res.data.materiel.map(elt=> elt.libelle_materiel)
        this.data.datasets.push({label:'Nb Patient',backgroundColor:['red','blue','yellow','green'],data:res.data.materiel.map(elt=> elt.quantite)})
      })
    },
  },
  mounted(){
    this.count()
  }
}
</script>
