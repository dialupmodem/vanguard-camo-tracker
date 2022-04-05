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
    getCategories(context) {
      context.commit('setDataLoading', true, { root: true })

      API.getWeaponCategories()
        .then(response => {
          let mappedCategories = mapCategories(response.data)

          context.commit('update', mappedCategories)

          if (!context.getters.selectedCategory) {
            context.dispatch('setDefaultCategory')
          }

          context.commit('setDataLoading', false, { root: true })
        })
        .catch((error) => {
          context.commit('setDataError', error, { root: true })
        })
    },
    selectCategory(context, category) {
      context.commit('setSelected', category)
      context.commit('weapons/deselectAll', null, { root: true })
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

export default categories