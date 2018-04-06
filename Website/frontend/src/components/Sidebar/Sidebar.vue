<!-- Side Structure -->
<template>
  <div class="sidebar" :class="sidebarFilter">
        <v-toolbar flat class="transparent scroll-area navigation">
          <v-list class="pa-0">
            <v-list-tile avatar class="sidebar-profile">
              <v-list-tile-avatar>
                <img src="/static/img/user-11.jpg" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="fw-bold">John Leider</v-list-tile-title>
              </v-list-tile-content>
              <v-spacer></v-spacer>
              <v-menu bottom left>
                <v-btn icon slot="activator" class="ma-0">
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile to="/users/user-profile">
                    <v-icon class="mr-3 font-lg text-gray">ti-user</v-icon>
                    <v-list-tile-title>View Profile</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile to="/inbox">
                    <v-icon class="mr-3 font-lg text-gray">ti-email</v-icon>
                    <v-list-tile-title>Inbox</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile to="/users/users-list">
                    <v-icon class="mr-3 font-lg text-gray">ti-bell</v-icon>
                    <v-list-tile-title>Users List</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile to="/session/login">
                    <v-icon class="mr-3 font-lg text-gray">ti-power-off</v-icon>
                    <v-list-tile-title>Log Out</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile>
            <div class="sidebar-title px-3">
              <span>{{$lang.strings.general}}</span>
            </div>
            <template v-for="item in category1">
              <template v-if="item.items!= null">
                <v-list-group
                  :key="item.title"
                  :prepend-icon="item.action"
                  no-action
                  v-model="item.active"
                >
                <v-list-tile ripple slot="activator" v-if="item.items !== null">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple slot="activator" :to="item.path" v-else>
                  <v-list-tile-action>
                    <i :class="item.action"></i>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple v-for="subItem in item.items" v-bind:key="subItem.title" v-if="subItem !== null" :to="subItem.path">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[subItem.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
              </template>
              <template v-else>
                <v-list-tile :to="item.path" :key="item.path">
                  <v-list-tile-action>
                    <v-icon>{{ item.action }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </template>
            <div class="sidebar-title px-3">
              <span>{{$lang.strings.components}}</span>
            </div>
            <template v-for="item in category2">
              <template v-if="item.items!= null">
                <v-list-group
                  :key="item.title"
                  :prepend-icon="item.action"
                  no-action
                  v-model="item.active"
                >
                <v-list-tile ripple slot="activator" v-if="item.items !== null">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple slot="activator" :to="item.path" v-else>
                  <v-list-tile-action>
                    <i :class="item.action"></i>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple v-for="subItem in item.items" v-bind:key="subItem.title" v-if="subItem !== null" :to="subItem.path">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[subItem.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
              </template>
              <template v-else>
                  <v-list-tile :to="item.path" :key="item.path">
                    <v-list-tile-action>
                      <v-icon>{{ item.action }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </template>
            </template>
            <div class="sidebar-title px-3">
              <span>{{$lang.strings.applications}}</span>
            </div>
            <template v-for="item in category3">
              <template v-if="item.items!= null">
                <v-list-group
                  :key="item.title"
                  :prepend-icon="item.action"
                  no-action
                  v-model="item.active"
                >
                  <v-list-tile ripple slot="activator" v-if="item.items !== null">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile ripple slot="activator" :to="item.path" v-else>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile ripple v-for="subItem in item.items" v-bind:key="subItem.title" v-if="subItem !== null" :to="subItem.path">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ $lang.strings[subItem.title] }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-group>
              </template>
              <template v-else>
                  <v-list-tile :to="item.path" :key="item.path">
                    <v-list-tile-action>
                      <v-icon>{{ item.action }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </template>
            </template>
            <div class="sidebar-title px-3">
              <span>{{$lang.strings.features}}</span>
            </div>
            <template v-for="item in category4">
              <template v-if="item.items!= null">
                <v-list-group
                  :key="item.title"
                  :prepend-icon="item.action"
                  no-action
                  v-model="item.active"
                >
                <v-list-tile ripple slot="activator" v-if="item.items !== null">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple slot="activator" :to="item.path" v-else>
                  <v-list-tile-action>
                    <i :class="item.action"></i>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile ripple slot="activator" :to="item.path" v-else>
                  <v-list-tile-action>
                    <i :class="item.action"></i>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple v-for="subItem in item.items" v-bind:key="subItem.title" v-if="subItem !== null" :to="subItem.path">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $lang.strings[subItem.title] }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
              </template>
              <template v-else>
                <v-list-tile :to="item.path" :key="item.path">
                    <v-list-tile-action>
                      <v-icon>{{ item.action }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ $lang.strings[item.title] }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </template>
            </template>
          </v-list>
        </v-toolbar>
  </div>
</template>

<script>
/* eslint-disable */
import { category1, category2, category3, category4 } from "./SidebarLinks";
import EventBus from "../../lib/eventBus";
export default {
  data() {
    return {
      category1: category1,
      category2: category2,
      category3: category3,
      category4: category4,
      backgroundFilters: null,
      expandSidebar: ""
    };
  },
  computed: {
    // change the background color of the sidebar
    sidebarFilter() {
      EventBus.$on("sidebarFilters", payload => {
        this.backgroundFilters = payload;
      });
      return this.backgroundFilters;
    }
  }
};
</script>
