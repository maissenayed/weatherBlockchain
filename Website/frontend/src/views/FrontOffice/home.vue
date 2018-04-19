<template>
	<div id="home">
    <v-app light>
		<app-header></app-header>
 <v-content>
      <section>
        <v-parallax src="../../../src/assets/hero.jpeg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../../assets/vuetify.png" alt="Vuetify.js" style="transform:rotate(180deg);" height="200">
            <h1 class="white--text mb-2 display-1 text-xs-center">Nammumu</h1>
            <div class="subheading mb-3 text-xs-center">Realtime weather data for analytics</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              to= "/session/sign-up"

            >
              Sign Up
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">Our Services for realtime weather data</h2>
              <span class="subheading">
                POWERD BY ethereum blockchain
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">&#xE430;</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Real time</div>
                    </v-card-title>
                    <v-card-text>
						You can get realtime informations about the weather anywhere you want we have stations located in more then 4500
						places arround the world offering valuable data for everyone.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">&#xE3E7;</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">User friendly</div>
                    </v-card-title>
                    <v-card-text>
						Our app displays organized data for all users combined with charts and a world map accessible through your token balance,
                      it also enables you to manage your users , transactions and all the details concerning your weather stations.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">&#xE91C;</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Secure</div>
                    </v-card-title>
                    <v-card-text>
      					Powered by blockchain, Nammumu weather real time data app enables users to profit from the full potential offered by the
                      blockchain technology combined with all the features in ethereum network through the metamask browser extension.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="../../../src/assets/section.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Have a good day we hope you're fine !</div>
          </v-layout>
        </v-parallax>
      </section>






      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
					A new startup specialized in web development enabling users to access <b>realtime weather data</b>
					within a ÐApp integrated with the ethereum blockchain technology with love from 270bytes team at ESPRIT.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                 You can contact us through multiple channels
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>55-123-458</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Esprit, TN</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>contact@270bytes.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <v-footer class="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              Made with
              <v-icon class="red--text">favorite</v-icon>
              by <a class="white--text">270 bytes</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
    </v-app>
	</div>
</template>

<script>



import Card from './card';
import Header from './header';

	export default{
		components:{
			'app-header':Header,

			'app-card':Card

		}
	}
</script>
