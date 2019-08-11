<template>
  <b-row>
    <b-col>
      <b-row>
        <b-col cols="12" class="pl-5">
          <div class="content-title">
            <h4>{{ post.title }}</h4>
          </div>
          <b-link
            class="content-creator"
            :to="`/user/${post.creator && post.creator.id}`"
            router-tag="span"
          >
            {{ post.creator && post.creator.name }}
          </b-link>
        </b-col>
      </b-row>
      <b-row class="mt-4 text-center content-row">
        <b-col>
          <div class="content-text text-left" v-if="post.contentType == 'text'">
            <p class="my-1">{{ post.content }}</p>
          </div>
          <img
            v-if="post.contentType == 'image'"
            @load="setHeight"
            :style="imageStyle"
            class="content-image"
            :src="post.content"
          />
          <div v-if="post.description" class="content-description my-4">
            <p class="text-left">Description: {{ post.description }}</p>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Post",
  props: ["post"],
  data: () => ({
    imageHeight: null
  }),
  methods: {
    setHeight(event) {
      const natHeight = event.target.naturalHeight;
      this.imageHeight = natHeight > 1000 ? "50%" : natHeight;
    }
  },
  computed: {
    imageStyle() {
      return { height: this.imageHeight };
    }
  }
};
</script>

<style lang="scss">
.content {
  &-row {
    max-height: 750px;
  }
  &-title {
    text-align: left;
    color: #6fe600;
  }
  &-creator {
    font-size: 13px;
    cursor: pointer;
  }
  &-text {
    background-color: #474747;
  }
  &-description {
    background-color: #171717;
  }
  &-text,
  &-description {
    max-width: 60vw;
    margin-left: 13.5em;
    padding: 5px;
    border-radius: 4px;
    vertical-align: bottom;
    border: 1px solid #121212;
    font-family: sans-serif;
    color: #e8e8e8;
    width: calc(100% - 20px);
  }
  &-image {
    max-width: 100%;
  }
}
</style>
