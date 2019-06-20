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

export default {
  name: "SinglePost",
  components: {
    Post,
    Comments
  },
  data() {
    return {
      post: {},
      isLoading: false
    };
  },
  created() {
    this.fetchPost();
  },
  computed: {
    comments() {
      return this.post.comments;
    }
  },
  methods: {
    fetchPost() {
      this.isLoading = true;
      const requestBody = {
        query: `
        query{
          post(id: "${this.$route.params.id}") {
            id
            content
            description
            title
            creator {
              id
              name
            }
            comments {
              text
              id
              createdAt
              user {
                id
                name
              }
            }
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
          const post = resData.data.post;
          console.log(post);
          this.post = post;
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
