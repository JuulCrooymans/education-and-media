import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: 'Hello World!',
    userRoles: null
  },
  mutations: {
    setUserData(state, user) {
      state.userRoles = user
    }
  }
});