<template>
  <v-app id="container">
    <v-toolbar class="nav_container" app>
      <v-btn class="nav_buttons" to="/" @click="changeCatagory = 'HOME'" flat>
        <span>HOME</span>
      </v-btn>

      <v-btn class="nav_buttons" @click="changeCatagory = 'SPORTS'" flat>
        <span>SPORTS</span>
      </v-btn>

      <v-btn class="nav_buttons" @click="changeCatagory = 'BUSINESS'" flat>
        <span>BUSINESS</span>
      </v-btn>
      <v-btn class="nav_buttons" @click="changeCatagory = 'HEALTH'" flat>
        <span>HEALTH</span>
      </v-btn>

      <v-btn class="nav_buttons" @click="changeCatagory = 'BBC-NEWS'" flat>
        <span>BBC-NEWS</span>
      </v-btn>
      <v-btn class="nav_buttons" @click="changeCatagory = 'CBS-NEWS'" flat>
        <span>CBS-NEWS</span>
      </v-btn>
      <v-btn class="nav_buttons" @click="changeCatagory = 'TechCrunch'" flat>
        <span>TechCrunch</span>
      </v-btn>
      <v-btn
        class="nav_buttons"
        @click="changeCatagory = 'Business Insider UK'"
        flat
      >
        <span>Business Insider UK</span>
      </v-btn>
      <v-btn class="top" href="#" flat
        ><span>
          🔝
        </span></v-btn
      >
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view :changeCatagory="changeCatagory"></router-view>
      </v-container>
    </v-content>
    <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by
            <a
              class="white--text"
              href="https://github.com/Skipups"
              target="_blank"
              >Svetlana</a
            >
            for
            <a class="white--text" target="_blank">SuveraHealth</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      changeCatagory: 'HOME'
    }
  }
}
</script>

<style>
.nav_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: red;
}
.v-toolbar__content {
  justify-content: space-between;
  padding: 12px 5px;
  overflow: scroll;
  background-color: #f1f1f1;
  padding: 40px 10px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
}
.top {
  color: #0d2633;

  text-decoration: none;
}

.nav_buttons {
  padding: 0.8rem 1rem 0.7rem;

  cursor: pointer;
  text-transform: capitalize;
}
.nav_buttons:hover {
  background-color: #ddd;
  color: black;
}

@media screen and (min-width: 550px) {
  .application {
    padding: 20px 10px !important;
  }
}
.application > * {
  max-width: 1300rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
