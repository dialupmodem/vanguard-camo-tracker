import Vue from 'vue'
import Vuex from 'vuex'

import categories from './modules/categories.js'
import weapons from './modules/weapons.js'
import challenges from './modules/challenges.js'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    categories,
    weapons,
    challenges
  },
  state: {
    dataLoading: false
  },
  mutations: {
    setDataLoading(state, isLoading) {
      state.dataLoading = isLoading
    }
  }
})