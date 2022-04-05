import API from '@/api/api.js'
import { mapCategories } from '@/utils/utils'

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
    getCategories({ commit, dispatch, getters }) {
      commit('setDataLoading', true, { root: true })

      API.getWeaponCategories()
        .then(response => {
          let mappedCategories = mapCategories(response.data)

          commit('update', mappedCategories)

          if (!getters.selectedCategory) {
            dispatch('setDefaultCategory')
          }

          commit('setDataLoading', false, { root: true })
        })
        .catch((error) => {
          commit('setDataError', error, { root: true })
        })
    },
    selectCategory({ commit }, category) {
      commit('setSelected', category)
      commit('weapons/deselectAll', null, { root: true })
    },
    setDefaultCategory({ state, dispatch }) {
      if (!state.categories) {
        return
      }

      let defaultCategory = state.categories[0]
      dispatch('selectCategory', defaultCategory)
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

export default categories