import axios from 'axios/dist/axios.js'

let APIUrlBase = process.env.VUE_APP_API_BASE

let GetWeaponCategoriesUrl = `${APIUrlBase}/WeaponCategories`
let GetWeaponsUrl = `${APIUrlBase}/Weapons`
let GetWeaponsInCategoryUrl = `${APIUrlBase}/Weapons/FilterByCategory`
let GetWeaponChallengesUrl = `${APIUrlBase}/WeaponChallenges/FilterByWeapon`
let GetWeaponChallengeUrl = `${APIUrlBase}/WeaponChallenges`
let UpdateChallengeProgressUrl = `${APIUrlBase}/WeaponChallenges/UpdateProgress`

export default {
  getWeaponCategories() {
    return axios
      .get(GetWeaponCategoriesUrl)
  },
  getWeapons() {
    return axios
      .get(GetWeaponsUrl)
  },
  getWeaponsInCategory(categoryId) {
    return axios
      .get(`${GetWeaponsInCategoryUrl}/${categoryId}`)
  },
  getWeapon(weaponId) {
    return axios
      .get(`${GetWeaponsUrl}/${weaponId}`)
  },
  getWeaponChallenges(weaponId) {
    return axios
      .get(`${GetWeaponChallengesUrl}/${weaponId}`)
  },
  getWeaponChallenge(challengeId) {
    return axios
      .get(`${GetWeaponChallengeUrl}/${challengeId}`)
  },
  updateChallengeProgress(challengeId, progress) {
    return axios
      .post(`${UpdateChallengeProgressUrl}/${challengeId}`,
        { progress: progress }
      )
  }
}
