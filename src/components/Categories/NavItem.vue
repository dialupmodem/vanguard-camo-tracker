<template>
  <li class="nav-item">
    <div class="container-fluid w-100">
      <NavButtons
        :categoryCollapse="categoryCollapse"
        :isActive="false"
        @category-change="handleCategoryChange"
        @toggle-collapse="handleToggleCollapse"
      />
      <WeaponsNavCollapse
        :weapons="categoryCollapse.weapons"
        :categoryId="categoryCollapse.categoryId"
        @weapon-change="handleWeaponChange"
      />
    </div>
  </li>
</template>

<script>
import NavButtons from './NavButtons.vue'
import WeaponsNavCollapse from './WeaponsNavCollapse.vue'

export default {
  name: 'NavItem',
  props: {
    categoryCollapse: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCategoryChange() {
      this.$emit('category-change', this.categoryCollapse.categoryId)
    },
    handleToggleCollapse() {
      this.$emit('toggle-collapse', this.categoryCollapse)
    },
    handleWeaponChange(weaponId) {
      this.$emit('weapon-change', weaponId)
    }
  },
  components: {
    NavButtons,
    WeaponsNavCollapse
  },

}
</script>