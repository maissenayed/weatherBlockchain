<template>

  <v-toolbar fixed class="white" id="">
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat large color="primary" v-if="!$auth.check()" to="/" active-class> Home</v-btn>
      <v-btn flat large color="primary" v-if="!$auth.check()" to="/session/login">Login</v-btn>
      <v-btn flat large color="primary" v-if="!$auth.check()" to="/session/sign-up">Register</v-btn>
      <div class="text-xs-center" style="margin-top: 20px" v-if="$auth.check()">
        <v-btn outline color="blue" dark @click.prevent="addToExpirationDate" :disabled="token_balance==0">+</v-btn>
      </div>
      <v-chip label outline color="blue" v-if="$auth.check()">API expiration date : {{apiExpirationDate| formatDate}}</v-chip>
      <v-chip label outline color="blue" v-if="$auth.check()">Token balance : {{token_balance}} </v-chip>
      <!--<v-btn flat large color="primary" v-if="$auth.check()" class="pull-right" @click.prevent="goToPricing">Pricing</v-btn>-->
      <v-btn flat large color="primary" v-if="$auth.check()" class="pull-right" @click.prevent="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>

</template>

<script>

  import axios from 'axios'
  import EventBus from "../../lib/eventBus";
  export default {

    data() {
      return {
        title: 'Your Logo',
        apiExpirationDate: new Date(),
        token_balance: 0,
        USER_URL: 'http://localhost:3030/users',
        loggedUser: null
      }
    },
    created(){
      this.loggedUser = JSON.parse(localStorage.getItem('user'));
      axios.get(this.USER_URL + '/' + this.loggedUser.id)
        .then((response) => {

          this.token_balance = response.data.token_balance;
          this.apiExpirationDate = response.data.apiExpirationDate;

          this.apiExpirationDate = new Date(this.apiExpirationDate);
        })
        .catch((error) => {
        });

    },
    mounted(){

      EventBus.$on('addBalanceTicket', payload => {
        this.token_balance += payload;
        var userFromForm = {
          token_balance: this.token_balance
        };
        axios.put(this.USER_URL + '/' + this.loggedUser.id+'/TB', userFromForm)
          .then((response) => {
          })
          .catch(function (error) {
            console.log(error);
          })
      })
      EventBus.$on('addWeekToExpiration', payload => {

        this.apiExpirationDate = new Date(this.apiExpirationDate);
        this.apiExpirationDate.setDate(this.apiExpirationDate.getDate() + payload);
        var userFromForm = {
          apiExpirationDate: this.apiExpirationDate
        };
        axios.put(this.USER_URL + '/' + this.loggedUser.id+'/AED', userFromForm)
          .then((response) => {
          })
          .catch(function (error) {
            console.log(error);
          })

      })
      EventBus.$on('addMonthToExpiration', payload => {
        this.apiExpirationDate = new Date(this.apiExpirationDate);
        this.apiExpirationDate.setDate(this.apiExpirationDate.getDate() + payload);
        var userFromForm = {
          apiExpirationDate: this.apiExpirationDate
        };
        axios.put(this.USER_URL + '/' + this.loggedUser.id+'/AED', userFromForm)
          .then((response) => {
          })
          .catch(function (error) {
            console.log(error);
          })
      })
    },
    methods: {
      addToExpirationDate(){
        this.apiExpirationDate = new Date(this.apiExpirationDate);
        this.apiExpirationDate.setDate(this.apiExpirationDate.getDate() + 1);
        this.token_balance-=1;
        var userFromForm = {
          apiExpirationDate: this.apiExpirationDate,
          token_balance: this.token_balance
        };
        axios.put(this.USER_URL + '/' + this.loggedUser.id+'/AEDANDTB', userFromForm)
          .then((response) => {
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      logout() {
        this.$auth.logout({
          makeRequest: false,
          success() {
            localStorage.clear();
          },
          error() {
            localStorage.clear();
          },
          redirect: '/',
        });
      },
      goToPricing(){
        this.$router.push('/pricing');
      }
    }
  }

</script>


<style scoped>
  #logo {
    position: fixed;
  }

  #cardbox {
    display: inline;
  }


</style>
