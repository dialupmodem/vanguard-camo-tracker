import { loadWeapons, loadWeapon } from '@/store/helpers'

const weapons = {
  namespaced: true,
  state: () => ({
    weapons: [],
    dataLoading: false
  }),
  mutations: {
    update(state, weapons) {
      state.weapons = weapons
    },
    updateWeapon(state, weapon) {
      let stateWeapon = state.weapons.find(w => w.id == weapon.id)
      if (!stateWeapon) {
        return
      }

      let stateWeaponIndex = state.weapons.indexOf(stateWeapon)
      if (!(stateWeaponIndex > -1)) {
        return
      }

      weapon.selected = stateWeapon.selected

      state.weapons.splice(stateWeaponIndex, 1, weapon)
    },
    setLoading(state, isLoading) {
      state.dataLoading = isLoading
    },
    setSelected(state, weapon) {
      state.weapons.forEach(w => {
        w.selected = w.id == weapon.id
      })

    },
    deselectAll(state) {
      state.weapons.forEach(w => {
        w.selected = false
      })
    }
  },
  actions: {
    getWeapons({ commit }) {
      commit('setLoading', true)

      loadWeapons()
        .then(weapons => {
          commit('update', weapons)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setDataError', error, { root: true })
        })
    },
    getWeapon({ commit }, weaponId) {
      loadWeapon(weaponId)
        .then(weapon => {
          commit('updateWeapon', weapon)
        })
    },
    selectWeapon({ commit, dispatch, rootState }, weapon) {
      let weaponCategory = rootState.categories.categories.find(c => c.weapons.some(w => w.id == weapon.id))

      if (weaponCategory) {
        if (weaponCategory.collapsed) {
          commit('categories/toggleCollapsed', weaponCategory, { root: true })
        }
        if (!weaponCategory.selected) {
          commit('categories/setSelected', weaponCategory, { root: true })
        }
        commit('setSelected', weapon)
        dispatch('challenges/getChallenges', null, { root: true })
      }

      
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