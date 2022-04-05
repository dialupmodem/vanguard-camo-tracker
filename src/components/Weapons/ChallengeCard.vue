<template>
  <div class="card mt-3">
    <div class="card-header">{{ challenge.camoName }}</div>
    <div class="card-body">
      <div clas="container">
        <div class="row">
          <div class="col-12">
            <div class="pb-2 text-start">{{ challenge.description }}</div>
            <div class="progress">
              <div class="progress-bar" :class="progressBarColorClass" :style="progressBarStyle"></div>
            </div>
            <div class="text-center mt-2">{{ challenge | progressDisplay }}</div>
          </div>
        </div>
        <div class="row justify-content-start">
          <div class="col-12 col-md-1 progress-input-container">
            <label for="progressInput">Current Progress:</label>
            <input id="progressInput" class="form-control" type="number" v-model="progress" />
          </div>
          <div class="col-12 col-md-1 mt-3 mt-md-0 align-self-end justify-content-start">
            <button
              type="button"
              class="btn btn-primary"
              :disabled="saveDisabled"
              style="min-width: 62px; min-height: 28px;"
              @click="saveProgress"
            >
              <div class="spinner-border spinner-border-sm" v-if="dataUpdating">
                <span class="visually-hidden">Saving...</span>
              </div>
              <span v-else>Save</span>
            </button>
          </div>
          <div class="col-12 col-md mt-2 mt-md-0 justify-self-end align-self-end text-end">
            <button
              type="button"
              class="btn btn-primary"
              :disabled="markCompleteDisabled"
              style="min-width: 143px; min-height: 38px;"
              @click="markCompleted"
            >
              <div class="spinner-border spinner-border-sm" v-if="dataUpdating">
                <span class="visually-hidden">Saving...</span>
              </div>
              <span v-else>Mark Completed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from "vuex"

export default {
  name: "ChallengeCard",
  props: {
    challenge: Object
  },
  data() {
    return {
      progress: this.challenge.progress
    };
  },
  methods: {
    ...mapActions({
      updateChallengeProgress: "challenges/updateChallengeProgress"
    }),
    saveProgress() {
      this.updateChallengeProgress({challengeId: this.challenge.id, progressValue: this.progress});
    },
    markCompleted() {
      this.updateChallengeProgress(this.challenge.id, this.challenge.requirement);
    }
  },
  filters: {
    progressDisplay(challenge) {
      return `${challenge.progress}/${challenge.requirement}`;
    }
  },
  computed: {
    ...mapState({
      dataUpdating: "dataUpdating"
    }),
    isComplete() {
      return this.challenge.progress == this.challenge.requirement;
    },
    saveDisabled() {
      return this.progress == this.challenge.progress || this.dataUpdating;
    },
    markCompleteDisabled() {
      return this.isComplete || this.dataUpdating
    },
    progressBarStyle() {
      return {
        width: `${this.challenge.percentCompleted}%`
      };
    },
    progressBarColorClass: {
      get() {
        if (this.challenge.percentCompleted == 100) {
          return "bg-success";
        }
        else if (this.challenge.percentCompleted >= 50) {
          return "bg-warning";
        }
        else {
          return "bg-danger";
        }
      }
    }
  },
}

</script>
<style lang="scss" scoped>
.card-header {
  background-color: #4d7896;
  color: #fffafa;
}
.progress-input-container {
  text-align: left;
  min-width: 175px;
}
button {
  @media screen and (max-width: map-get($grid-breakpoints, md)) {
    width: 100%;
  }
}
</style>