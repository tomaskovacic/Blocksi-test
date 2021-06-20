<template>
  <div class="backgroundDiv">
    <div class="nav">
      <img src="../assets/icon.svg" class="icon" />
      <h3 class="mainTitle">Contacts</h3>
      <button @click="logout" class="logout noBorderButton">Logout</button>
      <h4 class="logouth4">Hello {{ name }},</h4>
    </div>
    <div class="div2">
      <form @submit.prevent="addContact">
        <input
          ref="firstname"
          type="text"
          v-model="firstname"
          placeholder="First name"
          required
        />
        <br />
        <input
          ref="lastname"
          type="text"
          v-model="lastname"
          placeholder="Last name"
          required
        />
        <br />
        <input
          ref="number"
          type="text"
          v-model="number"
          placeholder="Phone number"
          required
        />
        <br />
        <button type="submit" @click="updateList" class="addButton">Add</button>
        <br />
      </form>
      {{ error }}
    </div>

    <table class="table" cellspacing="0" cellpadding="0">
      <tr class="tableNav">
        <th>First name</th>
        <th>Last name</th>
        <th>Phone number</th>
      </tr>
      <tr
        class="tableTr"
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
      <input
        ref="firstname"
        type="text"
        class="input2"
        v-model="specificContact.firstname"
        required
      />
      <br />
      <input
        ref="lastname"
        type="text"
        class="input2"
        v-model="specificContact.lastname"
        required
      />
      <br />
      <input
        ref="number"
        type="text"
        class="input2"
        v-model="specificContact.number"
        required
      />
      <br />
      <button class="button2" @click="updateContact()">Update</button><br />
      <p>{{ msg }}</p>
      <br />
      <button class="button3" @click="deleteContact()">Delete</button>
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
      temp: "",
      updatedContact: [],
      msg: "",
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
    updateContact() {
      let updateContact = {
        firstname: this.specificContact.firstname,
        lastname: this.specificContact.lastname,
        number: this.specificContact.number,
      };
      axios
        .put("/contacts/" + this.temp._id, updateContact, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((result) => {
          this.updatedContact = result.data.contact;
          this.msg = result.data.title;
        });

      this.updateList();
    },
    deleteContact() {
      document.getElementById("popup-1").classList.toggle("active");
      axios.delete("/contacts/" + this.temp._id, {
        headers: { token: localStorage.getItem("token") },
      });
      this.updateList();
    },
    clickList(contact) {
      this.temp = contact;
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
      this.msg = "";
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

<style scoped>
.backgroundDiv {
  background-color: white;
  height: 100vh;
}

html {
  height: 100%;
}
html,

table {
  border-collapse: collapse;
  width: 100%;
  font-family: Montserrat;
  font-size: 18px;
}

td,
th {
  text-align: left;
  padding: 20px;
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
  height: 280px;
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

.table .tableTr:hover {
  opacity: 0.4;
  cursor: pointer;
}

.icon {
  height: 30px;
  width: 30px;
  float: left;
  margin: 5px;
  margin-left: 20px;
  margin-top: 13px;
}
.logout {
  float: right;
  margin: 10px;
  margin-top: -26px;
  color: white;
  font-size: 15px;
}
.logouth4 {
  float: right;
  margin: 10px;
  margin-top: -27px;
  color: white;
  font-size: 15px;
  font-weight: lighter;
}

.nav {
  background-color: rgb(145, 124, 240);
  height: 60px;
}
.mainTitle {
  font-size: 20px;
  margin: 0;
  padding: 10px;
  margin-left: 47px;
  color: white;
  padding-top: 15px;
}
.noBorderButton {
  border: none;
  background: none;
}
.noBorderButton:hover {
  color: black;
}

.div2 {
  background-color: rgb(213, 124, 240);
  text-align: center;
  padding: 20px;
}

.addButton {
  background: -webkit-linear-gradient(110deg, #4fece5 0%, #b012d8 100%);
  background: -o-linear-gradient(110deg, #4fece5 0%, #b012d8 100%);
  background: linear-gradient(20deg, #4fece5 0%, #b012d8 100%);
  border: none;
  margin-top: 10px;
  margin-bottom: 5px;
  width: 20%;
  height: 30px;
  text-transform: uppercase;
  color: white;
  border-radius: 50px;
  font-weight: bold;
  font-size: 20px;
}

.addButton:hover[type="submit"] {
  opacity: 0.7;
  color: black;
  cursor: pointer;
}

form input {
  font-size: 16px;
  font-weight: normal;
  background: rgba(218, 215, 235, 0.842);
  height: 35px;
  width: 20%;
  border: none;
  padding: 0 30px;
  border-radius: 10px;
  margin: 5px;
}
.input2 {
  font-size: 16px;
  font-weight: normal;
  background: rgba(218, 215, 235, 0.842);
  height: 35px;
  width: 50%;
  border: none;
  border-radius: 10px;
  margin: 5px;
  text-align: center;
  }

.tableNav {
  background-color: rgb(47, 47, 99);
  border: none;
  color: white;
  font-family: Montserrat;
}

.button3 {
  background-color: rgb(221, 44, 103);
  border: none;
  margin-bottom: 5px;
  width: 30%;
  height: 30px;
  text-transform: uppercase;
  color: white;
  border-radius: 50px;
  font-weight: bold;
  font-size: 20px;
}

.button2 {
  background-color: rgb(68, 157, 230);
  border: none;
  margin-top: 5px;
  margin-bottom: 2px;
  width: 30%;
  height: 30px;
  text-transform: uppercase;
  color: white;
  border-radius: 50px;
  font-weight: bold;
  font-size: 20px;
}
</style>