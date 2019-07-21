<template>
  <b-container>
    <div style="color: red; border-top: 3px solid yellow;">comments below</div>
    <b-row>
      <b-col>
        <button v-b-modal.com-modal>Add Comment</button>
      </b-col>
      <b-modal
        id="com-modal"
        title="Leave A Comment"
        @ok="modalConfirm"
        hide-backdrop
        no-close-on-backdrop
      >
        <b-form-textarea v-model="commentText"> </b-form-textarea>
      </b-modal>
    </b-row>
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
  props: ["comments"],
  data() {
    return {
      commentText: ""
    };
  },
  methods: {
    modalConfirm() {
      let postId = this.$route.params.id;
      if (!this.commentText.trim().length) {
        return;
      }
      this.$store.dispatch("posts/createComment", {
        postId,
        text: this.commentText,
        userId: "2"
      });
    }
  }
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
