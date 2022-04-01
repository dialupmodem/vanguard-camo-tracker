import Vue from 'vue'
import Vuex from 'vuex'

import API from '@/api/api.js'
import utils from '@/utils/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    weapons: [],
    challenges: []
  },
  mutations: {
    updateCategories(state, categories) {
      state.categories = categories
    },
    selectDefaultCategory(state) {
      if (!state.categories || !(state.categories.length > 0))  {
        state.categories[0].selected = true
      }
    }
  },
  getters: {
    selectedCategory(state) {
      let selectedCategory = state.categories.find(c => c.selected)
      if (!selectedCategory) {
        return null
      }

      return selectedCategory
    } 
  },
  actions: {
    getCategories(context) {
      API.getWeaponCategories()
      .then(response => {
        let mappedCategories = utils.mapCategories(response.data)

        context.commit('updateCategories', mappedCategories)

        if (!context.getters.selectedCategory) {
          context.commit('selectDefaultCategory')
        }
      })
    }
  }
})