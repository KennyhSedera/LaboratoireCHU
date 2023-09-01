<template>
    <v-container fluid>
        <v-toolbar :color="!$vuetify.theme.dark ? 'green darken-3' : 'grey darken-3'">
            <v-spacer></v-spacer>
            <span class="font-weight-black white--text text-md-h4 ml-4"><span class="ml-1 primary--text text-md-h2 font-weight-black">S</span>tatistique</span>
            <v-spacer></v-spacer>
        </v-toolbar>
    </v-container>
</template>
<script>
export default {
    mounted() {
        document.title = this.$route.meta.title || "Laboratoire d'analyse"
    },
}
</script>