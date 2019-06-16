<template>
  <b-container fluid>
    <b-row>
      <PostList />
    </b-row>
  </b-container>
</template>

<script>
import PostList from "@/components/Posts/PostList/Postlist.vue";
export default {
  name: "PostContainer",
  components: {
    PostList
  }
};
</script>

<style lang="scss"></style>
