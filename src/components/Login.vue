<template>
  <div>
    <form @submit.prevent="login">
      Username: <input type="text" v-model="username" required/> <br />
      Password: <input type="password" v-model="password" required/> <br />
      <button type="submit">Login</button> <br />
    </form>
    <button @click="register">Register</button>
    {{ error }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      let user = {
        username: this.username,
        password: this.password,
      };
      axios.post("/login", user).then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          }
          this.error = "";
        },
        (err) => {
          //console.log(err.response);
          this.error = err.response.data.error;
        }
      );
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>
