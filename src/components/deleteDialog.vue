<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="420px"
      >
        <v-card :class="$vuetify.theme.dark ? '':''">
          <v-card-title class="text-h5 text-left red--text py-2"> Supprimer ? </v-card-title>
          <div class=" text-center text-body-1 mt-4 mb-6 ">{{message}}</div>
          <v-row class="mx-2 mb-0">
            <v-col>
            <v-btn block class="text-capitalize" @click="$emit('close')" > Annuler </v-btn>
            </v-col>
            <v-col>
            <v-spacer></v-spacer>
            <v-btn block color="error" class="text-capitalize" @click="$emit('accept')" > Supprimer </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
  <script>
    export default {
      props:['open', 'message'],
      computed:{
        dialog(){return this.open}
      }
    }
  </script>