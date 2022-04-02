<template>
  <div class="row">
    <div class="col">
      <div class="collapse" :id="collapseId">
        <ul class="nav flex-column flex-nowrap">
          <li class="nav-item" :key="weapon.id" v-for="weapon in weapons">
            <a class="nav-link" href="#" @click="changeWeapon(weapon)">{{ weapon.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeaponsNavCollapse',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeWeapon(weapon) {
      this.$store.dispatch('selectWeapon', weapon)
    }
  },
  computed: {
    collapseId() {
      return `categoryCollapse-${this.category.id}`
    },
    weapons() {
      return this.category.weapons
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
</style>