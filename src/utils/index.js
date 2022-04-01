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
  deselectAll(objectArray) {
    objectArray.forEach(o => {
      o.selected = false
    })
  }
}