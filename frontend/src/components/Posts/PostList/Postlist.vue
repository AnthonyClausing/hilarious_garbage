<template>
  <ul class="post-list">
    <li class="post" v-for="post in posts" :key="post.id">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
      <p>{{ post.description }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Postlist",
  data() {
    return {
      posts: [],
      isLoading: false
    }
  },
  mounted() {
    this.fetchPosts()
  },
  methods:{
    fetchPosts() {
    this.isLoading = true
    const requestBody = {
      query: `
        query{
          posts{
            id
            content
            description
            title
            comments{
              id
              text
              createdAt
            }
          }
        }
      `
    };

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    .then( res =>{
      if(res.status !== 200 && res.status !== 201){
        throw new Error('Failed');
      }
      return res.json();
    })
    .then( resData => {
      const posts = resData.data.posts;
      this.posts = [...posts]
      this.isLoading = false
    })
    .catch(err =>{
      console.log(err);
      this.isLoading = false
    });
  }
  }
}
</script>

<style lang="scss">

  .post-list { 
    list-style: none;
    display: flex;
    justify-content: space-between;
    max-width: 80%;
    margin: auto;
    padding: 0;
    
    & > .post {
    color: white;
    max-width: 30%;
    }
  }
</style>
