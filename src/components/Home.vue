<template>
  <div class="h-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-xs-12 col-md-2 col-lg-2 nav-container">
          <CategoryNav
            :weapon-categories="weaponCategories"
            :active-category-id="activeWeaponCategoryId"
            @category-change="handleCategoryChange"
          />
        </div>
        <div class="col pb-5">
          <div class="container">
            <div class="row">
              <div class="col mt-3" v-if="!isBrowsingWeapon">
                <h4>{{ activeCategoryName }}</h4>
                <hr />
              </div>
            </div>
            <div class="row">
              <div class="col" v-if="!isBrowsingWeapon">
                <WeaponList
                  :weapons="activeWeaponList"
                  @weapon-change="handleWeaponChange"
                />
              </div>
              <div class="col" v-else>
                <WeaponChallengeList
                  :weaponName="activeWeaponName"
                  :weaponChallenges="activeWeaponChallenges"
                  @progress-saved="handleProgressSaved"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryNav from './CategoryNav.vue'
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
      activeWeaponName: null
    };
  },
  methods: {
    getActiveWeapon() {
      let activeWeaponCategory = this.getActiveWeaponCategory()
      return activeWeaponCategory.weapons.find(w => w.name == this.activeWeaponName)
    },
    setActiveWeaponCategoryId(categoryId) {
      this.activeWeaponCategoryId = categoryId
      this.isBrowsingWeapon = false
    },
    setActiveWeapon(weaponName) {
      this.activeWeaponName = weaponName
      this.isBrowsingWeapon = true
    },
    handleCategoryChange(weaponCategoryId) {
      API.getWeaponsInCategory(weaponCategoryId)
      .then(response => {
        this.isBrowsingWeapon = false
        this.activeWeaponList = response.data
        this.activeWeaponCategoryId = weaponCategoryId
      })
    },
    handleWeaponChange(weaponId) {
      this.isBrowsingWeapon = true
      API.getWeapon(weaponId)
      .then((response) => {
        this.activeWeapon = response.data
        this.activeWeaponName = this.activeWeapon.name

        API.getWeaponChallenges(weaponId)
        .then(response => (this.activeWeaponChallenges = response.data))
      })
    },
    handleProgressSaved(savedChallenge) {
      console.log(savedChallenge)
        API.updateChallengeProgress(savedChallenge.challengeId, savedChallenge.progress)
        .then(() => {
          API.getWeaponChallenges(this.activeWeapon.id)
          .then(response => (this.activeWeaponChallenges = response.data))
        })
    }
  },
  mounted() {
    API.getWeaponCategories()
      .then(response => {
        this.weaponCategories = response.data
        if (!this.activeWeaponCategoryId && this.weaponCategories.length > 0) {
          this.handleCategoryChange(this.weaponCategories[0].id)
        }
      })
  },
  computed: {
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
</style>
