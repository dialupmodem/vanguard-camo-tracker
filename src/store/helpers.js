import * as api from '@/api'

const mappers = {
  categories: {
    extension: { selected: false, collapsed: true },
    map(data) {
      return data.map(d => (
        {
          ...d,
          ...this.extension
        }
      ))
    }
  },
  weapons: {
    extension: { selected: false },
    map(data) {
      return data.map(d => (
        {
          ...d,
          ...this.extension
        }
      ))
    }
  },
  weapon: {
    extension: { selected: false },
    map(data) {
      return {
        ...data,
        ...this.extension
      }
    }
  },
  challenges: {
    extension: { updating: false },
    map(data) {
      return data.map(d => (
        {
          ...d,
          ...this.extension
        }
      ))
    }
  },
  challenge: {
    extension: { updating: false },
    map(data) {
      return {
        ...data,
        ...this.extension
      }
    }
  },
  errors: {
    map(error) {
      return {
        isError: true,
        message: (() => {
          if (!error) {
            return 'Unknown Error'
          }

          if (error.response) {
            return `${error.response.data} ${error.response.status} ${error.response.headers}`
          }
          else if (error.message) {
            return error.message
          }
          else {
            return 'Unknown Error'
          }
        })()
      }
    }
  }
}

function loadCategories() {
  return new Promise((resolve, reject) => {
    api.getWeaponCategories()
      .then(response => {
        let mappedCategories = mappers.categories.map(response.data)
        resolve(mappedCategories)
      })
      .catch(error => {
        reject(error)
      })
  })
}
function loadWeapons() {
  return new Promise((resolve, reject) => {
    api.getWeapons()
      .then(response => {
        let mappedWeapons = mappers.weapons.map(response.data)
        resolve(mappedWeapons)
      })
      .catch(error => {
        reject(error)
      })
  })
}
function loadWeapon(weaponId) {
  return new Promise((resolve, reject) => {
    api.getWeapon(weaponId)
      .then(response => {
        let mappedWeapon = mappers.weapon.map(response.data)
        resolve(mappedWeapon)
      })
      .catch(error => {
        reject(error)
      })
  })
}
function loadChallenges(weaponId) {
  return new Promise((resolve, reject) => {
    api.getWeaponChallenges(weaponId)
      .then(response => {
        let mappedChallenge = mappers.challenges.map(response.data)
        resolve(mappedChallenge)
      })
      .catch(error => {
        reject(error)
      })
  })
}
function loadChallenge(challengeId) {
  return new Promise((resolve, reject) => {
    api.getWeaponChallenge(challengeId)
      .then(response => {
        let mappedChallenge = mappers.challenge.map(response.data)
        resolve(mappedChallenge)
      })
      .catch(error => {
        reject(error)
      })
  })
}
function updateChallengeProgress(challengeId, progress) {
  return api.updateChallengeProgress(challengeId, progress)
}
function mapError(error) {
  return mappers.errors.map(error)
}

export {
  loadCategories,
  loadWeapons,
  loadWeapon,
  loadChallenge,
  loadChallenges,
  updateChallengeProgress,
  mapError
}