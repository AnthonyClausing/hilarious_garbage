<template>
  <b-container fluid class="home">
    <PostContainer />
  </b-container>
</template>

<script>
// @ is an alias to /src
import PostContainer from "@/components/Posts/PostContainer.vue";

export default {
  name: "home",
  components: {
    PostContainer
  }
};
</script>

<style lang="scss">
.home {
  padding-top: 40px;
}
</style>
