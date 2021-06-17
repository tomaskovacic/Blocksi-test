<template>
  <div>
    Name: <input type="text" v-model="name" /> <br />
    E-mail:<input type="text" v-model="email" /> <br />
    Password: <input type="password" v-model="password" /> <br />
    <button @click="register">Sign up</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
        let newUser = {
            name: this.name,
            email: this.email,
            password: this.password
        }
        axios.post('http://localhost:5000/register', newUser)
        .then(res =>{
            console.log(res)
        }, err => {
            console.log(err.response)
        })
    },
  },
};
</script>
