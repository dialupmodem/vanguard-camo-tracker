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
          <NavItem
            :categoryCollapse="categoryCollapse"
            :key="categoryCollapse.categoryId"
            @category-change="handleCategoryChange"
            @weapon-change="handleWeaponChange"
            @toggle-collapse="handleToggleCollapse"
            v-for="categoryCollapse in categoryCollapses"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import NavItem from './NavItem.vue'
import CategoryCollapse_ from '@/categories/CategoryCollapse_.js'

export default {
  name: "Nav",
  components: {
    NavItem
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
  },
  created() {
    if (this.weaponCategories == null) {
      return;
    }

    this.weaponCategories.forEach((weaponCategory) => {
      this.categoryCollapses.push(new CategoryCollapse_(weaponCategory))
    });
  }
}
</script>

<style lang="scss" scoped>
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