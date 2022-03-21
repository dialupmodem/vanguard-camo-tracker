<template>
  <div class="card mt-3">
    <div class="card-header">
      {{ challenge.camoName }}
    </div>
    <div class="card-body">
      <div clas="container">
        <div class="row">
          <div class="col-12">
            <div class="pb-2" style="text-align: left">{{ challenge.description }}</div>
            <div class="progress">
              <div
                class="progress-bar"
                :class="getProgressBarClass(challenge)"
                role="progressbar"
                v-bind:style="getProgressBarStyle(challenge)"
              ></div>
            </div>
            <div class="text-center mt-2">{{ challenge | progressDisplay }}</div>
          </div>
        </div>
        <div class="row justify-content-start">
          <div class="col-1" style="text-align: left; min-width: 175px">
            <label for="progressInput">Current Progress:</label>
            <input
              id="progressInput"
              class="form-control"
              type="number"
              v-model="currentProgress"
            />
          </div>
          <div class="col-1 align-self-end">
            <button type="button" class="btn btn-primary" @click="saveProgress">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WeaponChallengeCard',
  props: {
    challenge: Object
  },
  data() {
    return {
      currentProgress: this.challenge.progress
    }
  },
  methods: {
    getProgressPercentage(challenge) {
      return (challenge.progress / challenge.requirement) * 100
    },
    getProgressBarStyle(challenge) {
      let percentageCompleted = this.getProgressPercentage(challenge)
      let styleObject = {
        width: `${percentageCompleted}%`
      }

      return styleObject
    },
    getProgressBarClass(challenge) {
      let percentage = this.getProgressPercentage(challenge)
      
      if (percentage == 100) {
        return 'bg-success'
      }
      else if (percentage > 75) {
        return 'bg-info'
      }
      else if (percentage > 50) {
        return 'bg-warning'
      }
      else {
        return 'bg-danger'
      }

    },
    saveProgress() {
      this.$emit('progress-saved', {challengeId: this.challenge.id, progress: this.currentProgress})
    }
  },
  filters: {
    progressDisplay(challenge) {
      return `${challenge.progress}/${challenge.requirement}`
    }
  }
}

</script>
<style scoped>
  .card-header {
    background-color: #4d7896;
    color: #FFFAFA;
  }
</style>