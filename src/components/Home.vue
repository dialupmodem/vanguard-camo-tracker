<template>
  <div class="h-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-xs-12 col-md-2 col-lg-2 nav-container">
          <CategoryNav
            :weaponCategories="categories"
            :active-category-id="selectedCategoryId"
            @category-change="handleCategoryChange"
            @weapon-change="handleWeaponChange"
            v-if="categories != null"
          />
        </div>
        <div class="col pb-5">
          <transition name="fade" mode="out-in">
            <WeaponList
              :weapons="selectedCategoryWeapons"
              :categoryName="selectedCategoryName"
              @weapon-change="handleWeaponChange"
              v-if="!isBrowsingWeapon"
            />
            <WeaponChallengeList
              :weapon-name="activeWeaponName"
              :weapon-challenges="activeWeaponChallenges"
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
import CategoryNav from './Categories/CategoryNav.vue'
import WeaponList from './WeaponList.vue'
import WeaponChallengeList from './WeaponChallengeList.vue'
import API from '/src/api/api.js'

export default {
  name: 'Home',
  components: {
    CategoryNav,
    WeaponList,
    WeaponChallengeList
  },
  data() {
    return {
      isBrowsingWeapon: false,
      activeWeapon: null,
      activeWeaponCategoryId: null,
      weaponCategories: null,
      activeWeaponList: null,
      activeWeaponChallenges: null,
      activeWeaponName: null,
      categories: null
    };
  },
  methods: {
    getActiveWeapon() {
      let activeWeaponCategory = this.getActiveWeaponCategory()
      return activeWeaponCategory.weapons.find(w => w.name == this.activeWeaponName)
    },
    setActiveWeapon(weaponName) {
      this.activeWeaponName = weaponName
      this.isBrowsingWeapon = true
    },
    selectCategory(categoryId) {
      this.categories.forEach((c) => {
        c.selected = c.id == categoryId
      })

      this.isBrowsingWeapon = false
    },
    handleCategoryChange(weaponCategoryId) {
      this.selectCategory(weaponCategoryId)

      console.log(weaponCategoryId)
      API.getWeaponsInCategory(this.selectedCategoryId)
        .then(response => {
          this.activeWeaponList = response.data
          this.isBrowsingWeapon = false
        })
    },
    handleWeaponChange(weaponId) {
      API.getWeapon(weaponId)
        .then((response) => {
          this.activeWeapon = response.data
          this.activeWeaponName = this.activeWeapon.name

          API.getWeaponChallenges(weaponId)
            .then(response => {
              this.activeWeaponChallenges = response.data
              this.isBrowsingWeapon = true
            })
        })
    },
    handleProgressSaved(savedChallenge) {
      API.updateChallengeProgress(savedChallenge.challengeId, savedChallenge.progress)
        .then(() => {
          API.getWeaponChallenges(this.activeWeapon.id)
            .then(response => (this.activeWeaponChallenges = response.data))
        })
    }
  },
  created() {
    API.getWeaponCategories()
      .then(response => {
        this.categories = response.data.map(category => (
          {
            ...category,
            selected: false
          }
        ))
      })
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
      
      return selectedCategory.categoryName
    },
    selectedCategoryWeapons() {
      let selectedCategory = this.selectedCategory
      if (!selectedCategory) {
        return null
      }

      return selectedCategory.weapons
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
