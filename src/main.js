import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import Contacts from './components/Contacts'
import Register from './components/Register'
import Login from './components/Login'



const routes = [
    { 
        path: '/', 
        name: 'Contacts',
        component: Contacts,
    },
    { 
        path: '/register',
        name: 'Register',
        component: Register,
    },
    { 
        path: '/login',
        name: 'Login',
        component: Login,
    }

]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})
//export default router;
createApp(App).use(router).mount('#app')






