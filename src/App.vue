<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

::-webkit-scrollbar {
  @media screen and (min-width: map-get($grid-breakpoints, lg)) {
    display: none;
  }
}

html,
body {
  height: 100%;
  background-color: #dedede !important;

  @media screen and (min-width: map-get($grid-breakpoints, lg)) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
