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

    <div id="navCollapse" class="collapse menu-collapse">
      <div class="nav-container pb-4">
        <ul class="nav flex-column flex-nowrap">
          <li
            class="nav-item"
            :key="categoryCollapse.categoryId"
            v-for="categoryCollapse in categoryCollapses"
          >
            <div class="container-fluid w-100">
              <CategoryNavItem
                :categoryCollapse="categoryCollapse"
                :isActive="false"
                @category-change="handleCategoryChange"
                @toggle-collapse="handleToggleCollapse"
              ></CategoryNavItem>
              <CategoryWeaponsNav
                :weapons="categoryCollapse.weapons"
                :categoryId="categoryCollapse.categoryId"
                @change-weapon="handleWeaponChange"
              ></CategoryWeaponsNav>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import CategoryNavItem from './CategoryNavItem.vue'
import CategoryWeaponsNav from './CategoryWeaponsNav.vue'
import CategoryCollapse from '@/categories/CategoryCollapse.js'

export default {
  name: "CategoryNav",
  components: {
    CategoryNavItem,
    CategoryWeaponsNav
  },
  props: {
    weaponCategories: {
      type: Array,
      required: true
    },
    activeCategoryId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      categoryCollapses: []
    };
  },
  methods: {
    handleCategoryChange(categoryId) {
      this.$emit("category-change", categoryId);
    },
    handleWeaponChange(weaponId) {
      this.$emit("weapon-change", weaponId);
    },
    handleToggleCollapse(categoryCollapse) {
      categoryCollapse.toggleCollapse()
    },
    isActiveCategory(categoryId) {
      return this.activeCategoryId == categoryId;
    },
    getCategoryCollapse(categoryId) {
      return this.categoryCollapses.GetCollapse(categoryId)
    },
    toggleCategoryCollapse(categoryId) {
      this.categoryCollapses.toggleCollapse(categoryId)
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

    this.weaponCategories.forEach((weaponCategory) => {
      this.categoryCollapses.push(new CategoryCollapse(weaponCategory))
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
.menu-collapse {
  @media screen and (min-width: map-get($grid-breakpoints, lg)) {
    display: block !important;
  }
}
</style>