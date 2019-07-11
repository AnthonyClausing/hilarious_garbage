<template>
  <b-col>
    <b-list-group class="post-list" horizontal>
      <b-list-group-item
        class="post"
        :to="`posts/${post.id}`"
        v-for="post in posts"
        :key="post.id"
      >
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>
        <p>{{ post.description }}</p>
      </b-list-group-item>
    </b-list-group>
  </b-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Postlist",
  //maybe dont call here instead in views
  mounted() {
    this.$store.dispatch('posts/getAllPosts');
  },
  computed: {
    ...mapState({ posts: state => state.posts.posts })
  }
};
</script>

<style lang="scss">
.post-list {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 0px 20px;

  & > .post {
    // color: white;
    border: 4px solid rgba(175, 175, 175, 0.5);
    margin: 25px 10px;
    height: 200px;
    width: 200px;
  }
}
</style>
