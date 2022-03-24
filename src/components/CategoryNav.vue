<template>
  <div>
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
      <div id="navCollapse" class="collapse mt-4">
        <ul class="nav flex-column">
          <li class="nav-item" :key="weaponCategory.id" v-for="weaponCategory in weaponCategories">
            <a
              href="#"
              class="nav-link"
              :class="{ active: isActiveCategory(weaponCategory.id) }"
              @click="changeCategory(weaponCategory.id)"
            >{{ weaponCategory.name }}</a>
          </li>
        </ul>
      </div>
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
  methods: {
    changeCategory(categoryId) {
      this.$emit('category-change', categoryId)
    },
    isActiveCategory(categoryId) {
      return this.activeCategoryId == categoryId
    }
  }

}
</script>

<style lang="scss" scoped>
.nav-link {
  color: #fffafa;
  text-align: left;

  @media screen and (max-width: map-get($grid-breakpoints, lg)) {
    text-align: center;
  }
}
.nav-link:hover,
.nav-link:focus,
.active {
  color: #909090;
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


.collapse {
  @media screen and (min-width: map-get($grid-breakpoints, lg)) {
    display: block !important;
  }
}
</style>