<template>
  <div class="triangle"></div>
  <div class="triangle2"></div>
  <div class="triangle3"></div>
  <div class="parent clearfix">
    <div class="login">
      <div class="container">
        <h1 class="loginh1">Create account</h1>
        <div class="login-form">
          <form @submit.prevent="register">
            <input
              type="text"
              v-model="firstname"
              placeholder="First name"
              required
            />
            <input
              type="text"
              v-model="lastname"
              placeholder="Last name"
              required
            />
            <input
              type="text"
              v-model="username"
              placeholder="Username"
              required
            />
            <input type="email" v-model="email" placeholder="E-mail" required />
            <input
              type="password"
              minlength="8"
              v-model="password"
              placeholder="Password"
              required
            />
            <p class="error">{{ error }}</p>
            <button type="submit">Sign up</button> <br />
            <br /><br />
            <p class="pThin">Have already an account?</p>
            <button type="button" @click="login" class="noBorderButton">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
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
      axios.post("/register", newUser).then(
        () => {
          this.error = "";
          this.$router.push("/login");
        },
        (err) => {
          if (err.response.data.error.keyPattern.email === 1) {
            this.error = "E-mail already in use!";
          } else {
            this.error = "Username already in use!";
          }
        }
      );
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.login .container .login-form {
  text-align: center;
  margin-top: 5px;
}

.loginh1 {
  text-align: center;
  padding-top: 20px;
  font-weight: 900;
}

.triangle {
  overflow: hidden;
  position: absolute;
  bottom: -300px;
  right: 1200px;
  float: right;
  width: 0;
  height: 600px;
  border-width: 218.5px 442px 218.5px 0;
  border-color: transparent #fafafa transparent transparent;
  border-style: solid;
  filter: drop-shadow(4px 0px 3px rgba(163, 163, 163, 0.66));
  transform: rotate(240deg);
  border-radius: 10px;
  opacity: 0.1;
}

.triangle2 {
  position: absolute;
  overflow: hidden;
  bottom: -300px;
  left: 1200px;
  width: 0;
  height: 600px;
  border-width: 218.5px 442px 218.5px 0;
  border-color: transparent #fafafa transparent transparent;
  border-style: solid;
  filter: drop-shadow(4px 0px 3px rgba(163, 163, 163, 0.66));
  transform: rotate(262deg);
  border-radius: 10px;
  opacity: 0.1;
}

.triangle3 {
  overflow: hidden;
  position: absolute;
  bottom: 400px;
  right: 650px;
  float: right;
  width: 0;
  height: 600px;
  border-width: 218.5px 442px 218.5px 0;
  border-color: transparent #fafafa transparent transparent;
  border-style: solid;
  filter: drop-shadow(4px 0px 3px rgba(163, 163, 163, 0.66));
  transform: rotate(140deg);
  border-radius: 10px;
  opacity: 0.1;
}

.login .container .login-form form input {
  font-size: 16px;
  font-weight: normal;
  background: rgba(57, 57, 57, 0.07);
  margin: 12.5px 0;
  height: 45px;
  width: 85%;
  border: none;
  padding: 0 30px;
  border-radius: 10px;
}
</style>