<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col mt-3" v-if="selectedCategory">
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
              <WeaponCard :weapon="weapon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WeaponCard from './WeaponCard.vue'

export default {
  name: 'WeaponList',
  components: {
    WeaponCard
  },
  computed: {
    ...mapGetters({
      weapons: 'weapons/selectedWeapons'
    }),
    ...mapGetters({
      selectedCategory: 'categories/selectedCategory'
    }),
    categoryName() {
      return this.selectedCategory?.name
    }
  }
}
</script>
