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
    setCategorySelection(state, category) {
      state.categories.forEach(c => {
        c.selected = c.id == category.id
      })
    },
    toggleCategoryCollapse(state, category) {
      let stateCategory = state.categories.find(c => c.id == category.id)
      if (stateCategory) {
        stateCategory.collapsed = !stateCategory.collapsed
      }
    },
    updateWeapons(state, weapons) {
      state.weapons = weapons
    },
    setWeaponSelection(state, weapon) {
      state.weapons.forEach(w => {
        w.selected = w.id == weapon.id
      })
    },
    deselectWeapons(state) {
      utils.deselectAll(state.weapons)
    },
    updateChallenges(state, challenges) {
      state.challenges = challenges
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

      API.getWeaponsInCategory(selectedCategory.id)
      .then(response => {
          let mappedWeapons = utils.mapWeapons(response.data)
          mappedWeapons = utils.mapWeaponCategoryName(mappedWeapons, context.state.categories)
          context.commit('updateWeapons', mappedWeapons)
      })
    },
    getWeaponChallenges(context) {
      let selectedWeapon = context.getters.selectedWeapon

      if (!selectedWeapon) {
        return
      }

      API.getWeaponChallenges(selectedWeapon.id)
      .then(response => context.commit('updateChallenges', response.data))
    },
    selectCategory(context, category) {
      context.commit('setCategorySelection', category)
      context.commit('deselectWeapons')
      context.dispatch('getCategoryWeapons')
    },
    setDefaultCategory(context) {
      if (!context.state.categories) {
        return
      }

      let defaultCategory = context.state.categories[0]
      context.dispatch('selectCategory', defaultCategory)
    },
    selectWeapon(context, weapon) {
      context.commit('setWeaponSelection', weapon)

      let weaponCategory = context.state.categories.find(c => c.weapons.some(w => w.id == weapon.id))

      if (weaponCategory && weaponCategory.collapsed) {
        context.commit('toggleCategoryCollapse', weaponCategory)
      }

      context.dispatch('getWeaponChallenges')
    }
  }
})