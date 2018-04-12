<template>
  <div>
    <app-header></app-header>
      <highmaps :options="options"></highmaps>
    <app-footer></app-footer>
  </div>
</template>


<script>
import axios from 'axios';
import {wordHelper} from '../../utils/highchartsOptionHelper'
import {getWordDataFromJson} from '../../utils/jsonHelper'
import Header from './header';
import Footer from './footer';
	export default {
		data(){
			return {
				options:{}
			}
		},	components:{

      'app-header':Header,
      'app-footer':Footer,


    },
		methods:{


			getMap(){

            axios.get(`https://code.highcharts.com/mapdata/custom/world-palestine-highres.geo.json`)
            .then(rep=>{
          			axios.get('http://localhost:3030/weatherdata/fullmap').then(repw=>{
          		  			  this.options=wordHelper(getWordDataFromJson(repw.data),rep.data,this.changeToCountry);
          					})
          })

			},

			changeToCountry(country){
				this.$router.push('/map/'+country);
			}
		},
    beforeMount: function () {
      this.getMap();
    },
    created(){

      let usrJWTToken = JSON.parse(localStorage.getItem('user'));

      var dateComparison = Date.parse(usrJWTToken.apiKeyEXP) <= Date.parse(new Date());
      if (usrJWTToken.token_balance === 0 && dateComparison === true) {
        this.$router.push('/pricing');
      }
      if (usrJWTToken.role === "admin"){
        this.$router.push('/admin/userlist')
      }
    }





	}
</script>
