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
          @progress-saved="handleProgressSaved"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WeaponChallengeCard from './WeaponChallengeCard.vue'

export default {
  name: 'WeaponChallengeList',
  props: {
    weaponName: {
      type: String,
      required: true
    },
    challenges: {
      type: Array,
      required: true
    }
  },
  components: {
    WeaponChallengeCard
  },
  methods: {
    handleProgressSaved(savedChallenge) {
      this.$emit('progress-saved', savedChallenge)
    }
  }
}
</script>
