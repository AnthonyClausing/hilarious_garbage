<template>
  <b-container>
    <!-- <div style="color: red; border-top: 3px solid yellow;">comments below</div> -->
    <b-row>
      <b-col class="my-2">
        <b-button v-b-modal.comment-modal>Add Comment</b-button>
      </b-col>
      <comment-modal :parentId="parentId" ref="commModal" />
    </b-row>
    <div id="comment-wrapper">
      <single-comment
        v-for="comment in commentTree"
        :key="comment.id"
        :comment="comment"
        :replies="comment.replies"
        :depth="0"
      >
      </single-comment>
    </div>
  </b-container>
</template>

<script>
import CommentModal from "@/components/Modals/CommentModal.vue";
import SingleComment from "./SingleComment.vue";
import { mapState } from "vuex";

export default {
  name: "CommentsContainer",
  props: ["comments"],
  components: {
    CommentModal,
    SingleComment
  },
  computed: {
    ...mapState({
      parentId: state => state.posts.parentId
    }),
    commentTree() {
      function buildTree(elements, parentId = null) {
        let branch = new Array();
        for (let comment of elements) {
          if (comment.parentId == parentId) {
            let replies = buildTree(elements, comment.id);
            if (replies) {
              comment["replies"] = replies;
            }
            branch.push(comment);
          }
        }
        return branch;
      }
      return buildTree(this.comments);
    }
  }
};
</script>

<style lang="scss">
#comment-wrapper {
  background: url("../../assets/combars.png") 0 0 repeat-y;
}
</style>
