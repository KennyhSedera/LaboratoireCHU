<template>
  <v-app>
    <NavBar v-if="$route.name!='login'"/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  name: 'App',
  components:{NavBar,},
  data: () => ({
    id_user:null,
  }),
  mounted() {
    this.getUserConnected()
    document.title = this.$route.meta.title || "Laboratoire d'analyse"
    if (this.id_user == null && this.$route.name != 'login') {
      alert('Veillez vous connecter d\'abord !')
      this.$router.push({ name: 'login' })
    }
    if (this.id_user != null && this.$route.path === '/') {
      alert('Vous êtes déjà connecter !')
      this.$router.push({ name: 'home' })
    }
  },
  methods: {
    getUserConnected() {
      let user = localStorage.getItem('user')
      user = JSON.parse(user)
      if (user) {
        this.id_user = user[0].id_user
      } else {
        this.id_user = null
      }
    },
  },
};
</script>
