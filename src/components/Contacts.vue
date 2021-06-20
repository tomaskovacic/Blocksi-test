<template>
  <div class="backgroundDiv">
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

    <table class="table">
      <tr>
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
      First name:
      <input
        ref="firstname"
        type="text"
        v-model="specificContact.firstname"
        required
      />
      <br />
      Last name:
      <input
        ref="lastname"
        type="text"
        v-model="specificContact.lastname"
        required
      />
      <br />
      Phone number:
      <input
        ref="number"
        type="text"
        v-model="specificContact.number"
        required
      />
      <br />
      <button @click="updateContact()">Update</button><br />
      <p>{{ msg }}</p>
      <br />
      <button @click="deleteContact()">Delete</button>
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
      msg:"",
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
      axios.put("/contacts/" + this.temp._id, updateContact, { headers: { token: localStorage.getItem("token") },
        })
        .then((result) => {
          this.updatedContact = result.data.contact;
          this.msg = result.data.title
        });

      this.updateList();
    },
    deleteContact() {
      document.getElementById("popup-1").classList.toggle("active");
      axios.delete("/contacts/" + this.temp._id, { headers: { token: localStorage.getItem("token") },
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
      this.msg = ''
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

.table .tableTr:hover{
    opacity: 0.4;
    cursor: pointer;
}
</style>