import Vue from 'vue'
import Router from 'vue-router'

// layout components
import Full from '@/container/Full'

// Pages views
import Blank from '@/views/pages/Blank'

//home
import home from '@/views/FrontOffice/home'

// session components
import SignUp from '@/views/session/SignUp'
import Login from '@/views/session/Login'
import LockScreen from '@/views/session/LockScreen'
import AdminUserList from '@/views/BackOffice/userList'
import Transaction from '@/views/BackOffice/Transaction'
import WeatherStation from '@/views/BackOffice/WeatherStation'
import Pricing from '@/views/BackOffice/Pricing'
import WorldMap from '@/views/FrontOffice/worldMap'
import CountrydMap from '@/views/FrontOffice/countryMap'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      component: Full,
      redirect: '/pages/blank',
      children: [

        {
          path: '/pages/blank',
          component: Blank,
          meta: {
            title: 'Blank',
            breadcrumb: 'Pages / Blank'
          }
        },{
          path: '/admin/userlist',
          component: AdminUserList,
          meta: {
            title: 'User List',
            breadcrumb: 'admin / User List',

          }
        },
        {
          path: '/admin/weatherStations' ,
          component :WeatherStation,
          meta:{
            title:'Weather stations',
            breadcrumb: 'admin / Weather stations'
          }
        },
        {
          path: '/admin/transactions' ,
          component :Transaction,
          meta:{
            title:'Transactions',
            breadcrumb: 'admin / Transactions'
          }
        },
        {
          path: '/admin/pricing' ,
          component :Pricing,
          meta:{
            title:'Pricing',
            breadcrumb: 'admin / Pricing'
          }
        }
      ]
    },
    {
      path: '/session/sign-up',
      component: SignUp,
      meta: {
        title: 'Sign Up',
        breadcrumb: 'Session / Sign Up'
      }
    },
    {
      path: '/session/login',
      component: Login,
      meta: {
        title: 'Login',
        name: 'login',
        breadcrumb: 'Session / Login'
      }
    },
    {
      path: '/session/lock-screen',
      component: LockScreen,
      meta: {
        title: 'Lock Screen',
        breadcrumb: 'Session / Lock Screen'
      }
    },
    {
      path: '/',
      component: home,
      name: 'home'
    },
    {path:'/map',component:WorldMap},
    {path:'/map/:country',component:CountrydMap,props: true , meta: {
        auth: {roles: 'admin', redirect: '/map/:country', forbiddenRedirect: '/admin/403'}}
      }

  ],
  mode:"history"
})
