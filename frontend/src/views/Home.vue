<template>
  <b-container fluid class="home">
    <Navbar />
    <PostContainer />
  </b-container>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import PostContainer from "@/components/Posts/PostContainer.vue";

export default {
  name: "home",
  components: {
    Navbar,
    PostContainer
  }
};
</script>
