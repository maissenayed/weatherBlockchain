<template>

	<div>
		 <v-app id="inspire">
       <app-header></app-header>
		<highmaps class="mr" ref="cmap" :options="options"></highmaps>
		<div class="mr controle">

      <v-radio-group v-model="radioGroup" row>
        <v-radio
          v-for="n in lst"
          :key="n"
          :label="`${n}`"
          :value="n"
        ></v-radio>
      </v-radio-group>


		</div>
		<highcharts class="mr" ref="lchart" :options="stateOptions"></highcharts>
		<app-paginator v-bind:country="fullNameCountry"></app-paginator>
       <app-footer></app-footer>
		</v-app>
	</div>
</template>

<script>
import axios from 'axios';

import {coutryHelper,stateHelper} from '../../utils/highchartsOptionHelper'
import {getStateDataFromJson} from '../../utils/jsonHelper'
import placesPaginator from './placesPaginator';
import Header from './header';
import Footer from './footer';
	export default{
		props:['country'],
		components:{
			'app-paginator':placesPaginator,
      'app-header':Header,
      'app-footer':Footer,
		},
		data(){
			return{
      		options:{},
      		stateOptions:{},
      		selectedStates:[],
      		lst:['temp','humidity','pressure'],
      		radioGroup:'temp',
      		fullNameCountry:''
			}
		},

		methods:{
			mapinit(country){
				let url ='https://code.highcharts.com/mapdata/countries/'+country+'/'+country+'-all.geo.json'


				            axios.get(url)
				          .then(rep=>{
				          			this.fullNameCountry=rep.data.title;
				                   	axios.get('http://localhost:3030/weatherdata/fullmap/'+country).then(repw=>{
				          			let data=repw.data.hmap.temp;
				     		 this.options=coutryHelper(rep.data,data,this.$refs,this.addSelect,this.removeSelect);
				          	})
                  console.log(this.fullNameCountry)
				          })


				          this.stateOptions=stateHelper();

			},

			addSelect(st){
				this.$set(this.selectedStates,st,st);
			},
			removeSelect(st){
				this.$delete(this.selectedStates,st);
			},
			lineData(){

			}
		},
    beforeMount: function () {
    	this.mapinit(this.country);
    },
    watch:{
    	selectedStates:{
    		handler:function(newVal,oldVal){
    			let baseUrl='http://localhost:3030/weatherdata/fullmap/'+this.country+'/';

    			let reqs=[]
    			let promises=[];
    			for(let x in newVal){
    				reqs.push(baseUrl+newVal[x].slice(3,5));

    			}
    			reqs.forEach(e=>{
    				promises.push(axios.get(e));
    			});
    			let stateData=[]
    			Promise.all(promises).then(reps=>{
    							reps.forEach(k=>{
    									stateData.push(getStateDataFromJson(k.data,this.radioGroup))


    								})
    								console.log(JSON.stringify(stateData))
    								this.stateOptions.series=stateData;

    								let chartx=this.$refs.lchart.chart;
    								//console.log(chartx.__proto__.addSeries())

       								chartx.redraw();

}


    							)



    	},deep:true},
    	radioGroup:{
    		handler:function(){
    			this.selectedStates=this.selectedStates.reverse()
    		}
    	}
    }





	}
</script>﻿
﻿
<style scoped>
	.mr{
		margin-bottom: 50px;
    margin-top:100px;
	}
	.controle{
		width:40%;
		margin:auto;
		padding-left:80px;
	}
</style>
