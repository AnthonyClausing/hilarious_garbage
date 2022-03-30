<template>
  <b-container id="post-container" fluid>
    <b-row>
      <PostList />
    </b-row>
  </b-container>
</template>

<script>
import PostList from "@/components/Posts/PostList/PostList.vue";
export default {
  name: "PostContainer",
  components: {
    PostList,
  },
};
</script>

<style lang="scss">
#post-container {
  padding-top: 55px;
}
</style>
