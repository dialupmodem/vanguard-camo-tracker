<template>
  <div class="row flex-nowrap justify-content-center">
    <div class="col-4 col-lg-10 p-0 align-self-center">
      <button
        type="button"
        class="nav-link pe-0 ps-0 m-0"
        :class="categoryButtonClass"
        @click="changeCategory"
      >{{ category.name }}</button>
    </div>
    <div class="col-2 align-self-center">
      <button
        type="button"
        class="category-collapse-button"
        data-bs-toggle="collapse"
        :style="collapseButtonStyle"
        @click="toggleCollapse"
      >
        <i class="bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavButtons',
  props: {
    category: {
      type: Object,
      required: true
    },
  },
  methods: {
    changeCategory() {
      this.$store.dispatch('selectCategory', this.category)
    },
    toggleCollapse() {
      this.$store.commit('toggleCategoryCollapse', this.category)
    }
  },
  computed: {
    isActive() {
      return this.category.selected
    },
    categoryButtonClass() {
      let classObject = {
        active: this.isActive
      }

      return classObject
    },
    collapseButtonStyle() {
      let styleObject = {
        transform: this.category.collapsed ? 'rotate(0deg)' : 'rotate(90deg)'
      }

      return styleObject
    },
    collapseIdSelector() {
      return `#categoryCollapse-${this.category.id}`
    }
  },
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
</style>