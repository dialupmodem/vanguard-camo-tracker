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
          <NavItem v-for="category in categories" :category="category" :key="category.id" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import NavItem from './NavItem.vue'
import { mapState } from 'vuex'

export default {
  name: "Nav",
  components: {
    NavItem
  },
  computed: {
    ...mapState({
      categories: state => state.categories.categories
    })
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