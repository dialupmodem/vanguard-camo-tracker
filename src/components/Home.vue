<template>
  <div class="h-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-xs-12 col-md-2 col-lg-2 nav-container">
          <Nav />
        </div>
        <div class="col pb-5">
          <transition name="fade" mode="out-in">
            <WeaponList :key="selectedCategoryId" v-if="!selectedWeapon" />
            <ChallengeList :key="selectedWeaponId" v-else />
          </transition>
        </div>
      </div>
    </div>
    <ErrorModal />
  </div>
</template>

<script>
import Nav from './Categories/Nav.vue'
import WeaponList from './Weapons/WeaponList.vue'
import ChallengeList from './Weapons/ChallengeList.vue'
import ErrorModal from './ErrorModal.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Nav,
    WeaponList,
    ChallengeList,
    ErrorModal
  },
  methods: {
    ...mapActions({
      getCategories: 'categories/getCategories',
      getWeapons: 'weapons/getWeapons'
    }),
    
  },
  created() {
    this.getCategories()
    this.getWeapons()
  },
  computed: {
    ...mapState({
      categories: state => state.categories.categories,
      weapons: state => state.weapons.weapons,
    }),
    ...mapGetters({
      selectedCategory: 'categories/selectedCategory',
      selectedWeapon: 'weapons/selectedWeapon',
      dataLoading: 'dataLoading'
    }),
    selectedCategoryId() {
      return this.selectedCategory?.id
    },
    selectedWeaponId() {
      return this.selectedWeapon?.id
    },
    isBrowsingWeapon() {
      return this.weapons.some(w => w.selected)
    },

  }
};
</script>

<style lang="scss" scoped>
.nav-container {
  background-color: $nav-bg;
  max-width: 250px;
  min-width: 125px;

  @media (max-width: map-get($grid-breakpoints, lg)) {
    min-width: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
