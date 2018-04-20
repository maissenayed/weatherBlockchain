<template>
  <div>
    <app-header></app-header>
    <v-container fluid grid-list-xl py-0>

      <div style="margin-top: 80px">

        <div v-if="transaction_data">
          <h3>Transaction information</h3>
          <ul>
            <li><b>From : </b>{{from}}</li>
            <li><b>To : </b>{{to}}</li>
            <li><b>Blockhash: </b>{{blockHash}}</li>
            <li><b>BlockNumber: </b>{{blockNumber}}</li>
            <li><b>Cumulative gas used : </b>{{cumulativeGasUsed}}</li>
            <li><b>Gas used : </b>{{gasUsed}}</li>
            <li><b>Transaction hash: </b>{{transactionHash}}</li>
          </ul>
        </div>
        <div v-if="loaderGIF" style="text-align: center">
          <p>Your transaction is being mined ... </p>
          <img src="../../assets/EllipsisSpinner.gif" alt="EllipsisSpinner">
        </div>
        <div v-if="ctr" class="pricing-wrapper">
          <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4>
              <div class="app-card text-xs-center">
                <div class="app-card-title gradient-primary">
                  <h2 class="white--text">Ticket plan</h2>
                  <!--<p class="mb-0">For most of the users</p>-->
                </div>
                <div class="app-card-content">
                  <h2 class="mb-4 font-3x"><span class="font-xl">$10</span><sub>/10 Tickets</sub></h2>
                  <ul class="list-unstyled list-group-flush">
                    <li class="list-group-item">Personal use</li>
                    <li class="list-group-item">Full access</li>
                    <li class="list-group-item">24/7 support</li>
                  </ul>
                </div>
                <div class="app-footer">
                  <a href="javascript:;" class="btn btn-block btn-gradient-primary white--text"
                     @click="topup(plans_eth[0].value, 10)">Buy now
                    ! </a>
                </div>
              </div>
            </v-flex>
            <v-flex xs12 sm6 md6 lg4>
              <div class="app-card text-xs-center">
                <div class="app-card-title gradient-success">
                  <h2 class="white--text">Weekly plan</h2>
                  <!--<p class="mb-0">For most of the users</p>-->
                </div>
                <div class="app-card-content">
                  <h2 class="mb-4 font-3x"><span class="font-xl">$20</span><sub>/Week</sub></h2>
                  <ul class="list-unstyled list-group-flush">
                    <li class="list-group-item">Personal use</li>
                    <li class="list-group-item">Full access</li>
                    <li class="list-group-item">24/7 support</li>
                  </ul>
                </div>
                <div class="app-footer">
                  <a href="javascript:;" class="btn btn-block btn-gradient-success white--text"
                     @click="topup(plans_eth[1].value,'week')">Buy now ! </a>
                </div>
              </div>
            </v-flex>
            <v-flex xs12 sm6 md6 lg4>
              <div class="app-card text-xs-center">
                <div class="app-card-title gradient-warning">
                  <h2 class="white--text">Monthly plan</h2>
                  <!--<p class="mb-0">For developer</p>-->
                </div>
                <div class="app-card-content">
                  <h2 class="mb-4 font-3x"><span class="font-xl">$50</span><sub>/Month</sub></h2>
                  <ul class="list-unstyled list-group-flush">
                    <li class="list-group-item">Personal use</li>
                    <li class="list-group-item">Full access</li>
                    <li class="list-group-item">24/7 support</li>
                  </ul>
                </div>
                <div class="app-footer">
                  <a href="javascript:;" class="btn btn-block btn-gradient-warning white--text"
                     @click="topup(plans_eth[2].value,'month')">Buy now ! </a>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </div>

    </v-container>
  </div>
</template>
<script>
  import axios from 'axios'
  import {default as Web3} from 'web3';
  import {EventBus} from '../../lib/eventBus';
  import Header from './header';
  import {abi,address} from './../../utils/configContract';

  export default {
    name: 'Pricing',
    props: {},
    components: {

      'app-header': Header,

    },
    data() {
      return {
        loaderGIF: false,
        ctr: true,
        transaction_data: false,
        blockHash: '',
        blockNumber: '',
        cumulativeGasUsed: '',
        from: '',
        gasUsed: '',
        to: '',
        transactionHash: '',
        plans_eth : [{value:0},{value:0},{value:0}],
        current_prices_api :'/api/price/eth'
      }
    },
    methods: {
      initContract() {

        return web3.eth.contract(abi).at(address);
      },
      topup(ticket_price, nb_Ticket_Or_Type_Of_Offer) {
        ticket_price = web3.toWei(ticket_price);
        var miniToken = this.initContract();
        //const address = '0x48a9ca6e6cc7e5664ccc746213b3e3e6bf88e23d';
        let price = 0;
        if (typeof nb_Ticket_Or_Type_Of_Offer !== "string") {
          price = ticket_price * nb_Ticket_Or_Type_Of_Offer;
        }
        else {
          price = ticket_price;
        }


        web3.eth.sendTransaction({
          to: address,
          from: web3.eth.accounts[0],
          value: price,
          gas: 1000000
        }, (err, res) => {
          if (err)
            console.log(err);
          else {
            console.log(res);
            this.loaderGIF = true;
            this.ctr = false;


            var miningTransaction = setInterval(() => {
              txReceipt = web3.eth.getTransactionReceipt(res, (err, response) => {
                if (err)
                  console.log(err);
                else {
                  if (response !== null) {
                    console.log(response);
                    clearInterval(miningTransaction);
                    this.loaderGIF = false;


                    this.blockHash = response.blockHash;
                    this.blockNumber = response.blockNumber;
                    this.cumulativeGasUsed = response.cumulativeGasUsed;
                    this.from = response.from;
                    this.gasUsed = response.gasUsed;
                    this.to = response.to;
                    this.transactionHash = response.transactionHash;

                    this.transaction_data = true;
                    //todo : change token balance here

                    if (typeof nb_Ticket_Or_Type_Of_Offer !== "string") {
                      EventBus.$emit('addBalanceTicket', 10);
                      this.$router.go('/map');

                    }
                    else if (nb_Ticket_Or_Type_Of_Offer === "week") {
                      console.log('week')
                      EventBus.$emit('addWeekToExpiration', 7);
                      this.$router.go('/map');
                    }
                    else {
                      console.log('month');
                      EventBus.$emit('addMonthToExpiration', 30);
                      this.$router.go('/map');
                    }

                  }
                  else {
                    console.log('transaction still being mined')
                  }
                }
              });
            }, 10000);
          }
        });

      }
    },
    mounted() {
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);

      } else {
        console.log('No web3? You should consider trying MetaMask!');
      }
    },
    created(){
      var self = this;
      axios.get(self.current_prices_api)
        .then(function (response) {
          self.plans_eth = response.data;
        })
        .catch((error) => {
        });
    }
  }
</script>
