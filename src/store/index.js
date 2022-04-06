import Vue from 'vue'
import Vuex from 'vuex'

import categories from './modules/categories.js'
import weapons from './modules/weapons.js'
import challenges from './modules/challenges.js'
import { mapError } from '@/store/helpers'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    categories,
    weapons,
    challenges
  },
  state: {
    dataError: {
      isError: false,
      message: null
    }
  },
  mutations: {
    setDataError(state, error) {
      state.dataError = mapError(error)
      state.dataLoading = false
    },
    clearDataError(state) {
      state.dataError = {
        isError: false,
        message: null
      }
    }
  },
  getters: {
    dataLoading(state) {
      return state.categories.dataLoading || state.weapons.dataloading || state.challenges.dataloading
    }
  }
})