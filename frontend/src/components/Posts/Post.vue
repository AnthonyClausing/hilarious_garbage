<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>{{post.title}}</h1>
        <b-link :to="`/user/${post.creator && post.creator.id}`" router-tag="h3">{{post.creator && post.creator.name}}</b-link>
        <p>{{post.content}}</p>
        <p>Description: {{post.description}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" v-for="comment in comments" :key="comment.id">
        <span style="color: red; border-top: 3px solid yellow;">comments below</span>
        <h3>{{comment.user && comment.user.name}}</h3>
        <h4>{{comment.text}}</h4>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Post",

  data(){
    return{
      post: {},
      isLoading: false
    }
  },
  created(){
    this.fetchPost()
  },
  computed:{
    comments(){
      return this.post.comments
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
          console.log(post)
          this.post = post;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    }
  }
}
</script>

<style lang="scss">

</style>
