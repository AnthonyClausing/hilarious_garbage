<template>
  <b-modal
    id="post-modal"
    title="Select a tab and Upload your content"
    @ok="submitPost"
    @hidden="clearPostData"
    hide-backdrop
    no-close-on-backdrop
  >
    <b-card no-body>
      <b-tabs card>
        <b-tab
          title="Text"
          @click="
            clearPostData();
            setContentType('text');
          "
          active
        >
          <label for="title">Title</label>
          <b-form-input id="title" v-model="postData.title"></b-form-input>
          <label for="description">Description</label>
          <b-form-input
            id="description"
            v-model="postData.description"
          ></b-form-input>
          <label for="content">Content</label>
          <b-form-textarea
            id="content"
            v-model="postData.content"
          ></b-form-textarea>
        </b-tab>
        <b-tab
          title="Image"
          @click="
            clearPostData();
            setContentType('image');
          "
        >
          <label for="title">Title</label>
          <b-form-input id="title" v-model="postData.title"></b-form-input>
          <label for="description">Description</label>
          <b-form-input
            id="description"
            v-model="postData.description"
          ></b-form-input>
          <label for="post-drop">Content</label>
          <dropzone
            @vdropzone-success="setImageFile"
            @vdropzone-removed-file="imageFile = null"
            id="post-drop"
            :options="dropOptions"
          >
          </dropzone>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-modal>
</template>

<script>
import Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "PostModal",
  components: {
    Dropzone
  },
  data: () => ({
    postData: {
      title: "",
      description: "",
      content: "",
      contentType: "text"
    },
    imageFile: null,
    dropOptions: {
      thumbnailWidth: 160,
      thumbnailHeight: 160,
      url: "https://httpbin.org/post",
      maxFilesize: 0.5,
      maxFiles: 1,
      addRemoveLinks: true,
      dictRemoveFile: "REMOVE",
      dictDefaultMessage: "Drop a file here"
    }
  }),
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    submitPost() {
      const queryVariables = {
        ...this.postData,
        userId: this.user.id,
        imageId: null
      };
      if (this.postData.contentType === "image") {
        this.uploadImage().then(img => {
          this.$store
            .dispatch("posts/createPost", {
              ...queryVariables,
              content: img.url,
              imageId: img.public_id
            })
            .then(pId => {
              this.$router.push({ path: `/posts/${pId}` });
            });
        });
      } else {
        this.$store.dispatch("posts/createPost", queryVariables).then(pId => {
          this.$router.push({ path: `/posts/${pId}` });
        });
      }
    },
    uploadImage() {
      const imageParams = {
        file: this.imageFile.dataURL,
        upload_preset: "ee5wiezd"
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
    setContentType(type) {
      this.postData.contentType = type;
    },
    setImageFile(file) {
      this.imageFile = file;
    },
    clearPostData() {
      this.postData = {
        title: "",
        description: "",
        content: "",
        contentType: ""
      };
      this.setImageFile(null);
    }
  }
};
</script>
