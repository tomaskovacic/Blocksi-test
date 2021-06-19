<template>
    <div>
        Home
        <button @click="logout">Logout</button>
        <h1>Hello {{ name }}</h1>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Contacts',
    data(){
        return {
            name: '',
            email: '',
        }
    },
    created() {
        //User is not authorized
        if (localStorage.getItem('token') === null){
            this.$router.push('/login')
        }

    },
    mounted() {
        axios.get("http://localhost:5000/user", {headers: {token: localStorage.getItem('token')}})
        .then(res => {
            this.name = res.data.user.firstname
        })
    },
    methods: {
        logout(){
            localStorage.clear();
            this.$router.push('/login')
        }
    }
}
</script>