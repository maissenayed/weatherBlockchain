<template>
	<div>



<v-container grid-list-md text-xs-center>
	<app-page :lst="listMonuments[page]"></app-page>
    <v-layout row wrap>

      <v-flex xs6>
			<v-btn v-if="page !== 0" left color="info" @click="previousBtn">previous</v-btn>
      </v-flex>

      <v-flex xs6>
			<v-btn  v-if="page < listMonuments.length -1" right color="info" @click="nextBtn">next</v-btn>
      </v-flex>
    </v-layout>
  </v-container>

	</div>

</template>

<script>

//import VueJsonp from 'vue-jsonp'



import placesPage from './placesPage'
	export default{
		components:{
			'app-page':placesPage
		},
		props:['country'],
		data(){
			return{
				listMonuments:[],
				page:0
			}
		},
		beforeMount:function(){


		},
		methods:{
			initInterest(country){
			let setter=(m)=>{this.listMonuments=m}
			let callback=function(res,status){
          console.log(res);
				 	let tmparr=res.map(e=>{
				 		return{
								title:e.name,
								addr:e['formatted_address'],
								url:e.photos[0].getUrl({'maxWidth': 600, 'maxHeight': 600})
				 		}
				 	})

				 	let parr=[];

				 	while(tmparr.length) {parr.push(tmparr.splice(0,9));}
					setter(parr)
			}
			let service = new google.maps.places.PlacesService(document.createElement('div'));
			service.textSearch({
				query:'places of interest in '+this.country
			}, callback);




			},

			nextBtn(){
				this.page++;
			},
			previousBtn(){
				this.page--;
			}
		},
    watch:{
      country:{
        handler:function(){
          console.log('hey');
          this.initInterest(this.country)
        }
      }
    }






	}
</script>

<style scoped>

</style>
