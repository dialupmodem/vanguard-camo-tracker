<template>
  <div class="card mt-3 m-auto" @click="changeSelection(weapon.id)">
    <div class="card-header">{{ weapon.name }}</div>
    <div class="card-body">
      <div class="container-fluid h-100 p-0">
        <div class="row">
          <div class="col">
            <img :src="weapon.image" :alt="weapon.name" />
          </div>
        </div>
        <div class="row progress-row flex-column justify-content-center align-content-center">
          <div class="col-4 w-100">
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
          </div>
          <div class="col-4 w-100 mt-3">50% Complete</div>
        </div>
      </div>
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
.card {
  cursor: pointer;

  @media screen and (max-width: map-get($grid-breakpoints, md)) {
    max-width: 300px;
  }
}
.card-header {
  background-color: #4d7896;
  color: #fffafa;
}
.card-body {
  min-height: 285px;
  height: 285px;
  min-width: 100%;

  @media screen and (max-width: map-get($grid-breakpoints, md)) {
    max-width: 285px;
  }
}
.card:hover {
  box-shadow: 2px 2px 2px 1px #36454f;
}
img {
  max-width: 100%;
  min-height: 140px;
  max-height: 140px;

  @media screen and (max-width: map-get($grid-breakpoints, lg)) {
    max-height: 185px;
  }
}
.progress-row {
  height: 50%;

  @media screen and (max-width: map-get($grid-breakpoints, md)) {
    height: 35%;
  }

  @media screen and (max-width: map-get($grid-breakpoints, md)) {
    justify-content: end !important;
  }
}
</style>
