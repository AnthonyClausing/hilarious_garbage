import axios from "axios";

export default {
  namespaced: true,
  state: {
    post: {},
    posts: [],
    count: 0,
    comments: [],
    parentId: null,
    loading: false
  },
  actions: {
    getAllPosts({ commit }, page) {
      const requestBody = {
        query: `
        query{
          posts(page: ${page}){
            id
            content
            description
            title
            contentType
            imageId
            count
          }
        }
      `
      };
      commit("UPDATE_LOADING", true);
      axios
        .post(process.env.VUE_APP_API_SECRET, requestBody)
        .then(res => {
          const posts = res.data.data.posts;
          commit("SET_POSTS", posts);
          commit("SET_COUNT", posts[0].count)
          commit("UPDATE_LOADING", false);
        })
        .catch(() => {
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
        .post(process.env.VUE_APP_API_SECRET, requestBody)
        .then(res => {
          const post = res.data.data.post;
          commit("SET_POST", post);
          commit("SET_COMMENTS", post.comments);
          commit("UPDATE_LOADING", false);
        })
        .catch(() => {
          commit("UPDATE_LOADING", false);
        });
    },
    createPost({ commit }, variables) {
      const requestBody = {
        query: `
          mutation CreatePost($title: String! $description: String, $content: String!, $userId: String!, $contentType: String!, $imageId: String) {
            createPost(postInput: {title: $title, description: $description, userId: $userId, content: $content, contentType: $contentType, imageId: $imageId}){
              id
            }
          }
        `,
        variables
      };
      commit("UPDATE_LOADING", true);
      return axios
        .post(process.env.VUE_APP_API_SECRET, requestBody)
        .then(res => {
          const id = res.data.data.createPost.id;
          commit("UPDATE_LOADING", false);
          return id;
        })
        .catch(() => {
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
        .post(process.env.VUE_APP_API_SECRET, requestBody)
        .then(res => {
          const updatedComments = res.data.data.addComment;
          commit("SET_COMMENTS", updatedComments);
          commit("UPDATE_LOADING", false);
          commit("SET_PARENT_ID", null);
        })
        .catch(() => {
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
    },
    SET_COUNT(state, count) {
      state.count = count;
    }
  }
};
