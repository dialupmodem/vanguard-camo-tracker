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
                  class="category-collapse-button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#categoryCollapse-${weaponCategory.id}`"
                  :style="getCollapseButtonStyle(weaponCategory.id)"
                  @click="toggleCategoryCollapse(weaponCategory.id)"
                >
                  <i class="bi-chevron-right"></i>
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <WeaponNav :weaponCategory="weaponCategory" @change-weapon="handleWeaponChange"></WeaponNav>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import WeaponNav from './WeaponNav.vue'
import CategoryCollapses from '@/categories/CategoryCollapses.js'

export default {
  name: "CategoryNav",
  components: {
    WeaponNav
  },
  props: {
    weaponCategories: Array,
    activeCategoryId: Number
  },
  data() {
    return {
      categoryCollapses: new CategoryCollapses()
    };
  },
  methods: {
    changeCategory(categoryId) {
      this.$emit("category-change", categoryId);
    },
    handleWeaponChange(weaponId) {
      this.$emit("weapon-change", weaponId);
    },
    isActiveCategory(categoryId) {
      return this.activeCategoryId == categoryId;
    },
    getCategoryCollapse(categoryId) {
      return this.categoryCollapses.GetCollapse(categoryId)
    },
    toggleCategoryCollapse(categoryId) {
      this.categoryCollapses.ToggleCollapse(categoryId)
    },
    getCollapseButtonStyle(categoryId) {
      return this.categoryCollapses.GetButtonStyle(categoryId)
    },
    isCategoryCollapsed(categoryId) {
      return this.categoryCollapses.IsCollapsed(categoryId)
    }
  },
  created() {
    if (this.weaponCategories == null) {
      return;
    }

    this.weaponCategories.forEach((category) => {
      this.categoryCollapses.collapses.push({
        id: category.id,
        collapsed: true
      });
    });
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
.category-collapse-button {
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
</style>