<template>
  <div>
    Home
    <button @click="logout">Logout</button>
    <h1>Hello {{ name }}</h1>

    <br />
    <form @submit.prevent="addContact">
      First name: <input type="text" v-model="firstname" required /> <br />
      Last name: <input type="text" v-model="lastname" required /> <br />
      Phone number: <input type="text" v-model="number" required /> <br />
      <button type="submit">Add</button> <br />
    </form>
    <br />

    <table>
  <tr>
    <th>First name</th>
    <th>Last name</th>
    <th>Phone number</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td><button>Edit</button></td>
    <td><button>Delete</button></td>
  </tr>
</table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Contacts",
  data() {
    return {
      name: "",
      email: "",
      firstname: "",
      lastname: "",
      number: "",
    };
  },
  created() {
    //User is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.name = res.data.user.firstname;
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    addContact() {
      let newContact = {
        firstname: this.firstname,
        lastname: this.lastname,
        number: this.number,
      };
      axios.post("http://localhost:5000/contacts", newContact, {headers: { token: localStorage.getItem('token') }}).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err.response);
        }
      );
    },
  },
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 15px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>