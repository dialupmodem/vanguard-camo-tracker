<template>
  <li class="nav-item">
    <div class="container-fluid w-100">
      <NavButtons
        :category="category"
        :isActive="false"
        @category-change="handleCategoryChange"
        @toggle-collapse="handleToggleCollapse"
      />
      <WeaponsNavCollapse
        :weapons="category.weapons"
        :categoryId="category.id"
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
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCategoryChange() {
      this.$emit('category-change', this.category.id)
    },
    handleToggleCollapse() {
      this.$emit('toggle-collapse', this.category)
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