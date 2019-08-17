<template>
  <b-col>
    <b-list-group class="post-list my-5 ml-4" horizontal>
      <b-list-group-item
        class="post p-0"
        v-for="post in posts"
        :key="post.id"
        :to="`posts/${post.id}`"
      >
        <b-link :to="`posts/${post.id}`">
          <div class="post-title text-truncate">{{ post.title }}</div>
          <b-img
            class="thumbnail"
            v-if="post.contentType == 'image'"
            :src="post.content"
            fluid-grow
          ></b-img>
          <p v-else class="thumbnail-text text-truncate">{{ post.title }}</p>
        </b-link>
      </b-list-group-item>
    </b-list-group>
  </b-col>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Postlist",
  data: () => ({
    page: 1
  }),
  mounted() {
    this.$store.dispatch("posts/getAllPosts", this.page);
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
  & > .post {
    border: 3.5px solid #ff7dff;
    margin: 15px 10px;
    height: 200px;
    width: 200px;
    background-color: #474747;
    & > a {
      color: white;
      text-decoration: none;
      & > .post-title {
        margin-left: auto;
        width: 100%;
        left: 0;
        right: 0;
        display: block;
        position: absolute;
        top: -20px;
        text-decoration: none;
        text-align: center;
        font: 400 13px Verdana, sans-serif;
        text-shadow: 1px 1px 0 #000;
        overflow: hidden;
        height: 14px;
      }
      & > .thumbnail {
        height: 100%;
        &-text {
          text-align: center;
          position: relative;
          top: 80px;
        }
      }
    }
    &:hover {
      border-color: white;
      cursor: pointer;
    }
  }
}
</style>
