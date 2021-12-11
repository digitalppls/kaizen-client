import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

const ls = new SecureLS({ isCompression: false });
export const plugins = [
  createPersistedState({
    storage: {
      getItem: key => ls.get(key),
      setItem: (key, value) => {
        ls.set(key, value);
      },
      removeItem: key => ls.remove(key)
    },
    reducer (val) {
      if (val.user === null && val.password === null) { // val.user.token (your user token for example)
        return {};
      }
      return val;
    }
  })
];

export const state = () => ({
  ref: null,
  token: null,
  expiresToken: null,
  user: null,
  config: null,
  wallets: [],
  currency: []
});

export const mutations = {
  set (state, data) {
    state[data.name] = data.value;
  },
  login (state, data) {
    state.token = data.token;
    state.expiresToken = data.expiresToken;
    state.user = data.user;
  },
  logout (state) {
    state.token = null;
    state.expiresToken = null;
    state.user = null;
    state.wallets = [];
  },
  updateUser (state, data) {
    state.user = data;
  },
  updateCurrency (state, data) {
    state.currency = data;
  },
  setRef (state, ref) {
    state.ref = ref;
  }
};

export const actions = {
  set ({ commit }, data) {
    commit("set", data);
  },
  register ({ commit }, data) {
    commit("login", data);
  },
  login ({ commit }, data) {
    commit("login", data);
  },
  logout ({ commit }, data) {
    commit("logout", data);
  },
  updateUser ({ commit }, data) {
    commit("updateUser", data);
  },
  updateCurrency ({ commit }, data) {
    commit("updateCurrency", data);
  },
  setRef ({ commit }, username) {
    commit("setRef", username);
  }
};

export const getters = {
  ref: s => s.ref,
  token: s => s.token,
  expiresToken: s => s.expiresToken,
  hasToken: s => !!s.token,
  user: s => s.user,
  config: s => s.config,
  wallets: s => s.user?.wallets,
  currency: s => s.currency
};
