<template>
  <div class="session-banner">
    <v-container px-0>
      <v-layout row wrap>
        <v-flex xs12 sm10 md6 lg5 mx-auto>
          <div class="mb-70">
            <router-link to="/" class="d-block text-xs-center"><img src="/static/img/session-logo.png"/></router-link>
          </div>
          <div class="session-block">
            <div class="session-head text-xs-center">
              <div class="div-icon mb-3">
                <i class="ti-lock font-2x"></i>
              </div>
              <h3 class="mb-4">Login </h3>
              <p class="fs-14 px-5">Enter username and password to access your account .</p>
            </div>
            <div class="alert alert-danger" v-if="error">
              <p>There was an error, unable to sign in with those credentials.</p>
            </div>
            <form autocomplete="off" @submit.prevent="login" method="post" class="mb-4">
              <v-text-field label="UserName" v-model="name" required></v-text-field>
              <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
              <v-checkbox label="Remember me"></v-checkbox>


              <v-layout row>
                <v-flex xs6>
                  <v-btn type="submit" block large color="primary" xs6>Login Now</v-btn>
                </v-flex>
                <v-flex xs6>
                  <v-card-media
                    @click="startApp()"
                    src="/static/img/loginwithmetamask.png"
                    height="60px"
                    contain
                  ></v-card-media>
                </v-flex>
              </v-layout>

              <v-btn block large color="warning">Create Account</v-btn>

            </form>
            <p class="text-xs-center mb-0 log-link">
              <router-link to="/session/login">Forgot password?</router-link>
            </p>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {default as Web3} from 'web3';
  import axios from 'axios';

  var qs = require('qs');
  export default {
    data() {
      return {
        REDIRECT_URL: '/pricing',
        name: "",
        password: "",
        error: false,
        error_msg: '',
        display_error: false,
        network_name: '',
        wallet_id: '',
        unlock_msg: 'please unlock MetaMask',
        unlock_error: false,
      }
    },
    mounted() {
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        this.display_error = false;
        web3 = new Web3(web3.currentProvider);

      } else {
        this.error_msg = 'No web3? You should consider trying MetaMask!';
        this.display_error = true;
      }
    },
    methods: {
      login() {
        this.$auth.login({
          data: qs.stringify({
            name: this.name,
            password: this.password,
          }),
          success: function (res) {
            console.log(res.data.token);
            console.log(res.data);
            this.$auth.user(res.data.userInfo);
            console.log(this.$auth.user().role);
            localStorage.clear();
            this.$auth.token('default-auth-token', res.data.token);
            localStorage.setItem('default-auth-token', res.data.token);
            this.$auth.check('true');
            console.log(res.data.userInfo);
            var CurrentUser = new Object({});
            CurrentUser.role = res.data.userInfo.role;
            CurrentUser.apiKeyEXP = res.data.userInfo.apiKeyEXP;
            CurrentUser.username = res.data.userInfo.username;
            CurrentUser.id = res.data.userInfo._id;
            CurrentUser.token_balance = res.data.userInfo.token_balance;

            localStorage.setItem('user', JSON.stringify(CurrentUser));
            let usrJWTToken = JSON.parse(localStorage.getItem('user'));
            console.log(usrJWTToken.token_balance !== 0)
            /*if(usrJWTToken.token_balance !== 0 || usrJWTToken.apiKeyEXP !== new Date()){
              var redirect = this.$auth.redirect();

              this.$auth.login({
                redirect: "/map"
              });
            }*/
          },
          error: function () {
          },
          method: 'POST',
          rememberMe: true,
          redirect: this.REDIRECT_URL,
          fetchUser: true,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        });

      },
      sign(account) {
        let self = this;
        web3.personal.sign(web3.toHex("270bytes weather"), account, (err, res) => {
          if (err == null) {

            axios.post('/auth/sign', qs.stringify({
              address: account,
              signature: res

            }), {
              headers: {
                'Content-type': 'application/x-www-form-urlencoded'
              }
            })
              .then((res) => {
                console.log(res.data);
                console.log(res.data.userInfo);
                self.$auth.user(res.data.userInfo);
                console.log(this.$auth.user().role);
                self.$auth.token('default-auth-token', res.data.token);
                localStorage.setItem('default-auth-token', res.data.token);
                localStorage.setItem('user', res.data.userInfo);
                self.$auth.check('true');
                self.$router.push('/map');

              })
              .catch(function (error) {
                // router.push('/session/sign-up');
                console.log(error);
              });

          }
        });
      },
      startApp() {

        web3.version.getNetwork((err, netId) => {
          switch (netId) {
            case "1":
              this.network_name = 'mainnet'
              break
            case "2":
              this.network_name = 'deprecated Morden test network.'
              break
            case "3":
              this.network_name = 'ropsten test network.'
              break
            case "4":
              this.network_name = 'rinkeby test network.'
              break
            case "42":
              this.network_name = 'kovan test network.'
              break
            default:
              this.network_name = 'unknown network.'
          }
        })

        var account = web3.eth.accounts[0];
        var accountInterval = setInterval(function () {
          if (web3.eth.accounts.length > 0) {
            this.wallet_id = account
            this.sign(account);
            clearInterval(accountInterval);
          }
          else {
            this.unlock_error = true;
            this.unlock_msg = 'please unlock MetaMask';
          }


        }.bind(this), 100);
      }
    }
  }
</script>
