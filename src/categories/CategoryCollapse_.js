export default class CategoryCollapse_ {
  constructor(weaponCategory) {
    this.categoryId = weaponCategory.id
    this.categoryName = weaponCategory.name
    this.weapons = weaponCategory.weapons
    this.collapsed = true
  }

  get collapseButtonStyle() {
    let styleObject = {
      transform: this.collapsed ? 'rotate(0deg)' : 'rotate(90deg)'
    }

    return styleObject
  }
  toggleCollapse() {
    this.collapsed = !this.collapsed
  }
}