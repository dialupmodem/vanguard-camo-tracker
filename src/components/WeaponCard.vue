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
              <div class="progress-bar" :class="progressBarClass" :style="progressBarStyle"></div>
            </div>
          </div>
          <div class="col-4 w-100 mt-3">{{ weapon.percentCompleted }}% Complete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeaponCard',
  props: {
    weapon: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeSelection() {
      this.$store.dispatch('selectWeapon', this.weapon)
    },
    getProgressBarClass() {
      let percentage = this.weapon.percentCompleted

      if (percentage == 100) {
        return 'bg-success'
      }
      else if (percentage > 50) {
        return 'bg-warning'
      }
      else {
        return 'bg-danger'
      }

    },

  },
  computed: {
    progressBarStyle() {
      let styleObject = {
        width: `${this.weapon.percentCompleted}%`
      }
      return styleObject
    },
    progressBarClass() {
      let percentage = this.weapon.percentCompleted
      if (percentage == 100) {
        return 'bg-success'
      }
      else if (percentage > 50) {
        return 'bg-warning'
      }
      else {
        return 'bg-danger'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  transition: transform 0.3s;

  @media screen and (max-width: map-get($grid-breakpoints, md)) {
    max-width: 300px;
  }
}

.card:hover {
  transform: scale(1.08);
  z-index: 999;
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
