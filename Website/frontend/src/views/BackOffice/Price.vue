<template>
  <v-container grid-list-xl fluid py-0>
    <div class="app-card">
      <div class="app-card-title">
        <h3>Update plans's prices ( ETH : $ {{ eth_price }} )</h3>
      </div>
      <div class="app-card-content input-label">
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <span class="small pt-4 d-block">Week Price</span>
          </v-flex>
          <v-flex xs12 sm8 >
            <div class="d-inline-flex">
              <v-text-field  name="input-1" label="Current Price USD" v-model="plans[1].value"></v-text-field> &nbsp;&nbsp;&nbsp;
              <v-text-field  name="input-1" large label="Current Price ETH" disabled v-model="plans_eth[1].value">   </v-text-field>
              <v-btn class="btn-primary" raised @click="adjustPriceWeek()"> &nbsp; Adjust Price &nbsp;</v-btn>
            </div>

          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <span class="small pt-4 d-block">Month Price</span>
          </v-flex>
          <v-flex xs12 sm8>
            <div class="d-inline-flex">
            <v-text-field name="input-2" label="Current Price USD" v-model="plans[2].value"></v-text-field>&nbsp;&nbsp;&nbsp;
            <v-text-field name="input-2" label="Current Price ETH" disabled v-model="plans_eth[2].value"></v-text-field>
              <v-btn class="btn-primary" raised @click="adjustPriceMonth()" > &nbsp; Adjust Price &nbsp;</v-btn>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <span class="small pt-4 d-block">10 Tickets Price</span>
          </v-flex>
          <v-flex xs12 sm8>
            <div class="d-inline-flex">
            <v-text-field name="input-3" label="Current Price USD" v-model="plans[0].value"></v-text-field>&nbsp;&nbsp;&nbsp;
            <v-text-field name="input-3" label="Current Price ETH" disabled v-model="plans_eth[0].value"></v-text-field>
              <v-btn class="btn-primary" raised @click="adjustPriceTickets()"> &nbsp; Adjust Price &nbsp;</v-btn>
            </div>
          </v-flex>
        </v-layout>



      </div>
    </div>
  </v-container>
</template>


<script>
  import axios from 'axios'
  import {abi,address} from './../../utils/configContract';
  import {default as Web3} from 'web3';

  export default {
    name: 'Pricing',
    props: {},
    data() {
      return {
          Plans_URL: '/api/price/usd',
          current_prices_api :'/api/price/eth',
          plans : [{value:0},{value:0},{value:0}],
          plans_eth : [{value:0},{value:0},{value:0}],
          eth_price : 0.0 ,
          contract : null
          }
        },
    created() {

      var self = this;
      // vuetify data table
      axios.get(self.Plans_URL)
        .then(function (response) {
          self.plans = response.data;
        })
        .catch((error) => {
        });

      axios.get(self.current_prices_api)
        .then(function (response) {
          self.plans_eth = response.data;
        })
        .catch((error) => {
        });

      axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR")
        .then(function (response) {
          self.eth_price = response.data.USD;
          initialize();
        })
        .catch((error) => {
        });
      //TODO : put api routes in a seperate file

    },
    methods: {
      initialize() {
        this.contract = web3.eth.contract(abi).at(address);
      },
      adjustPriceWeek(){
        this.plans_eth[1].value = (1/this.eth_price) * this.plans[1].value  ;
        const contract = web3.eth.contract(abi).at(address);
        contract.changeWeeKprice(web3.toWei(this.plans_eth[1].value),(err, res)=>{
          if(err){
            console.log(err);
          }
          else {
            console.log(res);
            this.changeInDB(this.plans_eth[1].name,this.plans_eth[1].value);
            this.changeInDB(this.plans[1].name,this.plans[1].value);
            let self = this;
            self.showContractPriceChangeMessage();

          }
        });
      },
      adjustPriceMonth(){

        this.plans_eth[2].value = (1/this.eth_price) * this.plans[2].value  ;
        const contract = web3.eth.contract(abi).at(address);
        contract.changeWeeKprice(web3.toWei(this.plans_eth[2].value),(err, res)=>{
          if(err){
            console.log(err);
          }
          else {
            this.changeInDB(this.plans_eth[2].name,this.plans_eth[2].value);
            this.changeInDB(this.plans[2].name,this.plans[2].value);
            let self = this;
            self.showContractPriceChangeMessage();
            console.log(res);
          }
        });
      },
      adjustPriceTickets(){
        this.plans_eth[0].value = (1/this.eth_price) * this.plans[0].value  ;
        const contract = web3.eth.contract(abi).at(address);
        contract.changeWeeKprice(web3.toWei(this.plans_eth[0].value),(err, res)=>{
          if(err){
            console.log(err);
          }
          else {
            this.changeInDB(this.plans_eth[0].name,this.plans_eth[0].value);
            this.changeInDB(this.plans[0].name,this.plans[0].value);
            let self = this;
            self.showContractPriceChangeMessage();
            console.log(res);
          }
        });
      },
      changeInDB(plan,valeur){
        axios.post('/api/price/'+plan,{newprice : valeur})
          .then(function (response) {
          console.log(response);
        })
          .catch((error) => {
          });
      }
    },
    notifications: {
      showContractPriceChangeMessage: { // You can have any name you want instead of 'showLoginError'
        title: 'Price Adjust',
        message: "The contract 's pricing was updated with success  ",
        type: 'success', // You also can use 'VueNotifications.types.error' instead of 'error'
        timeout: 3000
      }
    }
  }
</script>

