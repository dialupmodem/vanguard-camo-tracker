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
    setCategorySelected(state, category) {
      state.categories.forEach(c => {
        c.selected = c.id == category.id
      })
    },
    updateWeapons(state, weapons) {
      state.weapons = weapons
    }
  },
  getters: {
    selectedCategory(state) {
      let selectedCategory = state.categories.find(c => c.selected)
      if (!selectedCategory) {
        return null
      }

      return selectedCategory
    },
    selectedWeapon(state) {
      let selectedWeapon = state.weapons.find(w => w.selected)
      if (!selectedWeapon) {
        return null
      }

      return selectedWeapon
    }
  },
  actions: {
    getCategories(context) {
      API.getWeaponCategories()
      .then(response => {
        let mappedCategories = utils.mapCategories(response.data)

        context.commit('updateCategories', mappedCategories)

        if (!context.getters.selectedCategory) {
          context.dispatch('setDefaultCategory')
        }
      })
    },
    getCategoryWeapons(context) {
      let selectedCategory = context.getters.selectedCategory
      console.log(selectedCategory)

      API.getWeaponsInCategory(selectedCategory.id)
      .then(response => {
          let mappedWeapons = utils.mapWeapons(response.data)
          context.commit('updateWeapons', mappedWeapons)
      })
    },
    selectCategory(context, category) {
      context.commit('setCategorySelected', category)
      context.dispatch('getCategoryWeapons')
    },
    setDefaultCategory(context) {
      if (!context.state.categories) {
        return
      }

      let defaultCategory = context.state.categories[0]
      context.dispatch('selectCategory', defaultCategory)
    }
  }
})