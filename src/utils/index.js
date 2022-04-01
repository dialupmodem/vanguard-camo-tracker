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
  }
}