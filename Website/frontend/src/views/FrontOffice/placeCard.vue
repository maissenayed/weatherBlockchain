<template>
    <v-flex xs12 ml-5>
      <v-card>
        <v-card-media :src="url" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{title}}</h3>
            <div>{{addr}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>

<script>
	export default{
		props:['url','title','addr'],

	}
</script>