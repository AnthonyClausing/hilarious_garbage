<template>
  <b-container fluid class="home">
    <Post :post="post" />
    <Comments :comments="comments" />
  </b-container>
</template>

<script>
// @ is an alias to /src
import Post from "@/components/Posts/Post.vue";
import Comments from "@/components/Comments/Comments.vue";
import { mapState } from 'vuex'
export default {
  name: "SinglePost",
  components: {
    Post,
    Comments
  },
  created() {
    this.$store.dispatch('posts/getSinglePost',this.$route.params.id);
  },
  computed: {
    ...mapState({ 
      post: state => state.posts.post,
      comments: state => state.posts.comments
    })
  }
};
</script>
