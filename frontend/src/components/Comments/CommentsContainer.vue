<template>
  <b-container>
    <!-- <div style="color: red; border-top: 3px solid yellow;">comments below</div> -->
    <b-row>
      <b-col class="my-2">
        <b-button v-b-modal.comment-modal>Add Comment</b-button>
      </b-col>
      <comment-modal :parentId="parentId" ref="commModal" />
    </b-row>
    <single-comment
      v-for="comment in commentTree"
      :key="comment.id"
      :comment="comment"
      :replies="comment.replies"
      @reply="setParentId"
    >
    </single-comment>
  </b-container>
</template>

<script>
import CommentModal from "@/components/Modals/CommentModal.vue";
import SingleComment from "./SingleComment.vue";

export default {
  name: "CommentsContainer",
  props: ["comments"],
  components: {
    CommentModal,
    SingleComment
  },
  data: () => ({
    parentId: null
  }),
  computed: {
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
  },
  methods: {
    setParentId(pId) {
      this.parentId = pId;
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
