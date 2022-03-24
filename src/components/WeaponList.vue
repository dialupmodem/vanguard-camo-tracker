<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col mt-3">
        <h4>{{ categoryName }}</h4>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="container-fluid">
          <div class="row">
            <div
              class="col-xs-12 col-md-6 col-lg-4 col-xxl-3"
              v-for="weapon in weapons"
              :key="weapon.id"
            >
              <WeaponCard :weapon="weapon" @weapon-change="handleWeaponChange" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeaponCard from './WeaponCard.vue'

export default {
  name: 'WeaponList',
  props: {
    weapons: Array,
    categoryName: String
  },
  components: {
    WeaponCard
  },
  methods: {
    handleWeaponChange(weaponId) {
      this.$emit('weapon-change', weaponId)
    }
  },
}
</script>
