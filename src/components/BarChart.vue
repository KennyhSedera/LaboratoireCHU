<template>
  <Bar :chart-options="chartOptions"  :chart-data="chartData"/>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
        chartOptions: {
          responsive: true
        }
    }
  },
  props:{
    chartData: {
      type: Object,
      default: () => {}
    },
  }
}
</script>