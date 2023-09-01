<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        width="400px"
      >
        <v-card  height="px" class="text-center">
          <v-card-text class="text-h5 font-weight-black red--text text-left py-2">{{title}}</v-card-text>
          <v-card-text class="font-weight-blod text-center text-body-1 my-4">{{message}}</v-card-text>
            <v-btn
              @click="$emit('accept')"
              elevation="1"
              class="mb-2 blue white--text col-5 px-12"
            > Ok </v-btn>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
  <script>
    export default {
      props:['open', 'message', 'title'],
      computed:{
        dialog(){return this.open}
      }
    }
  </script>