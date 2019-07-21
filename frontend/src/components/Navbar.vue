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
          <b-nav-item v-if="user" :to="`user/${user.name}`" right>{{
            user.name
          }}</b-nav-item>
          <b-button v-else v-b-modal.modal-1>Login or Register</b-button>
          <b-modal
            id="modal-1"
            centered
            hide-footer
            hide-backdrop
            no-close-on-backdrop
            ref="authModal"
          >
            <b-container fluid>
              <b-row>
                <b-col cols="6">
                  <div id="combinedLeft" class="text-center">
                    <div class="form-header mb-1">Create Account</div>
                    <b-form-input
                      v-model="signup.name"
                      placeholder="Pick a username"
                      type="text"
                      maxlength="18"
                    ></b-form-input>
                    <b-form-input
                      v-model="signup.password"
                      placeholder="Password"
                      type="password"
                    ></b-form-input>
                    <b-form-input
                      v-model="signup.email"
                      placeholder="Optional e-mail address"
                      type="email"
                      maxlength="100"
                    ></b-form-input>
                    <b-button @click="signupSubmit">Create Account</b-button>
                  </div>
                </b-col>
                <b-col cols="6">
                  <div id="combinedRight" class="text-center">
                    <div class="form-header mb-1">Login to HG</div>
                    <b-form-input
                      v-model="login.name"
                      placeholder="Pick a username"
                      type="text"
                      maxlength="18"
                    ></b-form-input>
                    <b-form-input
                      v-model="login.password"
                      placeholder="Password"
                      type="password"
                    ></b-form-input>
                    <b-button @click="loginSubmit">Login</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-modal>
          <!-- <b-nav-item :to="`/user/test1`" right>USER</b-nav-item> -->
        </b-navbar-nav>
      </b-navbar>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from "vuex";
// import AuthModal from './Auth/AuthModal'
export default {
  name: "Navbar",
  components: {
    //AuthModal
  },
  data() {
    return {
      login: {
        name: "",
        password: ""
      },
      signup: {
        name: "",
        password: "",
        email: ""
      }
    };
  },
  computed: {
    ...mapState({ user: state => state.user.user })
  },
  methods: {
    signupSubmit() {
      this.$store.dispatch("user/signup", this.signup).then(() => {
        this.$refs.authModal.hide();
      });
    },
    loginSubmit() {
      this.$store.dispatch("user/login", this.login).then(() => {
        this.$refs.authModal.hide();
      });
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
