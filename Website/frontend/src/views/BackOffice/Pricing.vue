<template>
  <v-container fluid grid-list-xl py-0>
    <div v-if="transaction_data">
      <ul>
        <li>{{blockHash}}</li>
        <li>{{blockNumber}}</li>
        <li>{{cumulativeGasUsed}}</li>
        <li>{{from}}</li>
        <li>{{to}}</li>
        <li>{{gasUsed}}</li>
        <li>{{transactionHash}}</li>

      </ul>
    </div>
    <div v-if="weather_data">
      <h3>Weather data : </h3>
      <ul id="json_weather_data"></ul>
    </div>
    <div v-if="dragon" id="loader">
      <!--<p>The transaction is still being mined</p>
      <img class="centerLoader" src="./images/EllipsisSpinner.gif" alt="EllipsisSpinner.gif">-->
      <div id="world"></div>
      <div id="instructions">The longer you keep clicking, the faster your transaction gets mined ... <br/><span
        class="lightInstructions">- Press and drag to turn around -</span></div>
      <div id="credits">
        <p><a href="https://codepen.io/Yakudoo/" target="blank">my other codepens</a> | <a href="https://www.epic.net"
                                                                                           target="blank">epic.net</a>
        </p>
      </div>
      <div id="power">00</div>
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
              <a href="javascript:;" class="btn btn-block btn-gradient-primary white--text" @click="buyTicket">Buy now
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
              <a href="javascript:;" class="btn btn-block btn-gradient-success white--text">Buy now ! </a>
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
              <a href="javascript:;" class="btn btn-block btn-gradient-warning white--text">Buy now ! </a>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
<script>
  import {default as Web3} from 'web3';
  import axios from 'axios'


  export default {
    name: 'Pricing',
    props: {},
    data() {
      return {
        dragon: false,
        ctr: true,
        transaction_data: false,
        blockHash: '',
        blockNumber: '',
        cumulativeGasUsed: '',
        from: '',
        gasUsed: '',
        to: '',
        transactionHash: '',
        weather_data: false
      }
    },
    methods: {
      buyTicket() {
        this.topup(1000, 10);
      },
      initContract() {
        const address = '0x48a9ca6e6cc7e5664ccc746213b3e3e6bf88e23d';
        const abi = [
          {
            "constant": false,
            "inputs": [],
            "name": "cashout",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "amountMonth",
                "type": "uint256"
              }
            ],
            "name": "changeMonthprice",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "amountticket",
                "type": "uint256"
              }
            ],
            "name": "changeTicketprice",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "amountWeek",
                "type": "uint256"
              }
            ],
            "name": "changeWeeKprice",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "plan",
                "type": "string"
              },
              {
                "indexed": false,
                "name": "from",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "week",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "month",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "ticket",
                "type": "uint256"
              }
            ],
            "name": "Sent",
            "type": "event"
          },
          {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
          },
          {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ];
        return web3.eth.contract(abi).at(address);
      },
      topup(ticket_price, nb_ticket) {
        var miniToken = this.initContract();
        const address = '0x48a9ca6e6cc7e5664ccc746213b3e3e6bf88e23d';
        web3.eth.sendTransaction({
          to: address,
          from: web3.eth.accounts[0],
          value: 7000000000000000,
          gas: 1000000
        }, function (err, res) {
          if (err)
            console.log(err);
          else {
            console.log(res);
            this.dragon = true;
            this.ctr = false;


            var miningTransaction = setInterval(function () {
              txReceipt = web3.eth.getTransactionReceipt(res, function (err, response) {
                if (err)
                  console.log(err);
                else {
                  if (response !== null) {
                    console.log(response);
                    clearInterval(miningTransaction);
                    this.dragon = false;


                    this.blockHash = response.blockHash;
                    this.blockNumber = response.blockNumber;
                    this.cumulativeGasUsed = response.cumulativeGasUsed;
                    this.from = response.from;
                    this.gasUsed = response.gasUsed;
                    this.to = response.to;
                    this.transactionHash = response.transactionHash;

                    axios.get('http://localhost:3002/weatherData')
                      .then(function (response) {
                        response = response.data;
                        for (i = 0; i < response.length; i++) {
                          var e = document.createElement('li');
                          e.innerHTML = 'latitude : ' + response[i].coord.lat + ',longitude : ' + response[i].coord.lng +
                            ',temperature :' + response[i].main.temp + ', humidity : ' +
                            response[i].main.humidity + ', pressure :' + response[i].main.pressure;
                          document.getElementById('json_weather_data').appendChild(e);

                        }
                      })
                      .catch((error) => {
                      });


                    this.transaction_data = true;
                    this.weather_data = true;

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
        console.log(web3);
      } else {
        this.error_msg = 'No web3? You should consider trying MetaMask!';
        this.display_error = true;
      }
    },
    created() {
      let tweenMaxScript = document.createElement('script')
      let threeScript = document.createElement('script')
      let orbitControlsScript = document.createElement('script')
      let dragonScript = document.createElement('script')
      //todo : import those from local
      tweenMaxScript.setAttribute('src', 'http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js')
      threeScript.setAttribute('src', 'http://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js')
      orbitControlsScript.setAttribute('src', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/264161/OrbitControls.js')
      dragonScript.setAttribute('src', 'assets/js/dragon.js');
      document.head.appendChild(tweenMaxScript)
      document.head.appendChild(threeScript)
      document.head.appendChild(orbitControlsScript)
      document.head.appendChild(dragonScript)
    }
  }
</script>
