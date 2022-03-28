<template>
  <div class="w-100">
    <div class="menu-toggle-container">
      <button
        type="button"
        class="menu-toggle"
        data-bs-toggle="collapse"
        data-bs-target="#navCollapse"
      >
        <i class="bi-list"></i>
      </button>
    </div>
    <h4 class="mt-3 header">Vanguard Camo Tracker</h4>
    <hr />
    <div class="nav-container pb-4">
      <ul class="nav flex-column flex-nowrap">
        <li class="nav-item" :key="weaponCategory.id" v-for="weaponCategory in weaponCategories">
          <div class="container-fluid w-100">
            <div class="row flex-nowrap">
              <div class="col-10 p-0 align-self-center">
                <button
                  type="button"
                  class="nav-link pe-0 ps-0 m-0"
                  :class="{ active: isActiveCategory(weaponCategory.id) }"
                  @click="changeCategory(weaponCategory.id)"
                >
                  {{
                    weaponCategory.name
                  }}
                </button>
              </div>
              <div class="col-2 align-self-center justify-self-end">
                <button
                  type="button"
                  class="category-accordion"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#categoryCollapse-${weaponCategory.id}`"
                  :style="getAccordionButtonStyle(weaponCategory.id)"
                  @click="toggleCategoryAccordion(weaponCategory.id)"
                >
                  <i :class="getAccordionIconClass(weaponCategory.id)"></i>
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="collapse" :id="`categoryCollapse-${weaponCategory.id}`">
                  <ul class="nav flex-column flex-nowrap">
                    <li class="nav-item" :key="weapon.id" v-for="weapon in weaponCategory.weapons">
                      <a
                        class="nav-link"
                        href="#"
                        @click="changeWeapon(weapon.id)"
                      >{{ weapon.name }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- <div class="row">
              <div class="col">
                <div class="accordion-container">
                  <transition name="expand">
                    <div
                      class="accordion-content"
                      :key="`${weaponCategory.id}-accordion`"
                      v-if="isCategoryAccordionExpanded(weaponCategory.id)"
                    >
                      <ul class="nav flex-column flex-nowrap">
                        <li
                          class="nav-item"
                          :key="weapon.id"
                          v-for="weapon in weaponCategory.weapons"
                        >
                          <a
                            class="nav-link"
                            href="#"
                            @click="changeWeapon(weapon.id)"
                          >{{ weapon.name }}</a>
                        </li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </div>
            </div>-->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryNav',
  props: {
    weaponCategories: Array,
    activeCategoryId: Number
  },
  data() {
    return {
      categoryAccordions: []
    }
  },
  methods: {
    changeCategory(categoryId) {
      this.$emit('category-change', categoryId)
    },
    changeWeapon(weaponId) {
      this.$emit('weapon-change', weaponId)
    },
    isActiveCategory(categoryId) {
      return this.activeCategoryId == categoryId
    },
    toggleCategoryAccordion(categoryId) {
      let categoryAccordion = this.categoryAccordions.find(c => c.id == categoryId)
      if (!categoryAccordion) {
        return
      }
      categoryAccordion.expanded = !categoryAccordion.expanded
    },
    getAccordionIconClass(categoryId) {
      let categoryAccordion = this.categoryAccordions.find(c => c.id == categoryId)
      if (!categoryAccordion) {
        return
      }

      //let iconClass = categoryAccordion.expanded ? 'bi-chevron-down' : 'bi-chevron-right'
      let iconClass = 'bi-chevron-right'
      return iconClass
    },
    getAccordionButtonStyle(categoryId) {
      let isCategoryExpanded = this.isCategoryAccordionExpanded(categoryId)

      let styleObject = {
        transform: isCategoryExpanded ? "rotate(90deg)" : "rotate(0deg)"
      }

      return styleObject
    },
    getAccordionContentStyle(categoryId) {
      let category = this.weaponCategories.find(c => c.id == categoryId)

      let styleObject = {
        maxHeight: `${40 * category.weapons.length}px`
      }

      return styleObject
    },
    isCategoryAccordionExpanded(categoryId) {
      let categoryAccordion = this.categoryAccordions.find(c => c.id == categoryId)
      if (!categoryAccordion) {
        return false
      }

      return categoryAccordion.expanded
    }
  },
  created() {
    if (this.weaponCategories == null) {
      return;
    }
    this.weaponCategories.forEach((category) => {
      this.categoryAccordions.push({
        id: category.id,
        expanded: false
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.nav-link {
  color: #fffafa;
  text-align: left;
  background-color: transparent;
  border: none;

  @media screen and (max-width: map-get($grid-breakpoints, lg)) {
    text-align: center;
  }
}
.nav-link:hover,
.nav-link:focus,
.active {
  color: #909090;
}
.category-accordion {
  background-color: transparent;
  border: none;
  color: #fffafa;
  transition: transform 0.5s;
}
h4,
hr {
  color: #fffafa;
}
.header {
  @media screen and (max-width: 380px) {
    text-align: center;
    margin: auto;
    max-width: 100px;
  }
}
.menu-toggle-container {
  float: left;
  position: absolute;
  display: none;

  @media screen and (max-width: map-get($grid-breakpoints, lg)) {
    display: block;
  }
}
.menu-toggle {
  background-color: $nav-bg;
  color: #fffafa;
  border-style: solid;
  border-width: 1px;

  :active {
    color: #909090;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: max-height 0.5s;
}
.fade-enter,
.fade-leave-to {
  max-height: 100%;
}
.accordion-container {
  overflow: hidden;
}
.accordion-content {
}
.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s;
}
.expand-enter,
.expand-leave-to {
  max-height: 0;
}
</style>