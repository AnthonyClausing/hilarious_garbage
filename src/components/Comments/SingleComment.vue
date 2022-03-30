<template>
  <b-row no-gutters>
    <b-col class="comParent" :style="indent">
      <b-row no-gutters>
        <b-col cols="12" class="my-1">
          <div>
            <span class="px-1" style="color: lightblue">
              {{ comment.user.name }}
            </span>
            <span class="px-1">
              ({{ new Date(Number(comment.createdAt)).toDateString() }})
            </span>
            <span
              class="plus-button"
              v-if="comment.replies.length > 2"
              @click="toggleChildren"
            >
              {{ showRepliesSymbol }}
            </span>
            <span
              v-if="isLoggedIn"
              class="reply"
              @click="openCommModalWithId(comment.id)"
            >
              Reply
            </span>
          </div>
        </b-col>
        <b-col cols="3" class="px-0" v-if="comment.image">
          <!-- show profile image if comment is only text or " -->
          <b-img :src="comment.image" fluid />
        </b-col>
        <b-col>
          <div class="text-left">
            <p class="px-1 ml-1">{{ comment.text }}</p>
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" v-if="replies.length <= 2 || showReplies">
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
      type: Object,
    },
    replies: {
      type: Array,
    },
    depth: {
      type: Number,
    },
  },
  data: () => ({
    showReplies: null,
  }),
  computed: {
    indent() {
      return { transform: `translate(${Math.min(this.depth * 4, 20)}px)` };
    },
    showRepliesSymbol() {
      return this.showReplies ? "[-]" : "[+]";
    },
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
  },
  methods: {
    openCommModalWithId: function (commId) {
      this.$store.commit("posts/SET_PARENT_ID", commId);
      this.$bvModal.show("comment-modal");
    },
    toggleChildren() {
      this.showReplies = !this.showReplies;
    },
  },
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
  float: right;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
}
.plus-button {
  border: 1px solid black;
  color: white !important;
  &:hover {
    border: 1px solid white;
    cursor: pointer;
  }
}
</style>
