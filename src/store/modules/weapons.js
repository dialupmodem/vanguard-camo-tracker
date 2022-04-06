import { getWeapons as loadWeapons } from '@/api'
import { deselectAll, mapWeapons, mapWeaponCategoryName } from '@/utils'

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
      deselectAll(state.weapons)
    }
  },
  actions: {
    getWeapons({commit, rootState}) {
      commit('setDataLoading', true, { root: true })

      loadWeapons()
        .then(response => {
          let mappedWeapons = mapWeapons(response.data)
          mappedWeapons = mapWeaponCategoryName(mappedWeapons, rootState.categories.categories)
          commit('update', mappedWeapons)
          commit('setDataLoading', false, { root: true })
        })
    },
    selectWeapon({ commit, dispatch, rootState }, weapon) {
      let weaponCategory = rootState.categories.categories.find(c => c.weapons.some(w => w.id == weapon.id))

      if (weaponCategory) {
        if (weaponCategory.collapsed) {
          commit('categories/toggleCollapsed', weaponCategory, { root: true })
        }
        commit('setSelected', weapon)
      }

      dispatch('challenges/getChallenges', null, { root: true })
    }
  },
  getters: {
    selectedWeapon(state) {
      let selectedWeapon = state.weapons.find(w => w.selected)
      if (!selectedWeapon) {
        return null
      }

      return selectedWeapon
    },
    selectedWeapons(state, getters, rootState, rootGetters) {
      let selectedCategory = rootGetters['categories/selectedCategory']
      if (!selectedCategory) {
        return null
      }

      let selectedWeapons = state.weapons.filter(w => w.categoryId == selectedCategory.id)
      if (!selectedWeapons) {
        return null
      }

      return selectedWeapons
    },
    weaponsInCategory: (state) => (categoryId) => {
      let categoryWeapons = state.weapons.filter(w => w.categoryId == categoryId)
      if (!categoryWeapons) {
        return null
      }
      
      return categoryWeapons
    }
  }
}

export default weapons