import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import fr from 'vuetify/lib/locale/fr';
import 'font-awesome/css/font-awesome.min.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { fr },
      current: 'fr',
    },
    icons: {
      defaultSet: 'fa mdi',
    },
    theme: { 
      dark: true 
    },
});
