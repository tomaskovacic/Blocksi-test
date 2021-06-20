<template>
  <div class="triangle"></div>
  <div class="triangle2"></div>
  <div class="triangle3"></div>
  <div class="parent clearfix">
    <div class="login">
      <div class="container">
        <h1 class="loginh1">Login</h1>
        <div class="login-form">
          <form @submit.prevent="login">
            <input
              type="text"
              v-model="username"
              placeholder="Username"
              required
            />
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              required
            />
            <p class="error">{{ error }}</p>
            <button type="submit">Login</button> <br />
            <br />
            <br />
            <br />
            <br /><br />
            <br />
            <p class="pThin">Or sign up using</p>
            <button type="button" class="noBorderButton" @click="register">Sign up</button>
          </form>
        </div>
      </div>
    </div>
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


<style >
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: 0.8s;
  -o-transition: 0.8s;
  transition: 0.8s;
}
html {
  height: 100%;
}

body {
  background: -webkit-linear-gradient(110deg, #4fece5 0%, #b012d8 100%);
  background: -o-linear-gradient(110deg, #4fece5 0%, #b012d8 100%);
  background: linear-gradient(20deg, #4fece5 0%, #b012d8 100%);
  font-family: Montserrat;
    overflow: hidden;
}

.loginh1 {
  text-align: center;
  padding-top: 40px;
  font-weight: 900;
}
*:focus {
  outline: none;
}

.login {
  float: center;
  margin: 0 auto;
}
.login .container {
  width: 400px;
  height: 600px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  box-shadow: 1px 10px;
  border-radius: 10px;
  box-shadow: 5px -5px 5px rgba(129, 122, 122, 0.6);
  -moz-box-shadow: 5px -5px 5px rgba(80, 77, 77, 0.6);
  -webkit-box-shadow: 5px -5px 5px rgba(80, 77, 77, 0.6);
  -o-box-shadow: 5px -5px 5px rgba(80, 77, 77, 0.6);
}
.login .container h1 {
  margin-top: 50px;
  font-size: 38px;
}
.login .container .login-form {
  text-align: center;
  margin-top: 60px;
}

.login .container .login-form form input {
  font-size: 16px;
  font-weight: normal;
  background: rgba(57, 57, 57, 0.07);
  margin: 12.5px 0;
  height: 60px;
  width: 85%;
  border: none;
  padding: 0 30px;
  border-radius: 10px;
}
.login .container .login-form form button[type="submit"] {
  background: -webkit-linear-gradient(110deg, #4fece5 0%, #b012d8 100%);
  background: -o-linear-gradient(110deg, #4fece5 0%, #b012d8 100%);
  background: linear-gradient(20deg, #4fece5 0%, #b012d8 100%);
  border: none;
  margin-top: 10px;
  margin-bottom: 5px;
  width: 85%;
  height: 50px;
  text-transform: uppercase;
  color: white;
  border-radius: 50px;
  font-weight: bold;
  font-size: 20px;
}

.login .container .login-form form button:hover[type="submit"] {
  opacity: 0.7;
  color: black;
  cursor: pointer;
}
.error {
  color: #f794a4;
  font-weight: 550;
}

.noBorderButton {
  padding: 0;
  border: none;
  background: none;
  margin-top: 15px;
}
.pThin {
  font-weight: lighter;
}
button {
  cursor: pointer;
  text-transform: uppercase;
}

.triangle {
  overflow: hidden;
  position: absolute;
  bottom: 300px;
  right: 1300px;
  float: right;
  width: 0;
  height: 600px;
  border-width: 218.5px 442px 218.5px 0;
  border-color: transparent #fafafa transparent transparent;
  border-style: solid;
  filter: drop-shadow(4px 0px 3px rgba(163, 163, 163, 0.66));
  transform: rotate(72deg);
  border-radius: 10px;
  opacity: 0.1;
}

.triangle2 {
  position: absolute;
  overflow: hidden;
  bottom: 300px;
  left: 1200px;
  width: 0;
  height: 600px;
  border-width: 218.5px 442px 218.5px 0;
  border-color: transparent #fafafa transparent transparent;
  border-style: solid;
  filter: drop-shadow(4px 0px 3px rgba(163, 163, 163, 0.66));
  transform: rotate(72deg);
  border-radius: 10px;
  opacity: 0.1;
}

.triangle3 {
  overflow: hidden;
  position: absolute;
  bottom: -300px;
  right: 650px;
  float: right;
  width: 0;
  height: 600px;
  border-width: 218.5px 442px 218.5px 0;
  border-color: transparent #fafafa transparent transparent;
  border-style: solid;
  filter: drop-shadow(4px 0px 3px rgba(163, 163, 163, 0.66));
  transform: rotate(290deg);
  border-radius: 10px;
  opacity: 0.1;
}
</style>


