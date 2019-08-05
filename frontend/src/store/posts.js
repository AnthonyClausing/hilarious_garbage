import axios from "axios";

export default {
  namespaced: true,
  state: {
    post: {},
    posts: [],
    comments: [],
    parentId: null,
    loading: false
  },
  actions: {
    getAllPosts({ commit }) {
      const requestBody = {
        query: `
        query{
          posts{
            id
            content
            description
            title
            contentType
            imageId
          }
        }
      `
      };
      commit("UPDATE_LOADING", true);
      axios
        .post("http://localhost:3000/graphql", requestBody)
        .then(res => {
          const posts = res.data.data.posts;
          commit("SET_POSTS", posts);
          commit("UPDATE_LOADING", false);
        })
        .catch(err => {
          console.log(err);
          commit("UPDATE_LOADING", false);
        });
    },
    getSinglePost({ commit }, postId) {
      const requestBody = {
        query: `
        query{
          post(id: "${postId}") {
            id
            content
            description
            title
            contentType
            creator {
              id
              name
            }
            comments {
              text
              id
              image
              imageId
              createdAt
              parentId
              user {
                id
                name
              }
            }
          }
        }
      `
      };
      commit("UPDATE_LOADING", true);
      axios
        .post("http://localhost:3000/graphql", requestBody)
        .then(res => {
          const post = res.data.data.post;
          commit("SET_POST", post);
          commit("SET_COMMENTS", post.comments);
          commit("UPDATE_LOADING", false);
        })
        .catch(err => {
          console.log(err);
          commit("UPDATE_LOADING", false);
        });
    },
    createPost({ commit }, variables) {
      const requestBody = {
        query: `
          mutation CreatePost($title: String! $description: String!, $content: String!, $contentType: String!, $imageId: String) {
            createPost(postInput: {title: $title, description: $description, content: $content, contentType: $contentType, imageId: $imageId}){
              id
            }
          }
        `,
        variables
      };
      commit("UPDATE_LOADING", true);
      return axios
        .post("http://localhost:3000/graphql", requestBody)
        .then(res => {
          const id = res.data.data.createPost.id;
          commit("UPDATE_LOADING", false);
          return id;
        })
        .catch(err => {
          console.log(err);
          commit("UPDATE_LOADING", false);
        });
    },
    createComment({ commit, state }, variables) {
      const requestBody = {
        query: `
          mutation AddComment($postId: String! $text: String!, $userId: String!, $image: String, $imageId: String, $parentId: String) {
            addComment(commentInput: {postId: $postId, text: $text, userId: $userId, image: $image, imageId: $imageId, parentId: $parentId}){
              text
              id
              image
              imageId
              createdAt
              parentId
              user {
                id
                name
              }
            }
          }
        `,
        variables: { ...variables, parentId: state.parentId }
      };
      commit("UPDATE_LOADING", true);
      axios
        .post("http://localhost:3000/graphql", requestBody)
        .then(res => {
          const updatedComments = res.data.data.addComment;
          commit("SET_COMMENTS", updatedComments);
          commit("UPDATE_LOADING", false);
          commit("SET_PARENT_ID", null);
        })
        .catch(err => {
          console.log(err);
          commit("UPDATE_LOADING", false);
        });
    }
  },
  mutations: {
    UPDATE_LOADING(state, bool) {
      state.loading = bool;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_POST(state, post) {
      state.post = post;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_PARENT_ID(state, id) {
      state.parentId = id;
    }
  }
};
