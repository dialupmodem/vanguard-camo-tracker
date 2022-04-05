import API from '@/api/api.js'
import utils from '@/utils/'

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

      commit('setDataLoading', true, { root: true })

      API.getWeaponsInCategory(selectedCategory.id)
        .then(response => {
          let mappedWeapons = utils.mapWeapons(response.data)
          mappedWeapons = utils.mapWeaponCategoryName(mappedWeapons, rootState.categories.categories)
          commit('update', mappedWeapons)
          commit('setDataLoading', false, { root: true })
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

export default weapons