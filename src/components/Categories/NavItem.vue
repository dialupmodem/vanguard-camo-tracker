<template>
  <li class="nav-item">
    <div class="container-fluid w-100">
      <NavButtons :category="category" :isActive="false" />
      <WeaponsNavCollapse :category="category" />
    </div>
  </li>
</template>

<script>
import NavButtons from './NavButtons.vue'
import WeaponsNavCollapse from './WeaponsNavCollapse.vue'

export default {
  name: 'NavItem',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  components: {
    NavButtons,
    WeaponsNavCollapse
  },

}
</script>