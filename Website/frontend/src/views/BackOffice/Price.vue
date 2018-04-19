<template>
  <v-container grid-list-xl fluid py-0>
    <div class="app-card">
      <div class="app-card-title">
        <h3>Update plans's prices</h3>
      </div>
      <div class="app-card-content input-label">
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <span class="small pt-4 d-block">Week Price</span>
          </v-flex>
          <v-flex xs12 sm8>
            <v-text-field name="input-3" label="Current Price" value=""></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <span class="small pt-4 d-block">Month Price</span>
          </v-flex>
          <v-flex xs12 sm8>
            <v-text-field name="input-3" label="Current Price" value=""></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <span class="small pt-4 d-block">10 Tickets Price</span>
          </v-flex>
          <v-flex xs12 sm8>
            <v-text-field name="input-3" label="Current Price" value=""></v-text-field>
          </v-flex>
        </v-layout>



      </div>
    </div>
  </v-container>
</template>


<script>
  import axios from 'axios'

  export default {
    name: 'Pricing',
    props: {},
    created() {

      var self = this;
      // vuetify data table

      //TODO : put api routes in a seperate file

    },
    methods: {
      initialize() {

      }
    }
  }
</script>

