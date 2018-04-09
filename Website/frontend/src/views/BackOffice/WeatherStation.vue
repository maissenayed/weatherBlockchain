<template>
  <v-container fluid grid-list-xl py-0>
    <div class="app-card">
      <div class="app-card-content">
        <div>
          <v-layout row wrap align-baseline>
            <v-flex xs6>
              <div>
                <v-dialog v-model="dialog" max-width="600px">
                  <v-btn color="primary" dark slot="activator" class="mb-2" @click.prevent="initWeatherStation">New
                    weather station
                  </v-btn>

                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="IP address" v-model="editedItem.ip_adr"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select
                              :items="countries_list"
                              v-model="editedItem.country"
                              placeholder="Country"
                              class="input-group--focused"
                              color="grey"
                              :clearable="ok"
                              item-value="text"
                              @change="showStates"
                            >
                            </v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select
                              :items="states_list"
                              v-model="editedItem.state[0].name"
                              placeholder="State"
                              class="input-group--focused"
                              color="grey"
                              :clearable="ok"
                              item-value="text"
                              @change="getCoords"
                            >
                            </v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Longitude"
                                          v-model="editedItem.coord[0].lng" disabled></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Latitude" v-model="editedItem.coord[0].lat"
                                          disabled></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <br>
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
            class="elevation-1"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.ip_adr }}</td>
              <td class="text-xs-left">{{ props.item.status }}</td>
              <td class="text-xs-left">{{ props.item.state[0].name}}</td>
              <td class="text-xs-left">{{ props.item.coord[0].lng}}</td>
              <td class="text-xs-left">{{props.item.coord[0].lat}}</td>
              <td class="justify-left layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </div>

      </div>
    </div>

  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'weatherstation',
    props: {},
    data() {
      return {
        search: '',
        stateAndCountry: {},
        WEATHERSTATION_URL: 'http://localhost:3030/weatherstation',
        COUNTRYAPI_URL: 'http://localhost:3030/country',
        STATEAPI_URL: 'http://localhost:3030/state',
        countries_list: [],
        states_list: [],
        weatherStations: [],
        dialog: false,
        ok: true,
        headers: [
          {
            text: 'IP address',
            align: 'left',
            sortable: false,
            value: 'ip_adr'
          },
          {text: 'Status', value: 'status'},
          {text: 'State', value: 'state[0].name'},
          {text: 'Longitude', value: 'coord[0].lng'},
          {text: 'Latitude', value: 'coord[0].lat'},
          {text: 'Actions', value: 'name', sortable: false}
        ],
        items: [],
        editedIndex: -1,
        editedItem: {
          ip_adr: '',
          status: '',
          state: [{name: ''}],
          coord: [{lng: '', lat: ''}],
          country: ''
        },
        defaultItem: {
          ip_adr: '',
          status: '',
          state: [{name: ''}],
          coord: [{lng: '', lat: ''}],
          country: ''
        }
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New weather station' : 'Edit weather station'
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    },

    created() {
      var self = this;
      //TODO : put api routes in a seperate file
      axios.get(self.WEATHERSTATION_URL)
        .then(function (response) {
          self.weatherStations = response.data;
          self.initialize();
        })
        .catch((error) => {
        });
    },

    methods: {
      getCoords(newVal) {
        var self = this;
        if (newVal.state === undefined) {

          axios.get(this.STATEAPI_URL + '/' + newVal)
            .then(function (response) {
              newVal = {text: newVal, _id: response.data._id, country: response.data.country}
              self.stateAndCountry.state = newVal.text;
              self.stateAndCountry.state_id = newVal._id;
              self.stateAndCountry.country = newVal.country;
              console.log(newVal)
              var GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD5PrQC4WPoZRSi7waFLcOj9EF1V3bMrXc&sensor=false&components='
                + 'country:' + self.stateAndCountry.country + '&address=' + self.stateAndCountry.state + '';


              axios.get(GEOCODE_API)
                .then(function (response) {
                  self.editedItem.coord[0].lng = response.data.results[0].geometry.location.lng;
                  self.editedItem.coord[0].lat = response.data.results[0].geometry.location.lat;
                })
                .catch((error) => {

                });
            })
            .catch((error) => {
            });
        }
        else {
          self.stateAndCountry.state = newVal.state;
          self.stateAndCountry.state_id = newVal._id;
          var GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD5PrQC4WPoZRSi7waFLcOj9EF1V3bMrXc&sensor=false&components='
            + 'country:' + self.stateAndCountry.country + '&address=' + self.stateAndCountry.state + '';

          axios.get(GEOCODE_API)
            .then(function (response) {
              self.editedItem.coord[0].lng = response.data.results[0].geometry.location.lng;
              self.editedItem.coord[0].lat = response.data.results[0].geometry.location.lat;
            })
            .catch((error) => {

            });
        }
      },
      showStates(newVal) {
        var self = this;
        self.stateAndCountry.country = newVal.isoCode;
        var GETSTATESBYCOUNTRY_API = '';
        console.log(newVal.text === undefined);
        if (newVal.text === undefined) {
          var GETCOUNTRYBYISO = self.COUNTRYAPI_URL + '/' + newVal;
          axios.get(GETCOUNTRYBYISO)
            .then(function (response) {
              newVal = {text: newVal, isoCode: response.data.isoCode}
              GETSTATESBYCOUNTRY_API = self.COUNTRYAPI_URL + '/' + newVal.text + '/states';
              axios.get(GETSTATESBYCOUNTRY_API)
                .then(function (response) {
                  self.states_list = response.data;
                })
                .catch((error) => {
                });
            })
            .catch((error) => {
            });
        }
        else {
          GETSTATESBYCOUNTRY_API = self.COUNTRYAPI_URL + '/' + newVal.text + '/states';
          axios.get(GETSTATESBYCOUNTRY_API)
            .then(function (response) {
              self.states_list = response.data;
            })
            .catch((error) => {
            });
        }
      },
      initWeatherStation() {
        var self = this;
        axios.get(self.COUNTRYAPI_URL)
          .then(function (response) {
            // console.log(response.data[0])
            self.countries_list = response.data;
          })
          .catch((error) => {
          });
      },
      initialize() {
        this.items = this.weatherStations;
      },

      editItem(item) {
        //              this.initWeatherStation();

        this.editedIndex = this.items.indexOf(item);
        this.editedItem = Object.assign({}, item);
        axios.get(this.COUNTRYAPI_URL + '/' + this.editedItem.state[0].country[0])
          .then((response) => {
            this.initWeatherStation();
            this.editedItem.country = response.data.text;
            this.stateAndCountry.country = response.data.text;
            console.log(this.editedItem)
            this.showStates(response.data);
            this.getCoords({
              state: this.editedItem.state[0].name,
              state_id: this.editedItem.state[0]._id
            });
          })
          .catch((error) => {
          });


        this.dialog = true
      },

      deleteItem(item) {
        const index = this.items.indexOf(item);

        axios.delete(this.WEATHERSTATION_URL + '/' + item._id)
          .then((response) => {
            this.items.splice(index, 1);
            console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        var wsFromForm = {
          status: this.editedItem.status,
          ip_adr: this.editedItem.ip_adr,
          coord: [{
            lng: this.editedItem.coord[0].lng,
            lat: this.editedItem.coord[0].lat
          }],
          state: {
            _id: this.stateAndCountry.state_id
          }
        };
        console.log(this.editedItem.country);
        if (this.editedIndex > -1) {
          console.log(this.WEATHERSTATION_URL + '/' + this.editedItem._id);
          // wsFromForm.state._id = this.editedItem.state[0]._id;
          console.log(wsFromForm)
          axios.put(this.WEATHERSTATION_URL + '/' + this.editedItem._id, wsFromForm)
            .then((response) => {
              /*response.data.state=[{
                  name:wsFromForm.state
              }];*/
              console.log(response.data);
              // this.stateAndCountry.state
              this.items.splice(this.editedIndex, 1, response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log(wsFromForm);
          //self = this;
          axios.post(this.WEATHERSTATION_URL, wsFromForm)
            .then((response) => {
              wsFromForm.state = [{
                name: this.stateAndCountry.state
              }];
              this.items.push(wsFromForm);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        this.close()
      }
    }
  }
</script>

