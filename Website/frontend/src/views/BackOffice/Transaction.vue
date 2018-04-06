<template>
  <v-container fluid grid-list-xl py-0>
    <div class="app-card">
      <div class="app-card-content">
        <div>
          <v-app id="inspire">
            <v-data-table
              :headers="headers"
              :items="items"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.sender_adr}}</td>
                <td class="text-xs-left">{{ props.item.contract_adr }}</td>
                <td class="text-xs-left">{{ props.item.selected_package }}</td>
                <td class="text-xs-left">{{ props.item.transaction_date | formatDate}}</td>
                <td class="text-xs-left">{{ props.item.purchase_amount }}</td>
              </template>

            </v-data-table>
          </v-app>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'transaction',
    props: {},
    data() {
      return {
        TRANSACTION_URL: 'http://localhost:3030/transaction',
        transactions: [],
        headers: [
          {
            text: 'Sender address',
            align: 'left',
            sortable: false,
            value: 'sender_adr'
          },
          {text: 'Contract address', value: 'contract_adr', align: 'left', sortable: false},
          {text: 'Selected package', value: 'selected_package'},
          {text: 'Transaction date', value: 'transaction_date'},
          {text: 'Purchase amount', value: 'purchase_amount'}
        ],
        items: []
      }
    },
    created() {

      var self = this;
      // vuetify data table

      //TODO : put api routes in a seperate file
      axios.get(self.TRANSACTION_URL)
        .then(function (response) {
          self.transactions = response.data;
          self.initialize();
        })
        .catch((error) => {
        });
    },
    methods: {
      initialize() {
        this.items = this.transactions;
      }
    }
  }
</script>

