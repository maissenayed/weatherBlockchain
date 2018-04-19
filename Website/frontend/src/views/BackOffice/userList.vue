<template>
  <v-container fluid grid-list-xl py-0>
    <div class="app-card">

      <div class="app-card-content">

        <div>
          <v-layout row wrap align-baseline>
            <v-flex xs6>

              <v-dialog v-model="dialog" max-width="600px">
                <v-btn color="primary" dark slot="activator" class="mb-2"
                       @click.prevent="initUser">New User
                </v-btn>
                <v-card>

                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>

                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap row justify-space-around>
                        <v-flex xs6 sm6 md4>
                          <v-text-field label="Wallet address"
                                        v-model="editedItem.wallet_adr"></v-text-field>
                        </v-flex>

                        <v-flex xs6 sm6 md4>
                          <v-select
                            :items="ROLES_LIST"
                            v-model="editedItem.role"
                            placeholder="Role"
                            class="input-group--focused"
                            item-value="text"
                            color="grey"
                          ></v-select>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row justify-space-around>
                        <v-flex xs6 sm6 md4>
                          <v-text-field label="API key" v-model="editedItem.apiKey"></v-text-field>
                        </v-flex>
                        <v-flex xs6 sm6 md4>
                          <!--<v-text-field label="API expiration date"
                                        v-model="editedItem.apiExpirationDate"></v-text-field>-->
                          <v-menu
                            ref="menu"
                            lazy
                            :close-on-content-click="false"
                            v-model="menu"
                            transition="scale-transition"
                            offset-y
                            full-width
                            :nudge-right="40"
                            min-width="290px"
                            :return-value.sync="editedItem.apiExpirationDate"
                          >
                            <v-text-field
                              slot="activator"
                              label="API expires at"
                              v-model="editedItem.apiExpirationDate"
                              prepend-icon="event"
                              readonly
                            ></v-text-field>
                            <v-date-picker v-model="editedItem.apiExpirationDate" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                              <v-btn flat color="primary"
                                     @click="$refs.menu.save(editedItem.apiExpirationDate)">OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap row justify-space-around>
                        <v-flex xs6 sm6 md4>
                          <v-text-field
                            v-model="editedItem.password"
                            name="input-10-1"
                            label="Enter your password"
                            hint="At least 8 characters"
                            min="8"
                            :append-icon="hide_password ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (hide_password = !hide_password)"
                            :type="hide_password ? 'password' : 'text'"

                          ></v-text-field>
                        </v-flex>
                        <v-flex xs6 sm6 md4>
                          <v-text-field label="Token balance"
                                        v-model="editedItem.token_balance"></v-text-field>
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

            </v-flex>
            <v-flex xs6 >
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
            class="elevation-1 py-0"
            :search="search"
          >

            <template slot="items" slot-scope="props">
              <td class="text-xs-">{{ props.item.wallet_adr }}</td>
              <td class="text-xs-left">{{ props.item.role }}</td>
              <td class="text-xs-left">{{ props.item.apiKey }}</td>
              <td class="text-xs-left">{{ props.item.apiExpirationDate | formatDate }}</td>
              <td class="text-xs-left ">{{ props.item.token_balance }}</td>
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>


              </td>

            </template>

            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>

          </v-data-table>

        </div>

      </div>
    </div>
  </v-container>

</template>

<script>
  import axios from 'axios'


  export default {
    name: 'user',
    props: {},
    data() {
      return {
        search: '',
        hide_password: true,
        USER_URL: '/users',
        menu: false,
        ROLES_LIST: [{text: 'admin'}, {text: 'client'}],
        users: [],
        dialog: false,
        headers: [
          {
            text: 'Wallet address',
            align: 'left',
            sortable: false,
            value: 'wallet_adr'
          },
          {text: 'Role', value: 'role'},
          {text: 'API key', value: 'apiKey'},
          {text: 'API expiration date', value: 'apiExpirationDate'},
          {text: 'Token balance', value: 'token_balance'},
          {text: 'Actions', value: 'name', sortable: false}
        ],
        items: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          role: '',
          apiKey: '',
          apiExpirationDate: '',
          token_balance: '',
          password: '',
          _id: ''
        },
        defaultItem: {
          name: '',
          role: '',
          apiKey: '',
          apiExpirationDate: '',
          token_balance: '',
          password: '',
          _id: ''
        }
      }
    },
    created() {

      var self = this;
      // vuetify data table

      //TODO : put api routes in a seperate file
      axios.get(self.USER_URL)
        .then(function (response) {
          self.users = response.data;
          self.initialize();
        })
        .catch((error) => {
        });
    },

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    methods: {
      initUser() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 17; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        this.editedItem.apiKey = text;
        this.editedItem.apiExpirationDate = new Date().toISOString().slice(0, 10);
        this.editedItem.token_balance = 0;
      },
      initialize() {
        this.items = this.users;
      },

      editItem(item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item);
        this.dialog = true
      },

      deleteItem(item) {


        const index = this.items.indexOf(item);

        axios.delete(this.USER_URL + '/' + item._id)
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
        var userFromForm = {
          wallet_adr: this.editedItem.wallet_adr,
          token_balance: this.editedItem.token_balance,
          apiExpirationDate: this.editedItem.apiExpirationDate,
          apiKey: this.editedItem.apiKey,
          username: this.editedItem.wallet_adr,
          password: this.editedItem.password,
          role: this.editedItem.role
        };
        if (this.editedIndex > -1) {
          console.log(this.editedItem.password);

          axios.put(this.USER_URL + '/' + this.editedItem._id, userFromForm)
            .then((response) => {
              var self = this;
              // vuetify data table

              //TODO : put api routes in a seperate file
              axios.get(self.USER_URL)
                .then(function (response) {
                  self.users = response.data;
                  self.initialize();
                })
                .catch((error) => {
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          axios.post(this.USER_URL, userFromForm)
            .then((response) => {
              this.items.push(userFromForm);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        this.close()
      }
    },
    mounted () {
      let self = this;
    axios.get('/api/price').then(function (response) {
        if(response.data.notification){
          setTimeout(()=>{
            self.showPriceChangeMessage();
          },2500);

        }
    })
    },
    notifications: {
      showPriceChangeMessage: { // You can have any name you want instead of 'showLoginError'
        title: 'Welcome Admin',
        message: 'The ETH price has changed ',
        type: 'warn', // You also can use 'VueNotifications.types.error' instead of 'error'
        timeout: 3000
      }
    }
  }
</script>

