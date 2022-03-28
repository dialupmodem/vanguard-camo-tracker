export default class CategoryCollapses {
  constructor() {
    this.collapses = []
  }

  GetCollapse(categoryId) {
    let collapse = this.collapses.find(c => c.id == categoryId)
    if (!collapse) {
      return null
    }

    return collapse
  }
  ToggleCollapse(categoryId) {
    let collapse = this.GetCollapse(categoryId)
    if (!collapse) {
      return null
    }

    collapse.collapsed = !collapse.collapsed
  }
  IsCollapsed(categoryId) {
    let collapse = this.GetCollapse(categoryId)
    if (!collapse) {
      return null
    }

    return collapse.collapsed
  }
  GetButtonStyle(categoryId) {
    let isCollapsed = this.IsCollapsed(categoryId);

    let styleObject = {
      transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)'
    }

    return styleObject
  }
}