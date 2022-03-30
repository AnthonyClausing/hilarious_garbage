<template>
  <b-modal
    id="auth-modal"
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
</template>

<script>
export default {
  name: "AuthModal",
  data() {
    return {
      login: {
        name: "",
        password: "",
      },
      signup: {
        name: "",
        password: "",
        email: "",
      },
    };
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
    },
  },
};
</script>
