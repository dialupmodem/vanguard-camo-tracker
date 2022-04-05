<template>
  <div class="h-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-xs-12 col-md-2 col-lg-2 nav-container">
          <Nav />
        </div>
        <div class="col pb-5">
          <div class="container-fluid w-100 h-100" v-if="dataLoading">
            <div class="row h-100 w-100 justify-content-center align-content-center">
              <div class="col-1">
                <Spinner />
              </div>
            </div>
          </div>
          <transition name="fade" mode="out-in">
            <WeaponList :key="selectedCategoryId" v-if="!isBrowsingWeapon" />
            <ChallengeList :key="selectedWeaponId" v-else />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './Categories/Nav.vue'
import WeaponList from './Weapons/WeaponList.vue'
import ChallengeList from './Weapons/ChallengeList.vue'
import Spinner from './Spinner.vue'
import API from '/src/api/api.js'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Nav,
    WeaponList,
    ChallengeList,
    Spinner
  },
  methods: {
    ...mapActions({
      getCategories: 'categories/getCategories'
    }),
    handleProgressSaved(savedChallenge) {
      API.updateChallengeProgress(savedChallenge.challengeId, savedChallenge.progress)
        .then(() => {

        })
    },
  },

  created() {
    this.getCategories()
  },
  computed: {
    ...mapState({
      categories: state => state.categories.categories,
      weapons: state => state.weapons.weapons,
      dataLoading: state => state.dataLoading
    }),
    ...mapGetters({
      selectedCategory: 'categories/selectedCategory',
      selectedWeapon: 'weapons/selectedWeapon'
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
