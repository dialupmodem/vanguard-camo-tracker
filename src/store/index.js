import Vue from 'vue'
import Vuex from 'vuex'

import categories from './modules/categories.js'
import weapons from './modules/weapons.js'
import challenges from './modules/challenges.js'
import { mapError } from '@/utils/'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    categories,
    weapons,
    challenges
  },
  state: {
    dataLoading: false,
    dataError: {
      isError: false,
      message: null
    }
  },
  mutations: {
    setDataLoading(state, isLoading) {
      state.dataLoading = isLoading
    },
    setDataUpdating(state, isUpdating) {
      state.dataUpdating = isUpdating
    },
    setDataError(state, error) {
      state.dataError = mapError(error)
      state.dataLoading = false
      state.dataUpdating = false
    },
    clearDataError(state) {
      state.dataError = {
        isError: false,
        message: null
      }
    }
  }
})