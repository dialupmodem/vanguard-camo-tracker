<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col mt-3">
        <h4>{{ weaponName }}</h4>
        <hr />
      </div>
    </div>
    <div class="row row-wrap">
      <div class="col-12">
        <WeaponChallengeCard
          v-for="challenge in challenges"
          :key="challenge.id"
          :challenge="challenge"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import WeaponChallengeCard from './WeaponChallengeCard.vue'

export default {
  name: 'WeaponChallengeList',
  components: {
    WeaponChallengeCard
  },
  computed: {
    ...mapGetters({
      selectedWeapon: 'weapons/selectedWeapon'
    }),
    ...mapState({ 
      challenges: state => state.challenges.challenges
    }),
    weaponName() {
      return this.selectedWeapon?.name
    }
  }
}
</script>
