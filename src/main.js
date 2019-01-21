// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueConfig from 'vue-config'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

const config = {
  API_BASE: process.env.API_BASE
}
Vue.use(VueConfig, config)
Vue.use(VueResource)

// Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'
// Vue.http.headers.common['Access-Control-Allow-Headers'] = '*'
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
