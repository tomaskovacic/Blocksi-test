<template>
  <div>
    <form @submit.prevent="register">
      First name: <input type="text" v-model="firstname" required /> <br />
      Last name: <input type="text" v-model="lastname" required /> <br />
      Username: <input type="text" v-model="username" required /> <br />
      E-mail:<input type="email" v-model="email" required /> <br />
      Password:
      <input type="password" minlength="8" v-model="password" required /> <br />
      <button type="submit">Sign up</button> <br />
    </form>
    <button @click="login">Login</button> <br />

    {{ error }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    register() {
      let newUser = {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      axios.post("http://localhost:5000/register", newUser).then(
        (res) => {
          console.log(res);
          this.error = "";
          this.$router.push("/login");
        },
        (err) => {
          //console.log(err.response);
          this.error = err.response.data.error;
        }
      );
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
