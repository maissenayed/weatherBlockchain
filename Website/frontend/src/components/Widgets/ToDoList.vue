<!-- ToDo List Widget -->
<template>
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-checkbox v-model="meeting"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-sub-title>See meeting with booking koala teams</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-checkbox v-model="projectReport"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-sub-title>Generate project report of BK</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-checkbox v-model="ecommerce"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-sub-title>Assign Ecommerce Project to designer</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-checkbox v-model="meetingTeams"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-sub-title>See meeting with booking koala teams</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-checkbox v-model="hireDevelopers"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-sub-title>Arrange compaign to hire more developers</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-checkbox v-model="iMac"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-sub-title>Purchase iMac for designers</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <hr>
      <v-btn class="btn-gradient-primary btn-icon"><i class="ti-plus"></i>Add New Items</v-btn>
    </v-list>
</template>

<script>
  export default {
    data () {
      return {
        meeting: false,
        projectReport: false,
        ecommerce: false,
        meetingTeams: false,
        hireDevelopers: false,
        iMac: false,
        ecommerceDesigns: false
      }
    }
  }
</script>
