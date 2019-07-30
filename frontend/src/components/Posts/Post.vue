<template>
  <b-container>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <div class="content-title">
              <h5>{{ post.title }}</h5>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-link
              class="content-creator"
              :to="`/user/${post.creator && post.creator.id}`"
              router-tag="span"
              >user{{ post.creator && post.creator.name }}</b-link
            >
          </b-col>
        </b-row>
        <p v-if="post.contentType == 'text'">{{ post.content }}</p>
        <img v-if="post.contentType == 'image'" :src="post.content" />
        <p>Description: {{ post.description }}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Post",
  props: ["post"]
};
</script>

<style lang="scss">
.content-title {
  text-align: left;
  color: #6fe600;
}
.content-creator {
  font-size: 13px;
}
</style>
