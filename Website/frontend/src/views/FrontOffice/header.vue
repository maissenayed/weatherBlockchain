<template>

    <v-toolbar fixed class="white" id="">
      <v-toolbar-title v-text="title"></v-toolbar-title>
       <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat large color="primary" v-if="!$auth.check()" to="/" active-class> Home</v-btn>
        <v-btn flat large color="primary" v-if="!$auth.check()" to= "/session/login" >Login</v-btn>
        <v-btn flat large color="primary" v-if="!$auth.check()" to= "/session/sign-up" >Register</v-btn>
        <v-btn flat large color="primary" v-if="$auth.check()" class="pull-right" @click.prevent="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

</template>

<script>


export default {

	    data () {
      return {
        title: 'Your Logo'
      }
},methods: {
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
    }}}

</script>


<style scoped>
#logo{
	position: fixed;
}

#cardbox{
	display: inline;
}


</style>
