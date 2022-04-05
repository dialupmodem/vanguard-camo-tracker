import API from '@/api/api.js'

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

      commit('setDataLoading', true, { root: true })

      API.getWeaponChallenges(selectedWeapon.id)
        .then(response => {
          commit('update', response.data)
          commit('setDataLoading', false, {root: true})
        })
    }
  }
}

export default challenges