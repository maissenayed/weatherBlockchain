<template>
  <div>
    <v-toolbar color="gradient-primary" dark>
      <v-toolbar-title class="text-xs-center">Chat</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list subheader>
      <v-subheader>Recent chat</v-subheader>
        <v-list-tile avatar v-for="item in items" v-bind:key="item.title" @click="">
          <v-list-tile-avatar>
            <img v-bind:src="item.avatar"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon v-bind:color="item.active ? 'primary' : 'grey'">chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list subheader>
      <v-subheader>Previous chats</v-subheader>
      <v-list-tile avatar v-for="item in items2" v-bind:key="item.title" @click="">
        <v-list-tile-avatar>
          <img v-bind:src="item.avatar"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      items: [
        { active: true, title: "Jason Oner", avatar: "/static/img/user-6.jpg" },
        {
          active: true,
          title: "Ranee Carlson",
          avatar: "/static/img/user-7.jpg"
        },
        { title: "Cindy Baker", avatar: "/static/img/user-8.jpg" },
        { title: "Ali Connors", avatar: "/static/img/user-9.jpg" }
      ],
      items2: [{ title: "Travis Howard", avatar: "/static/img/user-10.jpg" }]
    };
  }
};
</script>
