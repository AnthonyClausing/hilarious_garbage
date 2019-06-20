<template>
  <b-container>
    <div style="color: red; border-top: 3px solid yellow;">comments below</div>
    <b-row
      class="comment-box"
      v-for="(comment, idx) in comments"
      :key="comment.id"
    >
      <b-col cols="1">
        <!-- show profile image if comment is only text or " -->
      </b-col>
      <b-col>
        <div class="text-left">
          <span class="px-1">#{{ idx }}</span>
          <span class="px-1" style="color: lightblue;">
            {{ comment.user.name }}
          </span>
          <span class="px-1">
            ({{ new Date(Number(comment.createdAt)).toDateString() }})
          </span>
        </div>
        <div class="text-left">
          <p class="px-1">{{ comment.text }}</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Comments",
  props: ["comments"]
};
</script>

<style lang="scss">
.comment-box {
  background-color: #333333;
  font-size: 0.75em;
  &:hover {
    background-color: #424242 !important;
  }
}
</style>
