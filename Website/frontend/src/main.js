// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuetify from 'vuetify'
import { Vue2Dragula } from 'vue2-dragula'
import VueQuillEditor from 'vue-quill-editor'
import wysiwyg from 'vue-wysiwyg'
import VueBreadcrumbs from 'vue2-breadcrumbs'
import VmBackTop from 'vue-multiple-back-top'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
import Lang from 'vuejs-localization'
import App from './App'
import moment from 'moment'
import Highcharts from 'highcharts'
import VueHighcharts from 'vue-highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import loadMap from 'highcharts/modules/map'

import "vue-material-design-icons/styles.css"

// include all css files
import './lib/VuelyCss'

function toast({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb)
}
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY/MM/DD');
  }
});
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

miniToastr.init({ types: toastTypes })

Vue.use(Vuetify)
highchartsMore(Highcharts)
loadMap(Highcharts)
Vue.use(VueHighcharts, {Highcharts:Highcharts})
Vue.use(Vue2Dragula)
Vue.use(VueQuillEditor)
//Vue.use(VueResource)
Vue.use(wysiwyg, {})
Vue.use(VueBreadcrumbs)
Vue.use(VueNotifications, options)
Vue.use(moment);
Vue.use(VueAxios,axios);
axios.defaults.baseURL = 'http://localhost:3030';

Vue.component(VmBackTop.name, VmBackTop)

Lang.requireAll(require.context('./lang', true, /\.js$/))
Vue.use(Lang)

Vue.config.productionTip = false
Vue.router = router
Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/basic'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x'),
  token: [{request: 'Authorization', response: 'Authorization', authType: 'bearer', foundIn: 'header'}, {request: 'token', response: 'token', authType: 'bearer', foundIn: 'response'}],
  tokenDefaultName: 'default-auth-token',
 // refreshData: {url: 'auth/refresh', method: 'GET', enabled: false, interval: 0},
  tokenStore: ['localStorage', 'cookie'],
  tokenExpired: () => {
    return null
  },
  refreshData: {enabled: false},
  fetchData: { enabled: false},
  rolesVar: 'role',
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
