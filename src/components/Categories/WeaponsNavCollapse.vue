<template>
  <div class="row">
    <div class="col">
      <div class="collapse" :id="collapseId">
        <ul class="nav flex-column flex-nowrap">
          <li class="nav-item" :key="weapon.id" v-for="weapon in weapons">
            <a
              class="nav-link"
              href="#"
              :class="getLinkClass(weapon)"
              @click="changeWeapon(weapon)"
            >{{ weapon.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import Collapse from 'bootstrap/js/dist/collapse.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'WeaponsNavCollapse',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({ 
      selectWeapon: 'weapons/selectWeapon'
    }),
    changeWeapon(weapon) {
      this.selectWeapon(weapon)
    },
    getLinkClass(weapon) {
      if (!this.selectedWeapon) {
        return null
      }

      return weapon.id == this.selectedWeapon.id ? 'active' : ''
    }
  },
  computed: {
    ...mapGetters({
      selectedWeapon: 'weapons/selectedWeapon'
    }),
    collapseId() {
      return `categoryCollapse-${this.category.id}`
    },
    weapons() {
      return this.category.weapons
    },
    bootstrapCollapse() {
      let collapseElement = document.querySelector(`#${this.collapseId}`)
      let bootstrapCollapse = new Collapse(collapseElement)

      return bootstrapCollapse
    }
  },
  watch: {
    'category.collapsed': {
      handler(newVal) {
        if (newVal) {
          this.bootstrapCollapse.hide()
        }
        else {
          this.bootstrapCollapse.show()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-link {
  color: #fffafa;
  text-align: left;

  @media screen and (max-width: map-get($grid-breakpoints, lg)) {
    text-align: center;
  }
}
.nav-link:hover,
.nav-link:focus,
.active {
  color: #909090;
}
</style>