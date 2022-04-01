<template>
  <div class="h-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-xs-12 col-md-2 col-lg-2 nav-container">
          <Nav
            :categories="categories"
            :active-category-id="selectedCategoryId"
            @category-change="handleCategoryChange"
            @weapon-change="handleWeaponChange"
            v-if="categories != null"
          />
        </div>
        <div class="col pb-5">
          <transition name="fade" mode="out-in">
            <WeaponList
              :weapons="weapons"
              :categoryName="selectedCategoryName"
              :key="selectedCategoryName"
              @weapon-change="handleWeaponChange"
              v-if="!isBrowsingWeapon"
            />
            <WeaponChallengeList
              :weapon-name="selectedWeapon.name"
              :key="selectedWeapon.name"
              :challenges="challenges"
              @progress-saved="handleProgressSaved"
              v-else
            />
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
    selectCategory(categoryId) {
      let category = this.$store.state.categories.find(c => c.id == categoryId)
      if (category) {
        this.$store.dispatch('selectCategory', category)
      }
    },
    selectWeapon(weaponId) {
      let weapon = this.$store.state.weapons.find(w => w.id == weaponId)
      if (weapon) {
        this.$store.dispatch('selectWeapon', weapon)
      }
    },
    handleCategoryChange(weaponCategoryId) {
      this.selectCategory(weaponCategoryId)
    },
    handleWeaponChange(weaponId) {
      this.selectWeapon(weaponId)
    },
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
    selectedCategoryName() {
      return this.selectedCategory ? this.selectedCategory.name : null
    },
    weapons() {
      return this.$store.state.weapons
    },
    selectedWeapon() {
      return this.$store.getters.selectedWeapon
    },
    isBrowsingWeapon() {
      return this.weapons.some(w => w.selected)
    },
    challenges() {
      return this.$store.state.challenges
    }
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
