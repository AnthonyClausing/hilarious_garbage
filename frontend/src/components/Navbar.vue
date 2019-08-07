<template>
  <b-row class="navbar_row">
    <b-col>
      <b-navbar>
        <b-navbar-brand class="logo" :to="'/'">
          <img
            height="35px"
            alt="Hilarious Garbage logo"
            src="../assets/logo.svg"
          />
        </b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item v-if="isLoggedIn" :to="`user/${user.name}`" right>{{
            user.name
          }}</b-nav-item>
          <b-button v-else v-b-modal.auth-modal>Login or Register</b-button>
          <auth-modal />
          <b-button v-b-modal.post-modal class="variant-danger">
            MAKE A POST
          </b-button>
          <span v-if="isLoggedIn" class="logout" @click="logout">Logout</span>
          <post-modal />
        </b-navbar-nav>
      </b-navbar>
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
}
.logout {
  color: red;
}

.navbar {
  height: 3rem;
  padding: 0;

  .logo {
    padding: 0;
  }
}

.form-header {
  font: 400 20px roboto, sans-serif;
}
</style>
