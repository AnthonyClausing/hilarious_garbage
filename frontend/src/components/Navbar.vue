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
          <b-nav-item :to="`/user/test1`" right>USER</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Navbar"
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
</style>
