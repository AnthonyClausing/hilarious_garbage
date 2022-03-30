<template>
  <b-container fluid id="app">
    <NavbarRow />
    <router-view />
  </b-container>
</template>
<script>
// @ is an alias to /src
import NavbarRow from "@/components/NavbarRow.vue";

export default {
  name: "app",
  components: {
    NavbarRow,
  },
};
</script>

<style lang="scss">
body {
  background: rgb(51, 51, 51);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background: rgb(51, 51, 51);
  height: 100vh;
}
</style>
