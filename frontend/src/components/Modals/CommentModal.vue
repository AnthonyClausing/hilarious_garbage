<template>
  <b-modal
    id="comment-modal"
    title="Leave A Comment"
    @ok="modalConfirm"
    hide-backdrop
    no-close-on-backdrop
  >
    <!-- fixed height textarea? -->
    <b-form-textarea v-model="commentText"> </b-form-textarea>
    <!-- add slight spacing between these two -->
    <dropzone
      @vdropzone-success="setImageFile"
      @vdropzone-removed-file="imageFile = null"
      id="comment-drop"
      :options="dropOptions"
      dictDefaultMessage="Drop a file here"
    ></dropzone>
  </b-modal>
</template>

<script>
import Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import axios from "axios";

export default {
  name: "CommentModal",
  components: {
    Dropzone
  },
  data: () => ({
    commentText: "",
    dropOptions: {
      thumbnailWidth: 160,
      thumbnailHeight: 160,
      url: "https://httpbin.org/post",
      maxFilesize: 0.5,
      maxFiles: 1,
      addRemoveLinks: true,
      dictRemoveFile: "REMOVE",
      dictDefaultMessage: "Drop a file here"
    },
    imageFile: null
  }),
  methods: {
    modalConfirm() {
      const commentParams = {
        postId: this.$route.params.id,
        text: this.commentText,
        userId: "2",
        image: null,
        imageId: null
      };
      if (!this.commentText.trim().length && !this.imageFile) {
        //set some ui error state
        return;
      }
      if (this.imageFile) {
        this.uploadImage().then(img => {
          this.$store.dispatch("posts/createComment", {
            ...commentParams,
            image: img.url,
            imageId: img.public_id
          });
        });
      } else {
        this.$store.dispatch("posts/createComment", commentParams);
      }
      //Validations function that basically just returns to exit
      // or maybe shows error and doesnt close modal
    },
    uploadImage() {
      const imageParams = {
        file: this.imageFile.dataURL,
        upload_preset: "maosesaj"
      };
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      };
      axios.interceptors.response.use(res => {
        res.headers = { ...res.headers, ...headers };
        return res;
      });
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/afurosensei/image/upload",
          imageParams
        )
        .then(res => {
          return res.data;
        });
    },
    setImageFile(file) {
      this.imageFile = file;
    }
  }
};
</script>
