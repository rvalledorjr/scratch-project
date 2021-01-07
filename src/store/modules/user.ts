import Vue from "vue";
import { User } from "theta-core";
import { database, query as q } from "../../pouchdb";

export const userStore = {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    updateUser(state: { user: User }, nu: User) {
      let { user } = state;
      Vue.set(state, "user", nu);
    },
    resetStore(state: { user: User }) {
      let { user } = state;

      Vue.set(state, "user", null);
    },
  },
  actions: {
    async login(ctx: { commit: any }, user: User) {
      let { commit } = ctx;

      try {
        const result = await database.find(
          q.user(user.userName, user.password)
        );

        const userObj = result.docs[0];

        if (!userObj) {
          throw new Error("Invalid username or password.");
        }

        user = new User(userObj);
        commit("updateUser", user);
      } catch (error) {
        throw error;
      }
    },
    async register(ctx: { commit: any }, user: User) {
      let { commit } = ctx;

      const res = await database.put(user);
      user._rev = res.rev;

      commit("updateUser", user);
    },
  },
};
