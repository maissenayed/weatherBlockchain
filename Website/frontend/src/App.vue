<template>
  <v-app
  :dark="darkModeHandler"
  id="inspire"
  :class="[{ 'customizer-in': customizerIn, 'box-layout': boxLayoutHandler, 'collapse-sidebar': collapseSidebarHandler, 'rtl-layout': rtlLayoutHandler}]"
  >
    <template v-if="pageLoading">
      <!-- Loader -->
      <div class="spinwrap">
        <div class="spinner">
          <div class="cube1"></div>
          <div class="cube2"></div>
        </div>
      </div>
    </template>
    <template v-else>

      <router-view></router-view>


    </template>
  </v-app>
</template>

<script>
import EventBus from './lib/eventBus'

export default {
  data () {
    return {
      loading: true, // page loading
      darkMode: false, // dark mode
      customizer: false, // customizer
      boxLayout: false, // box layout mode
      collapseSidebar: false, // collapse sidebar
      defaultSidebar: '',
      rtlLayout: false
    }
  }, beforeMount: function () {
    localStorage.clear();

  },
  mounted () {
    let self = this
    setTimeout(() => {
      self.showSuccessMessage()
    }, 2500)
  },
  computed: {
    // computed property to get the state of dark mode
    darkModeHandler () {
      EventBus.$on('darkMode', payload => {
        this.darkMode = payload
      })
      return this.darkMode
    },
    // computed property to get the state of boxlayout event
    boxLayoutHandler () {
      EventBus.$on('boxLayout', payload => {
        this.boxLayout = payload
      })
      return this.boxLayout
    },
    collapseSidebarHandler () {
      EventBus.$on('collapseSidebar', payload => {
        this.collapseSidebar = payload
      })
      return this.collapseSidebar
    },
    pageLoading () {
      var self = this
      setTimeout(function () {
        self.loading = false
      }, 1500)
      return self.loading
    },
    // computed property to get the state of customizer
    customizerIn () {
      EventBus.$on('toggleCustomizer', payload => {
        this.customizer = payload
      })
      return this.customizer
    },
    // To set the default sidebar
    activeDefaultSidebar () {
      EventBus.$on('enableDefaultSidebar', payload => {
        this.defaultSidebar = payload
      })
      return this.defaultSidebar
    },
    rtlLayoutHandler () {
      EventBus.$on('rtlLayoutEvent', payload => {
        this.rtlLayout = payload
      })
      return this.rtlLayout
    }
  },
  notifications: {
    showSuccessMessage: { // You can have any name you want instead of 'showLoginError'
      title: 'Welcome To Nammumu',
      message: 'A beautiful VueJs web app for everyone',
      type: 'success', // You also can use 'VueNotifications.types.error' instead of 'error'
      timeout: 2500
    }
  }
}
</script>
