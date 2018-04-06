<!-- App Main Structure -->
<template>
  <div>
    <!-- App Header -->
    <app-header></app-header>
    <!-- App Main Content -->
    <v-content>
      <!-- Breadcrumbs -->
      <v-container fluid>
        <v-breadcrumbs class="px-2">
          <h2 class="text-capitalize mb-0">{{pageTitle}}</h2>
          <div class="spacer"></div>
          <v-icon slot="divider">chevron_right</v-icon>
          <v-breadcrumbs-item>
            {{pageBreadcrumb}}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-container>
      <!-- App Router -->
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <!-- app customizer -->
    <app-customizer></app-customizer>
    <!-- App Back To Top -->
    <vm-back-top></vm-back-top>
  </div>
</template>

<script>
/* eslint-disable */
import Header from "../components/Header/Header.vue";
import Customizer from "../components/Customizer/Customizer";
export default {
  components: {
    appHeader: Header,
    appCustomizer: Customizer
  },
  computed: {
    // computed property to get page breadcrumbs
    pageTitle() {
      return this.$breadcrumbs[0].meta.title;
    },
    pageBreadcrumb() {
      return this.$breadcrumbs[0].meta.breadcrumb;
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
