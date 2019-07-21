import axios from "axios";

export default {
  namespaced: true,
  state: {
    post: {},
    posts: [],
    comments: [],
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
            creator {
              id
              name
            }
            comments {
              text
              id
              createdAt
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
    createComment({ commit }, queryVariables) {
      const requestBody = {
        query: `
          mutation AddComment($postId: String! $text: String!, $userId: String!) {
            addComment(commentInput: {postId: $postId, text: $text, userId: $userId}){
              text
              id
              createdAt
              user {
                id
                name
              }
            }
          }
        `,
        variables: queryVariables
      };
      commit("UPDATE_LOADING", true);
      axios
        .post("http://localhost:3000/graphql", requestBody)
        .then(res => {
          const updatedComments = res.data.data.addComment;
          commit("SET_COMMENTS", updatedComments);
          commit("UPDATE_LOADING", false);
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
    }
  }
};
