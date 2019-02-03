<template>
  <b-container fluid class="home">
    <Navbar/>
    <PostList/>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import PostList from "@/components/Posts/PostList/Postlist.vue"

export default {
  name: "home",
  components: {
    Navbar,
    PostList
  }
};
</script>
