<template>
  <div class="card mt-3" style="cursor: pointer;" v-on:click="changeSelection(weapon.id)">
    <div class="card-header">{{ weapon.name }}</div>
    <div class="card-body" style="min-height: 250px; min-width: 100%">
      <img style="max-width: 100%" :src="weapon.image" :alt="weapon.image">
      <div class="mt-3">50% complete</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeaponCard',
  props: {
    weapon: Object
  },
  methods: {
    changeSelection(weaponId) {
      this.$emit('weapon-change', weaponId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-header {
    background-color: #4d7896;
    color: #FFFAFA;
  }
  .card:hover {
    box-shadow: 2px 2px 2px 1px #36454F;
  }
  img {
    max-width: 100%;
    
    @media screen and (max-width: map-get($grid-breakpoints, lg)) {
      max-width: 80%;
    }
  }
</style>
