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
      <button type="submit" @click="updateList">Add</button> <br />
    </form>
    {{ error }}
    <br />

    <table>
      <tr>
        <th>First name</th>
        <th>Last name</th>
        <th>Phone number</th>
      </tr>
      <tr v-for="contact in contacts" :key="contact._id">
        <td>{{ contact.firstname }}</td>
        <td>{{ contact.lastname }}</td>
        <td>{{ contact.number }}</td>
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
      error: "",
      contacts: [],
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
      .get("/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.name = res.data.user.firstname;
      }),
      axios
        .get("/contacts", { headers: { token: localStorage.getItem("token") } })
        .then((res) => {
          this.contacts = res.data.user.data;
          //console.log(JSON.stringify(this.contacts));
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
      axios
        .post("/contacts", newContact, {
          headers: { token: localStorage.getItem("token") },
        })
        .then(
           () => {
            this.error = "";
          },
          (err) => {
            this.error = err.response.data.title;
          }
        );
    },
    updateList(){
         axios
        .get("/contacts", { headers: { token: localStorage.getItem("token") } })
        .then((res) => {
          this.contacts = res.data.user.data;
          //console.log(JSON.stringify(this.contacts));
        });
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

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 15px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>