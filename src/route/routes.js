import Vue from 'vue'
import VueRouter from 'vue-router'
import PageNotFound from '@/views/Page_not_found'
import login from '@/views/LoginView'
import home from '@/views/HomeView'
import patient from '@/views/PatientView'
import examen from '@/views/ExamenView'
import statistique from '@/views/StatistiqueView'
import materiel from '@/views/MaterielView'
import utilisateur from '@/views/UtilisateurView'
import profile from '@/views/ProfileView'
import prescripteur from '@/views/PrescripteurView'
import analyse from '@/views/AnalyseView'
import analyseall from '@/views/AnalyseAllView'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        meta: {
            title: 'Page d\'authentification'
        },
        component: login
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: 'Page d\'accueil'
        },
        component: home
    },
    {
        path: '/patient',
        name: 'patient',
        meta: {
            title: 'Patient'
        },
        component: patient
    },
    {
        path: '/examen',
        name: 'examen',
        meta: {
            title: 'Examen'
        },
        component: examen
    },
    {
        path: '/materiel',
        name: 'materiel',
        meta: {
            title: 'Matériel'
        },
        component: materiel
    },
    {
        path: '/statistique',
        name: 'statistique',
        meta: {
            title: 'Statistique'
        },
        component: statistique
    },
    {
        path: '/utilisateur',
        name: 'utilisateur',
        meta: {
            title: 'Utilisateur'
        },
        component: utilisateur
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            title: 'Profile'
        },
        component: profile
    },
    {
        path: '/prescripteur',
        name: 'prescripteur',
        meta: {
            title: 'Prescripteur'
        },
        component: prescripteur
    },
    {
        path: '/analyse/:num',
        name: 'analyse',
        meta: {
            title: ''
        },
        props: true,
        component: analyse
    },
    {
        path: '/analyse',
        name: 'analyseall',
        meta: {
            title: 'Analyse'
        },
        props: true,
        component: analyseall
    },
    {
        path: '/:pathMacth(.*)*',
        name: 'notFound',
        meta: {
            title: 'Page introuvable'
        },
        component: PageNotFound
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router