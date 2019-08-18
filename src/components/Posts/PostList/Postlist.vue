<template>
  <b-col>
    <b-col cols="12" class="text-center">
      <span v-if="page > 2" class="pg" @click="handlePagination(page - 1)"
        >Prev</span
      >
      <span
        class="pg"
        :class="{ active: page === 1 }"
        @click="handlePagination(1)"
        >First</span
      >
      <span v-if="page > 1" class="pg" @click="handlePagination(page - 1)">{{
        page - 1
      }}</span>
      <span
        v-if="page > 1 && page < lastPage"
        class="pg"
        :class="{ active: page !== 1 }"
        @click="handlePagination()"
        >{{ page }}</span
      >
      <span
        v-if="page + 1 <= lastPage"
        class="pg"
        @click="handlePagination(page + 1)"
        >{{ page + 1 }}</span
      >
      <span
        v-if="page + 2 < lastPage"
        class="pg"
        @click="handlePagination(page + 2)"
        >{{ page + 2 }}</span
      >
      <span
        class="pg"
        :class="{ active: page === lastPage }"
        @click="handlePagination(lastPage)"
        >Last</span
      >
      <span
        v-if="page !== lastPage"
        class="pg"
        @click="handlePagination(page + 1)"
        >Next</span
      >
    </b-col>
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
  watch: {
    page: function handler(newPageNum) {
      this.$store.dispatch("posts/getAllPosts", newPageNum);
    }
  },
  mounted() {
    this.$store.dispatch("posts/getAllPosts", this.page);
  },
  computed: {
    ...mapState({ posts: state => state.posts.posts }),
    lastPage() {
      let totalPosts = this.posts[0] && this.posts[0].count;
      return Math.ceil(totalPosts / 5);
    }
  },
  methods: {
    handlePagination(pageNum) {
      if (this.page === pageNum || pageNum > this.lastPage) {
        return;
      }
      this.page = pageNum;
    }
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
.pg {
  color: #fff;
  text-decoration: none;
  border: 1px solid #474545;
  background: #000;
  padding: 4px 9px;
  font-size: 1.5em;
  margin: 0 12px 0 0;
  border-radius: 2px;
  cursor: pointer;
  &.active {
    background: #ff7dff !important;
    &:hover {
      color: #a36;
    }
  }
  &:hover {
    color: #aaa;
    background: #171717;
    border: 1px solid #5c5c5c;
  }
}
</style>
