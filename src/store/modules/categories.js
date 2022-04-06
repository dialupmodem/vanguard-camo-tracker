import { loadCategories } from '@/store//helpers'

const categories = {
  namespaced: true,
  state: () => ({
    categories: [],
    dataLoading: false
  }),
  mutations: {
    update(state, categories) {
      state.categories = categories

      let selectedCategory = state.categories.find(c => c.selected)
      
      if (!selectedCategory) {
        if (state.categories) {
          let defaultCategory = state.categories[0]
          defaultCategory.selected = true
        }
      }
    },
    setLoading(state, isLoading) {
      state.dataLoading = isLoading
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
    getCategories({ commit }) {
      commit('setLoading', true)

      loadCategories()
        .then(categories => {
          commit('update', categories)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setDataError', error, { root: true })
          commit('setLoading', false)
        })
    },
    selectCategory({ commit }, category) {
      commit('setSelected', category)
      commit('weapons/deselectAll', null, { root: true })
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