import axios from 'axios/dist/axios.js'

let APIUrlBase = process.env.VUE_APP_API_BASE

let GetWeaponCategoriesUrl = `${APIUrlBase}/WeaponCategories`
let GetWeaponsUrl = `${APIUrlBase}/Weapons`
let GetWeaponChallengesUrl = `${APIUrlBase}/WeaponChallenges/FilterByWeapon`
let GetWeaponChallengeUrl = `${APIUrlBase}/WeaponChallenges`
let UpdateChallengeProgressUrl = `${APIUrlBase}/WeaponChallenges/UpdateProgress`

function getWeaponCategories() {
  return axios
    .get(GetWeaponCategoriesUrl)
}
function getWeapons() {
  return axios
    .get(GetWeaponsUrl)
}
function getWeapon(weaponId) {
  return axios
    .get(`${GetWeaponsUrl}/${weaponId}`)
}
function getWeaponChallenge(challengeId) {
  return axios
    .get(`${GetWeaponChallengeUrl}/${challengeId}`)
}
function getWeaponChallenges(weaponId) {
  return axios
    .get(`${GetWeaponChallengesUrl}/${weaponId}`)
}
function updateChallengeProgress(challengeId, progress) {
  return axios
    .post(`${UpdateChallengeProgressUrl}/${challengeId}`, { progress: progress })
}
export {
  getWeaponCategories,
  getWeapons,
  getWeapon,
  getWeaponChallenge,
  getWeaponChallenges,
  updateChallengeProgress
}