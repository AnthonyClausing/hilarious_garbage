<template>
  <b-col>
    <b-list-group class="post-list" horizontal>
      <b-list-group-item
        class="post"
        :href="`posts/${post.id}`"
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
export default {
  name: "Postlist",
  data() {
    return {
      posts: [],
      isLoading: false
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      this.isLoading = true;
      const requestBody = {
        query: `
        query{
          posts{
            id
            content
            description
            title
          }
        }
      `
      };

      fetch("http://localhost:3000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed");
          }
          return res.json();
        })
        .then(resData => {
          const posts = resData.data.posts;
          this.posts = [...posts];
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
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
