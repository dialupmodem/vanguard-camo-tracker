import API from '@/api/api.js'

const challenges = {
  namespaced: true,
  state: () => ({
    challenges: []
  }),
  mutations: {
    update(state, challenges) {
      state.challenges = challenges
    },
    updateChallenge(state, challenge) {
      let stateChallenge = state.challenges.find(c => c.id == challenge.id)
      if (!stateChallenge) {
        return
      }

      let challengeIndex = state.challenges.indexOf(stateChallenge)
      if (!(challengeIndex > -1)) {
        return
      }

      state.challenges.splice(challengeIndex, 1, challenge)
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
          commit('setDataLoading', false, { root: true })
        })
        .catch(() => {
          commit('setDataError', true, { root: true })
        })
    },
    getWeaponChallenge({ commit, rootState }, challengeId) {
      if (!rootState.dataUpdating) {
        commit('setDataUpdating', true, { root: true })
      }

      API.getWeaponChallenge(challengeId)
        .then(response => {
          commit('updateChallenge', response.data)
          commit('setDataUpdating', false, { root: true })
        })
        .catch(() => {
          commit('setDataError', true, { root: true })
        })
    },
    updateChallengeProgress({ commit, dispatch }, { challengeId, progressValue }) {
      commit('setDataUpdating', true, { root: true })

      API.updateChallengeProgress(challengeId, progressValue)
        .then(() => {
          dispatch('getWeaponChallenge', challengeId)
        })
        .catch(() => {
          commit('setDataError', true, { root: true })
        })
    }
  }
}

export default challenges