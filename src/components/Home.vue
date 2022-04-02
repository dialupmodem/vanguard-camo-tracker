<template>
  <div class="h-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-xs-12 col-md-2 col-lg-2 nav-container">
          <Nav />
        </div>
        <div class="col pb-5">
          <transition name="fade" mode="out-in">
            <WeaponList :key="selectedCategoryId" v-if="!isBrowsingWeapon" />
            <WeaponChallengeList :key="selectedWeaponId" v-else />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './Categories/Nav.vue'
import WeaponList from './WeaponList.vue'
import WeaponChallengeList from './WeaponChallengeList.vue'
import API from '/src/api/api.js'

export default {
  name: 'Home',
  components: {
    Nav,
    WeaponList,
    WeaponChallengeList
  },
  methods: {
    handleProgressSaved(savedChallenge) {
      API.updateChallengeProgress(savedChallenge.challengeId, savedChallenge.progress)
        .then(() => {

        })
    },

  },

  created() {
    this.$store.dispatch('getCategories')
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
    selectedCategory() {
      return this.$store.getters.selectedCategory
    },
    selectedCategoryId() {
      return this.selectedCategory ? this.selectedCategory.id : null
    },
    weapons() {
      return this.$store.state.weapons
    },
    selectedWeapon() {
      return this.$store.getters.selectedWeapon
    },
    selectedWeaponId() {
      return this.selectedWeapon ? this.selectedWeapon.id : null
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
