<template>
  <b-container fluid class="home">
    <Navbar/>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "home",
  components: {
    Navbar
  }
};
</script>
