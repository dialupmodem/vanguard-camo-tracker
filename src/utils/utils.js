function mapCategories(categoriesResponse) {
  return categoriesResponse.map(c => (
    {
      ...c,
      selected: false,
      collapsed: true
    }
  ))
}
function mapWeapons(weaponsResponse) {
  return weaponsResponse.map(w => (
    {
      ...w,
      selected: false
    }
  ))
}
function mapWeaponCategoryName(weapons, categories) {
  return weapons.map(w => (
    {
      ...w,
      categoryName: getWeaponCategoryName(w, categories)
    }
  ))
}
function getWeaponCategoryName(weapon, categories) {
  let category = categories.find(c => c.id == weapon.categoryId)
  if (!category) {
    return null
  }

  return category.name
}
function deselectAll(objectArray) {
  objectArray.forEach(o => {
    o.selected = false
  })
}
function getErrorMessage(error) {
  if (!error) {
    return 'Unspecified Error'
  }

  if (error.response) {
    return `${error.response.data} ${error.response.status} ${error.response.headers}`
  }
  else if (error.message) {
    return `${error.message}`
  }
  else {
    return 'Unspecified Error'
  }
}
function mapError(error) {
  return {
    isError: true,
    message: getErrorMessage(error)
  }
}

export {
  mapCategories,
  mapWeapons,
  mapWeaponCategoryName,
  getWeaponCategoryName,
  deselectAll,
  mapError
}