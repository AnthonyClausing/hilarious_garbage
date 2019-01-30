<template>
<b-row class="navbar_row">
  <b-col>
  <nav class="navbar">
    <b-navbar>
      <b-navbar-brand class="logo" href="/">
        <img height="35px" alt="Hilarious Garbage logo" src="../assets/logo.svg"/>
      </b-navbar-brand>
    </b-navbar>
  </nav>
  </b-col>
  <h2 class="hellooo">hello baby</h2>
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
}

.navbar{
  height: 3rem;
  padding: 0;
  
  .logo{
    padding: 0;
  }
}
</style>
