<template>
  <div>
    Home
    <button @click="logout">Logout</button>
    <h1>Hello {{ name }}</h1>

    <br />
    <form @submit.prevent="addContact">
      First name:
      <input ref="firstname" type="text" v-model="firstname" required /> <br />
      Last name:
      <input ref="lastname" type="text" v-model="lastname" required /> <br />
      Phone number:
      <input ref="number" type="text" v-model="number" required /> <br />
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
      <tr
        v-for="contact in contacts"
        :key="contact._id"
        @click="clickList(contact), togglePopup()"
      >
        <td>{{ contact.firstname }}</td>
        <td>{{ contact.lastname }}</td>
        <td>{{ contact.number }}</td>
      </tr>
    </table>
  </div>

  <div class="popup" id="popup-1">
    <div class="overlay"></div>
    <div class="content">
      <div class="close-btn" @click="togglePopup()">×</div>
      <h1>{{ specificContact.firstname + " " + specificContact.lastname }}</h1>
      <p>Phone number: {{ specificContact.number }}</p>
      <button>Edit</button>
      <button @click="deleteContact">Delete</button>
    </div>
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
      specificContact: [],
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
        });
  },
  methods: {
    deleteContact() {
      document.getElementById("popup-1").classList.toggle("active");
    },
    clickList: function (contact) {
      //console.log("clickList fired with " + contact._id);
      axios
        .get("/contacts/" + contact._id, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((result) => {
          this.specificContact = result.data.contact;
          //console.log(result.data.contact)
        });
    },
    togglePopup() {
      document.getElementById("popup-1").classList.toggle("active");
    },
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
      this.firstname = "";
      this.lastname = "";
      this.number = "";
    },
    updateList() {
      axios
        .get("/contacts", { headers: { token: localStorage.getItem("token") } })
        .then((res) => {
          this.contacts = res.data.user.data;
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

.popup .overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  display: none;
}

.popup .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: #fff;
  width: 95%;
  max-width: 500px;
  height: 250px;
  z-index: 2;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

.popup .close-btn {
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
  width: 30px;
  height: 30px;
  background: #222;
  color: #fff;
  font-size: 25px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
}

.popup.active .overlay {
  display: block;
}

.popup.active .content {
  transition: all 300ms ease-in-out;
  transform: translate(-50%, -50%) scale(1);
}
</style>