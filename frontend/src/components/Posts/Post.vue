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
  </b-container>
</template>

<script>
export default {
  name: "Post",
  props: ['post']
}
</script>

<style lang="scss">

</style>
