<template>
  <div class="container">
    <div class="row row wrap">
      <div class="col-xs-12 col-md-6 col-lg-4 col-xxl-3" v-for="weapon in weapons" :key="weapon.id">
        <WeaponCard v-bind:weapon="weapon" @weapon-change="handleWeaponChange" />
      </div>
    </div>
  </div>
</template>

<script>
import WeaponCard from './WeaponCard.vue'

export default {
  name: 'WeaponList',
  props: {
    weapons: Array
  },
  components: {
    WeaponCard
  },
  methods: {
    handleWeaponChange(weaponId) {
      this.$emit('weapon-change', weaponId)
    }
  }
}
</script>
