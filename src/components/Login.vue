<template>
  <div class="parent clearfix">
    <div class="login">
      <div class="container">
        <h1>Login to access to<br />your account</h1>

        <div class="login-form">
          <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" required /> 
            <p class="error">{{ error }}</p>
            <button type="submit">Login</button> <br /> <br> <br>
            <p>Already have an account?</p>
            <button @click="register">Register</button>
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

<style>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}

body {
  background-color: #fff;
  font-family: Montserrat;
  overflow-x: hidden;
}

*:focus {
  outline: none;
}

.login {
  overflow-y: auto;
  float: center;
  margin: 0 auto;
}
.login .container {
  width: 505px;
  margin: 0 auto;
  position: relative;
}
.login .container h1 {
  margin-top: 90px;
  font-size: 38px;
  font-weight: bolder;
}
.login .container .login-form {
    text-align: center;

  margin-top: 70px;
}

.login .container .login-form form input {
  font-size: 16px;
  font-weight: normal;
  background: rgba(57, 57, 57, 0.07);
  margin: 12.5px 0;
  height: 68px;
  width: 500px;
  border: none;
  padding: 0 30px;
  border-radius: 10px;
}
.login .container .login-form form button {
  background: -webkit-linear-gradient(110deg, #f794a4 0%, #fdd6bd 100%);
  background: -o-linear-gradient(110deg, #f794a4 0%, #fdd6bd 100%);
  background: linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%);
  border: none;
  margin-top: 10px;
  margin-bottom: 5px;
  width: 241px;
  height: 58px;
  text-transform: uppercase;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
}

.login .container .login-form form button:hover {
  background: -webkit-linear-gradient(110deg, #8062d3 0%, #2235db 100%);
  background: -o-linear-gradient(110deg, #8062d3 0%, #2235db 100%);
  background: linear-gradient(-20deg, #8062d3 0%, #2235db 100%);
  cursor: pointer;
}
.error {
  color: #f794a4;
  font-weight: 550;
}

</style>