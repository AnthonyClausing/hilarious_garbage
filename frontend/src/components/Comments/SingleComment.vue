<template>
  <b-row class="comment-box" no-gutters>
    <!-- :style="indent" -->
    <b-col cols="12" @click="toggleChildren"
      ><button>See replies</button></b-col
    >
    <b-col cols="3" v-if="comment.image">
      <!-- show profile image if comment is only text or " -->
      <img :src="comment.image" />
    </b-col>
    <b-col>
      <div class="text-left">
        <span class="px-1" style="color: lightblue;">
          {{ comment.user.name }}
        </span>
        <span @click="openCommModalWithId(comment.id)">Reply</span>
        <span class="px-1">
          ({{ new Date(Number(comment.createdAt)).toDateString() }})
        </span>
      </div>
      <div class="text-left">
        <!-- WIP split text and img in two cols? -->
        <p class="px-1">{{ comment.text }}</p>
      </div>
    </b-col>
    <b-col cols="12">
      <single-comment
        v-for="comm in replies"
        :key="comm.id"
        :comment="comm"
        :replies="comm.replies"
        :depth="depth + 1"
        @reply="$emit('reply', comm.id)"
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
      type: Number,
      default: 0
    }
  },
  data: () => ({
    showReplies: null
  }),
  methods: {
    openCommModalWithId: function(commId) {
      this.$emit("reply", commId);
      this.$bvModal.show("comment-modal");
    },
    toggleChildren() {
      this.showReplies = !this.showReplies;
    }
  }
};
</script>
