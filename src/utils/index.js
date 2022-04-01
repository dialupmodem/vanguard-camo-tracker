export default {
  mapCategories(categoriesResponse) {
    return categoriesResponse.map(c => (
      {
        ...c,
        selected: false,
        collapsed: true
      }
    ))
  }
}