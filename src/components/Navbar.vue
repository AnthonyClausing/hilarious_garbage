<template>
  <b-row class="navbar_row">
    <b-col>
      <b-navbar>
        <b-navbar-brand class="logo ml-1" :to="'/'">
          <img
            height="35px"
            alt="Hilarious Garbage logo"
            src="../assets/logo.svg"
          />
        </b-navbar-brand>
        <b-button v-b-modal.post-modal class="upload font-weight-bold">
          UPLOAD
        </b-button>
        <b-navbar-nav class="ml-auto mr-3" right>
          <b-nav-item
            v-if="isLoggedIn"
            class="username"
            :to="`user/${user.name}`"
          >
            {{ user.name }}
          </b-nav-item>
          <b-button v-else v-b-modal.auth-modal>Login or Register</b-button>
          <b-nav-text v-if="isLoggedIn" class="logout" @click="logout">
            Logout
          </b-nav-text>
        </b-navbar-nav>
      </b-navbar>
      <auth-modal />
      <post-modal />
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from "vuex";
import AuthModal from "./Modals/AuthModal.vue";
import PostModal from "./Modals/PostModal.vue";

export default {
  name: "Navbar",
  components: {
    AuthModal,
    PostModal
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    isLoggedIn() {
      return this.user && this.$store.getters["user/isLoggedIn"];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout").then(this.$forceUpdate());
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar_row {
  background: rgb(51, 51, 51);
  border: 1px solid rgb(141, 141, 141);
  position: fixed;
  width: 100%;
  z-index: 9999;
}
.logout {
  color: #f4f4f4;
  cursor: pointer;
}

.navbar {
  height: 3rem;
  padding: 0;

  .logo {
    padding: 0;
    float: left;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.upload {
  background: #87bf67;
}
.username {
  align-self: flex-end;
  & > a {
    color: #f4f4f4 !important;
    text-decoration: none;
  }
}
.form-header {
  font: 400 20px roboto, sans-serif;
}
</style>
