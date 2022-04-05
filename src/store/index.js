import Vue from 'vue'
import Vuex from 'vuex'

import API from '@/api/api.js'
import utils from '@/utils/'

Vue.use(Vuex)

const categories = {
  namespaced: true,
  state: () => ({
    categories: []
  }),
  mutations: {
    update(state, categories) {
      state.categories = categories
    },
    setSelected(state, category) {
      state.categories.forEach(c => {
        c.selected = c.id == category.id
      })
    },
    toggleCollapsed(state, category) {
      let stateCategory = state.categories.find(c => c.id == category.id)
      if (!stateCategory) {
        return
      }
      stateCategory.collapsed = !stateCategory.collapsed
    }
  },
  actions: {
    getCategories(context) {
      API.getWeaponCategories()
        .then(response => {
          let mappedCategories = utils.mapCategories(response.data)

          context.commit('update', mappedCategories)

          if (!context.getters.selectedCategory) {
            context.dispatch('setDefaultCategory')
          }
        })
    },
    selectCategory(context, category) {
      context.commit('setSelected', category)
      context.commit('weapons/deselectAll', null, { root: true })
      context.dispatch('weapons/getCategoryWeapons', null, { root: true })
    },
    setDefaultCategory(context) {
      if (!context.state.categories) {
        return
      }

      let defaultCategory = context.state.categories[0]
      context.dispatch('selectCategory', defaultCategory)
    },

  },
  getters: {
    selectedCategory(state) {
      let selectedCategory = state.categories.find(c => c.selected)
      if (!selectedCategory) {
        return null
      }

      return selectedCategory
    }
  }
}
const weapons = {
  namespaced: true,
  state: () => ({
    weapons: []
  }),
  mutations: {
    update(state, weapons) {
      state.weapons = weapons
    },
    setSelected(state, weapon) {
      state.weapons.forEach(w => {
        w.selected = w.id == weapon.id
      })
    },
    deselectAll(state) {
      utils.deselectAll(state.weapons)
    }
  },
  actions: {
    getCategoryWeapons({ commit, rootGetters, rootState }) {
      let selectedCategory = rootGetters['categories/selectedCategory']
      if (!selectedCategory) {
        return
      }

      API.getWeaponsInCategory(selectedCategory.id)
        .then(response => {
          let mappedWeapons = utils.mapWeapons(response.data)
          mappedWeapons = utils.mapWeaponCategoryName(mappedWeapons, rootState.categories.categories)
          commit('update', mappedWeapons)
        })
    },
    selectWeapon({ commit, dispatch, rootState }, weapon) {
      commit('setSelected', weapon)

      let weaponCategory = rootState.categories.categories.find(c => c.weapons.some(w => w.id == weapon.id))

      if (weaponCategory && weaponCategory.collapsed) {
        commit('categories/toggleCollapsed', weaponCategory, { root: true })
      }

      dispatch('challenges/getWeaponChallenges', null, { root: true })
    }
  },
  getters: {
    selectedWeapon(state) {
      let selectedWeapon = state.weapons.find(w => w.selected)
      if (!selectedWeapon) {
        return null
      }

      return selectedWeapon
    }
  }
}
const challenges = {
  namespaced: true,
  state: () => ({
    challenges: []
  }),
  mutations: {
    update(state, challenges) {
      state.challenges = challenges
    }
  },
  actions: {
    getWeaponChallenges({ rootGetters, commit }) {
      let selectedWeapon = rootGetters['weapons/selectedWeapon']
      if (!selectedWeapon) {
        return
      }

      API.getWeaponChallenges(selectedWeapon.id)
        .then(response => commit('update', response.data))
    }
  }
}

export default new Vuex.Store({
  modules: {
    categories,
    weapons,
    challenges
  }
  // state: {
  //   categories: [],
  //   weapons: [],
  //   challenges: []
  // },
  // mutations: {
  //   updateCategories(state, categories) {
  //     state.categories = categories
  //   },
  //   setCategorySelection(state, category) {
  //     state.categories.forEach(c => {
  //       c.selected = c.id == category.id
  //     })
  //   },
  //   toggleCategoryCollapse(state, category) {
  //     let stateCategory = state.categories.find(c => c.id == category.id)
  //     if (stateCategory) {
  //       stateCategory.collapsed = !stateCategory.collapsed
  //     }
  //   },
  //   updateWeapons(state, weapons) {
  //     state.weapons = weapons
  //   },
  //   setWeaponSelection(state, weapon) {
  //     state.weapons.forEach(w => {
  //       w.selected = w.id == weapon.id
  //     })
  //   },
  //   deselectWeapons(state) {
  //     utils.deselectAll(state.weapons)
  //   },
  //   updateChallenges(state, challenges) {
  //     state.challenges = challenges
  //   }
  // },
  // getters: {
  //   selectedCategory(state) {
  //     let selectedCategory = state.categories.find(c => c.selected)
  //     if (!selectedCategory) {
  //       return null
  //     }

  //     return selectedCategory
  //   },
  //   selectedWeapon(state) {
  //     let selectedWeapon = state.weapons.find(w => w.selected)
  //     if (!selectedWeapon) {
  //       return null
  //     }

  //     return selectedWeapon
  //   }
  // },
  // actions: {
  //   getCategories(context) {
  //     API.getWeaponCategories()
  //       .then(response => {
  //         let mappedCategories = utils.mapCategories(response.data)

  //         context.commit('updateCategories', mappedCategories)

  //         if (!context.getters.selectedCategory) {
  //           context.dispatch('setDefaultCategory')
  //         }
  //       })
  //   },
  //   getCategoryWeapons(context) {
  //     let selectedCategory = context.getters.selectedCategory

  //     API.getWeaponsInCategory(selectedCategory.id)
  //       .then(response => {
  //         let mappedWeapons = utils.mapWeapons(response.data)
  //         mappedWeapons = utils.mapWeaponCategoryName(mappedWeapons, context.state.categories)
  //         context.commit('updateWeapons', mappedWeapons)
  //       })
  //   },
  //   getWeaponChallenges(context) {
  //     let selectedWeapon = context.getters.selectedWeapon

  //     if (!selectedWeapon) {
  //       return
  //     }

  //     API.getWeaponChallenges(selectedWeapon.id)
  //       .then(response => context.commit('updateChallenges', response.data))
  //   },
  //   selectCategory(context, category) {
  //     context.commit('setCategorySelection', category)
  //     context.commit('deselectWeapons')
  //     context.dispatch('getCategoryWeapons')
  //   },
  //   setDefaultCategory(context) {
  //     if (!context.state.categories) {
  //       return
  //     }

  //     let defaultCategory = context.state.categories[0]
  //     context.dispatch('selectCategory', defaultCategory)
  //   },
  //   selectWeapon(context, weapon) {
  //     context.commit('setWeaponSelection', weapon)

  //     let weaponCategory = context.state.categories.find(c => c.weapons.some(w => w.id == weapon.id))

  //     if (weaponCategory && weaponCategory.collapsed) {
  //       context.commit('toggleCategoryCollapse', weaponCategory)
  //     }

  //     context.dispatch('getWeaponChallenges')
  //   }
  // }
})