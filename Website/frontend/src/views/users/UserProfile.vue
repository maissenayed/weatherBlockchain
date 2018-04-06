<template>
  <v-container fluid grid-list-xl py-0>
    <div class="profile-head app-card">
      <div class="profile-top">
        <img src="/static/img/profile-banner.jpg" alt="profile banner" width="1920" height="165" />
      </div>
      <div class="profile-bottom border-bottom-light-1">
        <div class="user-image text-xs-center mb-3">
          <img src="/static/img/user-7.jpg" class="img-responsive rounded-circle" alt="user images" />
        </div>
        <div class="user-list-content">
          <div class="text-xs-center">
            <h3 class="fw-bold">Gregory A.</h3>
            <p>Web Designer & Developer</p>
            <div class="social-list clearfix mb-4">
              <ul class="list-inline d-inline-block">
                <li><a href="javascript:void(0);" class="text-pink"><i class="ti-facebook"></i></a></li>
                <li><a href="javascript:void(0);" class="text-pink"><i class="ti-twitter-alt"></i></a></li>
                <li><a href="javascript:void(0);" class="text-pink"><i class="ti-google"></i></a></li>
                <li><a href="javascript:void(0);" class="text-pink"><i class="ti-linkedin"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="user-activity text-xs-center">
        <ul class="list-inline d-inline-block">
          <li>
            <span class="fw-bold">588</span>
            <span>Articles</span>
          </li>
          <li>
            <span class="fw-bold">2400</span>
            <span>Followers</span>
          </li>
          <li>
            <span class="fw-bold">1200</span>
            <span>Following</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="profile-body">
      <v-layout row wrap>
        <v-flex xs12 md5 lg4>
          <div class="app-card">
            <div class="app-card-content">
              <div class="media pos-relative">
                <img src="/static/img/user-11.jpg" class="img-responsive rounded-circle mr-4" alt="user profile" width="95" height="95" />
                <div class="media-body">
                  <span class="text-pink">Request</span>
                  <h2>Andre Hicks</h2>
                  <span>Sr. Develoepr @Oracle</span>
                  <div class="btn-wrapper">
                    <v-btn class="btn-gradient-success">Accept</v-btn>
                    <v-btn class="btn-gradient-pink">Reject</v-btn>
                  </div>
                </div>
                <v-avatar class="gradient-warning overlap">
                  <v-icon dark>ti-id-badge</v-icon>
                </v-avatar>
              </div>
            </div>
          </div>
          <div class="app-card">
            <div class="app-card-title">
              <h3>Education</h3>
            </div>
            <div class="app-card-content">
              <v-list class="card-list">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>
                      <h5 class="fw-bold text-gray">Product Designer</h5>
                      <span>AirHelper - London, United Kingdom</span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <span class="small">2016 - 2017</span>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>
                      <h5 class="fw-bold text-gray">App Designer</h5>
                      <span>AirHelper - London, United Kingdom</span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <span class="small">2017 - 2018</span>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>
                      <h5 class="fw-bold text-gray">Service Designer</h5>
                      <span>AirHelper - London, United Kingdom</span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <span class="small">2015 - 2016</span>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
          </div>
          <div class="gradient-warning app-card">
            <v-card-title>
              <h3>Skills</h3>
            </v-card-title>
            <v-card-text>
              <ul class="list-unstyled card-list">
                <li>
                  <p class="fw-bold">HTML</p>
                  <v-progress-linear value="20" height="5" color="white"></v-progress-linear>
                </li>
                <li>
                  <p class="fw-bold">Css3</p>
                  <v-progress-linear value="90" height="5" color="white"></v-progress-linear>
                </li>
                <li>
                  <p class="fw-bold">Photoshop</p>
                  <v-progress-linear value="30" height="5" color="white"></v-progress-linear>
                </li>
                <li>
                  <p class="fw-bold">Javascript</p>
                  <v-progress-linear value="75" height="5" color="white"></v-progress-linear>
                </li>
              </ul>
            </v-card-text>
          </div>
        </v-flex>
        <v-flex xs12 md7 lg8>
          <div class="app-card">
            <div class="app-card-title border-bottom-light-1">
              <h3>Activity</h3>
            </div>
            <div clas="app-card-content">
              <div class="pa-3">
                <p class="mb-0">Today</p>
              </div>
              <div class="media-listing">
                <ul class="list-unstyled">
                  <li class="media border-bottom-light-1">
                    <img src="/static/img/user-7.jpg" class="rounded-circle mr-4 img-responsive" alt="user profile" width="60" height="60" />
                    <div class="media-body">
                      <span class="fw-bold">Louise Kate <span class="small">@louisekate</span></span>
                      <p class="mb-0">The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental.</p>
                    </div>
                  </li>
                  <li class="media border-bottom-light-1">
                    <img src="/static/img/user-8.jpg" class="rounded-circle mr-4 img-responsive" alt="user profile" width="60" height="60" />
                    <div class="media-body">
                      <span class="fw-bold">Annie Lee <span class="small">@Annielee</span></span>
                      <p class="mb-0">Posted new photo</p>
                      <div class="img-post">
                        <img src="/static/img/profile-post.jpg" class="img-responsive"/>
                      </div>
                    </div>
                  </li>
                  <li class="media border-bottom-light-1">
                    <img src="/static/img/user-9.jpg" class="rounded-circle mr-4 img-responsive" alt="user profile" width="60" height="60" />
                    <div class="media-body">
                      <span class="fw-bold mb-3 d-block">Mark Anthony <span class="small">@louisekate</span></span>
                      <div class="card pa-3 gradient-purple">
                        <h3 class="mb-0">The new common language will be more simple and regular than the existing European languages.</h3>
                      </div>
                    </div>
                  </li>
                  <li class="media border-bottom-light-1">
                    <img src="/static/img/user-10.jpg" class="rounded-circle mr-4 img-responsive" alt="user profile" width="60" height="60" />
                    <div class="media-body">
                      <span class="fw-bold">Annie Lee <span class="small">@louisekate</span></span>
                      <p>Posted 4 photos</p>
                      <ul class="list-inline row layout wrap">
                        <li class="flex xs6 sm3 md3 lg3">
                          <img src="/static/img/gallery1.jpg" class="img-responsive" width="200" height="200" alt="image post" />
                        </li>
                        <li class="flex xs6 sm3 md3 lg3">
                          <img src="/static/img/gallery2.jpg" class="img-responsive" width="200" height="200" alt="image post" />
                        </li>
                        <li class="flex xs6 sm3 md3 lg3">
                          <img src="/static/img/gallery3.jpg" class="img-responsive" width="200" height="200" alt="image post" />
                        </li>
                        <li class="flex xs6 sm3 md3 lg3">
                          <img src="/static/img/gallery4.jpg" class="img-responsive" width="200" height="200" alt="image post" />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="media border-bottom-light-1">
                    <img src="/static/img/user-10.jpg" class="rounded-circle mr-4 img-responsive" alt="user profile" width="60" height="60" />
                    <div class="media-body">
                      <span class="fw-bold">Mark Anthony <span class="small">@louisekate</span></span>
                      <p>Postd a new blog in website</p>
                      <div class="media media-full">
                        <img src="/static/img/post-2.png" class="img-responsive mr-4" alt="post image" width="300" height="180" />
                        <div class="media-body">
                          <h5 class="fw-bold">How to setup your estore in 10 min.</h5>
                          <p>Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
