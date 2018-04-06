<template>
    <v-layout row wrap>
      <v-flex xs4 v-for="(n,i) in lst" :key="i">
      	<app-card :url="n.url" :title="n.title" :addr="n.addr"></app-card>
      </v-flex>

    </v-layout>
</template>

<script>
import placeCard from './placeCard'
	export default{
		components:{
			'app-card': placeCard
		},
		props:['lst']
	}
</script>
