import Vue from 'vue'
import App from './App.vue'
import store from './store'

import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
