<template>
    <div>
      <v-row class="text-center">
        <!-- <v-card height="300" class="elevation-8 mx-auto col-12"> -->
          <v-carousel hide-delimiters show-arrows-on-hover cycle height="89vh">
            <v-carousel-item v-for="(item,i) in images" :key="i.src" :src="item.src"></v-carousel-item>
          </v-carousel>
        <!-- </v-card> -->
      </v-row>
    </div>
</template>
<script>
  import moment from 'moment'


  export default {
    data: () => ({
      timestamp: "",
      images: [
        {src: 'lab (4).jpg'}, {src: 'lab (6).jpg'}, {src: 'images (3).jpg'}, {src: 'labo (3).jpg'},
        
      ],
    }),
    el: '#intro',
    created() {
        setInterval(this.getNow, 1000);
    },
    methods: {
        getNow: function() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.timestamp = dateTime; 
        }
    },
    computed: {
        dateTime () {
        return this.timestamp ? moment(this.timestamp).format('LT') : ''
      },
      dateNow(){
        return this.timestamp ? moment(this.timestamp).format('dddd Do MMMM YYYY') : ''
      }
    },

  }
</script>
<style>
  .v-sheet--offset {
    top: -25px;
    position: relative;
  }
</style>