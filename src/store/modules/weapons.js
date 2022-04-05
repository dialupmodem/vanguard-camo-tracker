import API from '@/api/api.js'
import { deselectAll, mapWeapons, mapWeaponCategoryName } from '@/utils/utils'

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
        if (w.selected) {
          console.log(w)
        }
      })

    },
    deselectAll(state) {
      deselectAll(state.weapons)
    }
  },
  actions: {
    getCategoryWeapons({ commit, rootGetters, rootState }) {
      let selectedCategory = rootGetters['categories/selectedCategory']
      if (!selectedCategory) {
        return
      }

      commit('setDataLoading', true, { root: true })

      API.getWeaponsInCategory(selectedCategory.id)
        .then(response => {
          let mappedWeapons = mapWeapons(response.data)
          mappedWeapons = mapWeaponCategoryName(mappedWeapons, rootState.categories.categories)
          commit('update', mappedWeapons)
          commit('setDataLoading', false, { root: true })
        })
        .catch((error) => {
          commit('setDataError', error, { root: true })
        })
    },
    selectWeapon({ commit, dispatch, rootState }, weapon) {
      let weaponCategory = rootState.categories.categories.find(c => c.weapons.some(w => w.id == weapon.id))

      if (weaponCategory) {
        if (weaponCategory.collapsed) {
          commit('categories/toggleCollapsed', weaponCategory, { root: true })
        }
        dispatch('categories/selectCategory', { category: weaponCategory, weapon: weapon }, { root: true })
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

export default weapons