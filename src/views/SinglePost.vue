<template>
  <b-container fluid class="single-post">
    <PostRow :post="post" />
    <comments-container :comments="comments" />
  </b-container>
</template>

<script>
// @ is an alias to /src
import PostRow from "@/components/Posts/PostRow.vue";
import CommentsContainer from "@/components/Comments/CommentsContainer.vue";
import { mapState } from "vuex";
export default {
  name: "SinglePost",
  components: {
    PostRow,
    CommentsContainer,
  },
  created() {
    this.$store.dispatch("posts/getSinglePost", this.$route.params.id);
  },
  computed: {
    ...mapState({
      post: (state) => state.posts.post,
      comments: (state) => state.posts.comments,
    }),
  },
};
</script>

<style lang="scss">
.single-post {
  padding-top: 80px;
}
</style>
