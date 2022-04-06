import API from '@/api/api.js'
import { mapChallenge, mapChallenges } from '@/utils/utils'

const challenges = {
  namespaced: true,
  state: () => ({
    challenges: []
  }),
  mutations: {
    update(state, challenges) {
      state.challenges = challenges
    },
    setUpdating(state, { challenge, isUpdating }) {
      let stateChallenge = state.challenges.find(c => c.id == challenge.id)
      if (!stateChallenge) {
        return
      }

      stateChallenge.updating = isUpdating
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
          let mappedChallenges = mapChallenges(response.data)

          commit('update', mappedChallenges)
          commit('setDataLoading', false, { root: true })
        })
        .catch((error) => {
          commit('setDataError', error, { root: true })
        })
    },
    getWeaponChallenge({ state, commit }, challengeId) {

      let stateChallenge = state.challenges.find(c => c.id == challengeId)
      if (!stateChallenge.updating) {
        commit('setUpdating', { challenge: stateChallenge, isUpdating: true })
      }


      API.getWeaponChallenge(challengeId)
        .then(response => {
          let mappedChallenge = mapChallenge(response.data)

          commit('updateChallenge', mappedChallenge)
        })
        .catch((error) => {
          commit('setDataError', error, { root: true })
        })
    },
    updateChallengeProgress({ state, commit, dispatch }, { challengeId, progressValue }) {

      let stateChallenge = state.challenges.find(c => c.id == challengeId)
      commit('setUpdating', { challenge: stateChallenge, isUpdating: true })

      API.updateChallengeProgress(challengeId, progressValue)
        .then(() => {
          dispatch('getWeaponChallenge', challengeId)
        })
        .catch((error) => {
          commit('setDataError', error, { root: true })
        })
    }
  }
}

export default challenges