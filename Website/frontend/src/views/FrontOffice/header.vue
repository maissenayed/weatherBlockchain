<template>

    <v-toolbar fixed class="white" id="">
      <v-toolbar-title v-text="title"></v-toolbar-title>
       <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat large color="primary" v-if="!$auth.check()" to="/" active-class> Home</v-btn>
        <v-btn flat large color="primary" v-if="!$auth.check()" to= "/session/login" >Login</v-btn>
        <v-btn flat large color="primary" to= "/session/sign-up" >Register</v-btn>
        <v-btn flat large color="primary" v-if="$auth.check()" class="pull-right"><a href="#" @click.prevent="$auth.logout()">Logout</a></v-btn>
      </v-toolbar-items>
    </v-toolbar>

</template>

<script>


export default {

	    data () {
      return {
        title: 'Your Logo'
      }
}}

</script>


<style scoped>
#logo{
	position: fixed;
}

#cardbox{
	display: inline;
}


</style>
