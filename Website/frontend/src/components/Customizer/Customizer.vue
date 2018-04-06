<template>
  <div>
    <v-navigation-drawer fixed v-model="customizerIn" :width="250" :right="!ifRtlLayout" app temporary>
      <v-toolbar color="gradient-primary">
        <v-toolbar-title>Customizer</v-toolbar-title>
      </v-toolbar>
      <div class="inner-toolbar">
        <v-list class="mb-4 pa-0">
        	<v-list-tile class="mb-4">
            <v-list-tile-content>
              <v-select
              	:items="languages"
	              v-model="lang"
	              bottom
	              @input="changeLanguage"
            	></v-select>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-switch color="primary" label="Dark Mode" v-model="darkMode" @change="emitDarkMode"></v-switch>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-switch color="primary" label="Collapse Sidebar" v-model="collapseSidebar" @change="emitCollapseSidebar"></v-switch>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-switch color="primary" label="Box Layout" v-model="boxLayout" @change="emitBoxLayout"></v-switch>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-switch color="primary" label="RTL Layout" v-model="enableRtlLayout" @change="emitRtlLayout"></v-switch>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-switch color="primary" label="Background Image" v-model="backgroundImage" @change="emitEnableBackgroundImage"></v-switch>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="sidebar-images">
            <v-list-tile-content v-for="(backgroundImages, key) in sidebarBackgroundImages" :key="key">
              <a href="javascript:void(0)" class="img-holder" :class="{'active' : activeImage === key}">
                <img :src="backgroundImages" @click="changeBackgroundImage(backgroundImages, key)" alt="dynamic sidebar images" class="img-responsive">
              </a>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <div class="sidebar-filter">
          <h4>Sidebar Filters</h4>
          <v-radio-group v-model="filter" :mandatory="false" @change="emitSidebarFilters" class="pt-0">
            <v-radio label="Pink" color="primary" value="sidebar-overlay-pink"></v-radio>
            <v-radio label="Primary" color="primary" value="sidebar-overlay-primary"></v-radio>
            <v-radio label="Warning" color="primary" value="sidebar-overlay-warning"></v-radio>
            <v-radio label="Success" color="primary" value="sidebar-overlay-success"></v-radio>
            <v-radio label="Purple" color="primary" value="sidebar-overlay-purple"></v-radio>
            <v-radio label="Default" color="primary" value="default-sidebar"></v-radio>
          </v-radio-group>
        </div>
      </div>
    </v-navigation-drawer>
    <div class="app-customizer">
      <a class="customizer-toggle bg-danger" href="javascript:;" @click="toggleCustomizer">
        <i aria-hidden="true" class="ti-settings faa-spin animated"></i>
      </a>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import EventBus from "../../lib/eventBus";
export default {
  data: function() {
    return {
      darkMode: false, // dark mode theme option
      customizerIn: false, // customizer
      collapseSidebar: false, // collapseSidebar option
      boxLayout: false, // boxLayout option
      backgroundImage: false, // backgroundImage option
      defaultSidebar: "default-sidebar", // to set the default sidebar
      sidebarBackgroundImages: [
        "/static/img/sidebar-1.jpg",
        "/static/img/sidebar-2.jpg",
        "/static/img/sidebar-3.jpg",
        "/static/img/sidebar-4.jpg"
      ], // sidebar background images url
      filter: "warning",
      activeImage: "",
      enableRtlLayout: false, // to enable RTL
      rtlLayout: "", // to move customizer left/right side
      languages: ["en", "fr"],
      lang: "en"
    };
  },
  methods: {
    // dark mode handlerleft="ifRtlLayout" :right="!ifRtlLayout"
    emitDarkMode: function(isDarkMode) {
      EventBus.$emit("darkMode", isDarkMode);
    },
    // collapse sidebar hanlder
    emitCollapseSidebar: function(isCollapseSidebar) {
      EventBus.$emit("collapseSidebar", isCollapseSidebar);
    },
    // boxLayout handler
    emitBoxLayout: function(isBoxLayout) {
      EventBus.$emit("boxLayout", isBoxLayout);
    },
    // enable background image handler
    emitEnableBackgroundImage: function(isBackgroundImage) {
      EventBus.$emit("backgroundImage", isBackgroundImage);
    },
    // change BackgroundImage customizer
    changeBackgroundImage(sidebarImage, key) {
      this.activeImage = key;
      EventBus.$emit("changeBackgroundImage", sidebarImage);
    },
    // toggle customizer
    toggleCustomizer: function() {
      this.customizerIn = !this.customizerIn;
      EventBus.$emit("toggleCustomizer", this.customizerIn);
    },
    // color filter handler
    emitSidebarFilters: function() {
      this.defaultSidebar = "";
      EventBus.$emit("sidebarFilters", this.filter);
    },
    // RTL handler
    emitRtlLayout: function(isRtlLayout) {
      EventBus.$emit("rtlLayoutEvent", isRtlLayout);
    },
    // change language
    changeLanguage: function() {
      this.$lang.setLang(this.lang);
      console.log(this.lang);
    }
  },
  computed: {
    // if rtl Layout
    ifRtlLayout() {
      EventBus.$on("rtlLayoutEvent", payload => {
        this.rtlLayout = payload;
      });
      return this.rtlLayout;
    }
  }
};
</script>
