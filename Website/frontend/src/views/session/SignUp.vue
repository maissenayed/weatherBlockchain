<template>
  <div class="session-banner">
    <v-container pa-0>
      <v-layout row wrap>
        <v-flex xs12 sm10 md10 mx-auto>
          <div class="mb-70">
            <a href="/" class="d-block text-xs-center"><img src="/static/img/session-logo.png" /></a>
          </div>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <div class="session-block">
                <div class="session-head text-xs-center">
                  <div class="div-icon mb-3">
                    <i class="ti-lock font-2x"></i>
                  </div>
                  <h3 class="mb-4">Register</h3>
                  <p class="fs-14 px-5">Enter username and password to create your account .</p>
                </div>
                <div class="alert alert-danger" v-if="error && !success">
                  <p>There was an error, unable to complete registration.</p>
                </div>
                <div class="alert alert-success" v-if="success">
                  <p>Registration completed. You can now <router-link :to="{name:'login'}">sign in.</router-link></p>
                </div>
                <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post" class="mb-4">
                  <v-text-field label="Username" v-model="name"  :counter="20" required></v-text-field>
                  <span class="help-block" v-if="error && errors.name">{{ errors.name }}</span>
                  <v-text-field label="Wallet ID" v-model="adress"  required></v-text-field>
                  <v-text-field label="Password" v-model="password"  type="password" required></v-text-field>
                  <v-btn type="submit" block class="btn-gradient-warning">Create Account</v-btn>
                </form>
                <p class="text-xs-center mb-0 log-link">Already have an account? <router-link to="/session/login">Log In</router-link></p>
              </div>
            </v-flex>
            <v-flex xs12 md5 offset-md1 d-sm-none>
              <div class="block-center">
                <div class="mb-4 session-content">
                  <h3 class="mb-3">Register</h3>
                  <p class="fs-14">Enter username and password to create your account .</p>
                </div>
                <div class="mb-4 session-content">
                  <h3 class="mb-3">Wallet ID</h3>
                  <p class="fs-14">A cryptocurrency wallet stores the public and private "keys" or "addresses" which can be used to receive or spend Ether.</p>
                </div>
                <div class="mb-4 session-content">
                  <h3 class="mb-3">Ether</h3>
                  <p class="fs-14">Ether, a form of digital payment that powers our network .</p>
                </div>
                <div class="mb-4 session-content">
                  <h3 class="mb-3">MetaMask</h3>
                  <p class="fs-14">MetaMask is a digital wallet used specifically with web apps .</p>
                </div>




              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

  var qs = require('qs');
  export default {
    data(){
      return {
        name: '',
        adress:'',
        password: '',
        error: false,
        errors: {},
        success: false
      };
    },
    methods: {
      register(){
        var app = this
        this.$auth.register({
          data:qs.stringify({
            name: this.name,
            address:this.adress,
            password: this.password,
          }),
          success: function (res) {console.log(res.data.token);
            console.log(res.data);
            app.$auth.user(res.data.userInfo);
            console.log(app.$auth.user().role);
            app.$auth.token('access_token', res.data.token);
            app.success = true
          },
          error: function (resp) {
            app.error = true;
            app.errors = resp.response.data.errors;
          },

          redirect: '/admin/userlist',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        });
      }
    }
  }
</script>
