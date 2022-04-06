import { loadChallenges, loadChallenge, updateChallengeProgress } from "@/store/helpers"

const challenges = {
  namespaced: true,
  state: () => ({
    challenges: [],
    dataLoading: false
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
    setLoading(state, isLoading) {
      state.dataLoading = isLoading
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
    getChallenges({ rootGetters, commit }) {
      let selectedWeapon = rootGetters['weapons/selectedWeapon']
      if (!selectedWeapon) {
        return
      }

      commit('setLoading', true)
      loadChallenges(selectedWeapon.id)
        .then(challenges => {
          commit('update', challenges)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setDataError', error, { root: true })
          commit('setLoading', false)
        })

    },
    getWeaponChallenge({ state, commit }, challengeId) {

      let stateChallenge = state.challenges.find(c => c.id == challengeId)
      if (!stateChallenge.updating) {
        commit('setUpdating', { challenge: stateChallenge, isUpdating: true })
      }

      loadChallenge(challengeId)
        .then(challenge => {
          commit('updateChallenge', challenge)
        })
        .catch(error => {
          commit('setDataError', error, { root: true })
        })
    },
    updateChallengeProgress({ state, commit, dispatch }, { challengeId, progressValue }) {

      let stateChallenge = state.challenges.find(c => c.id == challengeId)
      let challengeUpdate = {
        challenge: stateChallenge,
        isUpdating: true
      }

      commit('setUpdating', challengeUpdate)

      updateChallengeProgress(challengeId, progressValue)
        .then(() => {
          dispatch('getWeaponChallenge', challengeId)
          dispatch('weapons/getWeapon', stateChallenge.weaponId, { root: true })
        })
        .catch((error) => {
          commit('setDataError', error, { root: true })

          challengeUpdate.isUpdating = false
          commit('setUpdating', challengeUpdate)
        })
    }
  }
}

export default challenges