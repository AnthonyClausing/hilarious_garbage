<template>
  <b-row no-gutters>
    <b-col class="comParent" :style="indent">
      <b-row>
        <b-col cols="12" v-if="comment.replies.length">
          <button @click="toggleChildren">See replies</button>
        </b-col>
        <b-col cols="3" v-if="comment.image">
          <!-- show profile image if comment is only text or " -->
          <img :src="comment.image" />
        </b-col>
        <b-col>
          <div>
            <span class="px-1" style="color: lightblue;">
              {{ comment.user.name }}
            </span>
            <span class="reply" @click="openCommModalWithId(comment.id)"
              >Reply</span
            >
            <span class="px-1">
              ({{ new Date(Number(comment.createdAt)).toDateString() }})
            </span>
          </div>
          <div class="text-left">
            <!-- WIP split text and img in two cols? -->
            <p class="px-1">{{ comment.text }}</p>
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" v-if="showReplies">
      <single-comment
        v-for="comm in replies"
        :key="comm.id"
        :comment="comm"
        :replies="comm.replies"
        :depth="depth + 1"
        class="comReply"
      >
      </single-comment>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "SingleComment",
  props: {
    comment: {
      type: Object
    },
    replies: {
      type: Array
    },
    depth: {
      type: Number
    }
  },
  data: () => ({
    showReplies: null
  }),
  computed: {
    indent() {
      return { transform: `translate(${Math.min(this.depth * 4, 20)}px)` };
    }
  },
  methods: {
    openCommModalWithId: function(commId) {
      this.$store.commit("posts/SET_PARENT_ID", commId);
      this.$bvModal.show("comment-modal");
    },
    toggleChildren() {
      this.showReplies = !this.showReplies;
    }
  }
};
</script>

<style lang="scss" scoped>
.comReply,
.comParent {
  background-color: #333333;
  font-size: 1em;

  &:hover {
    background-color: #424242 !important;
  }
}
.comReply {
  background: url("../../assets/combars.png") 0 0 repeat-y;
}
.reply {
  &:hover {
    cursor: pointer;
  }
}
</style>
