<template>
   <v-snackbar
      v-model="snackbar"
      :color="type"
      right top
      timeout="3000"
    >
      <v-alert :type="type" class="text-center"> 
       <span class="text-caption font-weight-blod text-h5"> {{ Message }} </span>
      </v-alert>
    </v-snackbar>
</template>
<script>
export default {
    data(){ return{ timeout:3000 } },
    props:[ 'active', 'type', 'Message',],
    computed:{
      snackbar(){return this.active}
    },
}
</script>