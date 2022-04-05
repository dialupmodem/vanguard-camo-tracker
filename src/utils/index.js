export default {

  mapCategories(categoriesResponse) {
    return categoriesResponse.map(c => (
      {
        ...c,
        selected: false,
        collapsed: true
      }
    ))
  },
  mapWeapons(weaponsResponse) {
    return weaponsResponse.map(w => (
      {
        ...w,
        selected: false,
      }
    ))
  },
  mapWeaponCategoryName(weapons, categories) {
    return weapons.map(w => (
      {
        ...w,
        categoryName: () => {
          let categoryName = this.getWeaponCategoryName(w, categories)
          if (!categoryName) {
            return null
          }

          return categoryName
        }
      }
    ))
  },
  getWeaponCategoryName(weapon, categories) {
    let category = categories.find(c => c.id == weapon.categoryId)
    return category
  },
  deselectAll(objectArray) {
    objectArray.forEach(o => {
      o.selected = false
    })
  },
  getErrorMessage(error) {
    if (!error) {
      return 'Unspecified Error'
    }

    console.log(error)
    window.error = error

    if (error.response) {
      return `${error.response.data} ${error.response.status} ${error.response.headers}`
    }
    else if (error.message) {
      return `${error.message}`
    }
    else {
      return 'Unspecified Error'
    }
  },
  mapError(error) {
    return {
      isError: true,
      message: this.getErrorMessage(error)
    }
  }
}