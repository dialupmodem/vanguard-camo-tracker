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
              @weapon-change="handleWeaponChange"
              v-if="!isBrowsingWeapon"
            />
            <WeaponChallengeList
              :weapon-name="selectedWeapon.name"
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
  data() {
    return {
      categories: [],
      weapons: [],
      challenges: []
    };
  },
  methods: {
    selectCategory(categoryId) {
      this.categories.forEach((c) => {
        c.selected = c.id == categoryId
      })
      this.weapons.forEach((c) => {
        c.selected = false
      })
    },

    selectWeapon(weaponId) {
      this.weapons.forEach((w) => {
        w.selected = w.id == weaponId
      })

      this.categories.forEach((c) => {
        c.selected = false
      })
    },
    handleCategoryChange(weaponCategoryId) {
      this.selectCategory(weaponCategoryId)

      API.getWeaponsInCategory(this.selectedCategoryId)
        .then(response => {
          this.weapons = response.data.map(weapon => (
            {
            ...weapon,
            selected: false
            }
          ))
        })
    },
    handleWeaponChange(weaponId) {
      this.selectWeapon(weaponId)
      this.getChallenges()
    },
    handleProgressSaved(savedChallenge) {
      API.updateChallengeProgress(savedChallenge.challengeId, savedChallenge.progress)
        .then(() => {
          // API.getWeaponChallenges(this.activeWeapon.id)
          //   .then(response => (this.activeWeaponChallenges = response.data))
        })
    },
    getCategories() {
      API.getWeaponCategories().then(response => {
        this.categories = response.data.map(category => (
          {
            ...category,
            selected: false,
            collapsed: true
          }
        ))
      })
    },
    getChallenges() {
      API.getWeaponChallenges(this.selectedWeapon.id)
        .then(response => (this.challenges = response.data))
    }
    
  },

  created() {
    this.getCategories()
  },
  computed: {
    selectedCategory() {
      if (!this.categories) {
        return null
      }

      let selectedCategory = this.categories.find(c => c.selected)
      if (!selectedCategory) {
        selectedCategory = this.categories[0]
      }

      return selectedCategory
    },
    selectedCategoryId() {
      let selectedCategory = this.selectedCategory

      if (!selectedCategory) {
        return null
      }

      return selectedCategory.id
    },
    selectedCategoryName() {
      let selectedCategory = this.selectedCategory

      if (!selectedCategory) {
        return null
      }

      return selectedCategory.name
    },
    selectedWeapon() {
      if (this.weapons == null) {
        return null
      }

      let weapon = this.weapons.find(w => w.selected)
      if (!weapon) {
        return null
      }

      return weapon
    },
    activeCategoryName() {
      if (!this.weaponCategories) {
        return null
      }

      let activeCategory = this.weaponCategories.find(w => w.id == this.activeWeaponCategoryId)
      if (activeCategory) {
        return activeCategory.name
      }
      return null;
    },
    isBrowsingWeapon() {
      return this.weapons.some(w => w.selected)
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
