<template>
  <div>
    <h4 class="mt-3">Vanguard Camo Tracker</h4>
    <hr />
    <ul class="nav flex-column mt-4">
    <li
      class="nav-item"
      :key="weaponCategory.id"
      v-for="weaponCategory in weaponCategories"
    >
      <a
        href="#"
        class="nav-link"
        :class="{ active: isActiveCategory(weaponCategory.id) }"
        @click="changeCategory(weaponCategory.id)"
      >{{ weaponCategory.name }}</a>
    </li>
  </ul>
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

<style scoped>
  .nav-link {
    color: #FFFAFA;
    text-align: left;
  }
  .nav-link:hover, .nav-link:focus, .active {
    color: #909090;
  }
  h4, hr {
    color: #FFFAFA;
  }
</style>