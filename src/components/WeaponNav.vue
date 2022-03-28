<template>
  <div class="collapse" :id="collapseId">
    <ul class="nav flex-column flex-nowrap">
      <li class="nav-item" :key="weapon.id" v-for="weapon in weapons">
        <a class="nav-link" href="#" @click="changeWeapon(weapon.id)">{{ weapon.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'WeaponNav',
  props: {
    weaponCategory: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeWeapon(weaponId) {
      this.$emit('wepaon-change', weaponId)
    }
  },
  computed: {
    weapons() {
      return this.weaponCategory.weapons
    },
    categoryId() {
      return this.weaponCategory.id
    },
    collapseId() {
      return `categoryCollapse-${this.categoryId}`
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
  .nav-link:hover, .nav-link:focus, .active {
    color: #909090;
  }
</style>