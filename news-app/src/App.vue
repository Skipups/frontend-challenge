<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn to="/" @click="changeCatagory = 'HOME'" flat>
          <span>HOME</span>
        </v-btn>

        <v-btn @click="changeCatagory = 'SPORTS'" flat>
          <span>SPORTS</span>
        </v-btn>

        <v-btn @click="changeCatagory = 'BUSINESS'" flat>
          <span>BUSINESS</span>
        </v-btn>
        <v-btn @click="changeCatagory = 'HEALTH'" flat>
          <span>HEALTH</span>
        </v-btn>
        <v-title
          ><span>
            {{
              changeCatagory === 'HOME' ? 'top UK Headlines' : changeCatagory
            }}
            from
            {{ !changeSource ? 'all sources' : changeSource }}</span
          ></v-title
        >
        <v-btn @click="changeSource = 'bbc-news'" flat>
          <span>BBC-NEWS</span>
        </v-btn>
        <v-btn @click="changeSource = 'cbs-news'" flat>
          <span>CBS-NEWS</span>
        </v-btn>
        <v-btn @click="changeSource = 'techcrunch'" flat>
          <span>techCrunch</span>
        </v-btn>
      </v-toolbar-title>

      <v-btn to="/about" flat>About</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view
          :changeCatagory="changeCatagory"
          :changeSource="changeSource"
        ></router-view>
      </v-container>
    </v-content>
    <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by
            <a class="white--text" href="https://vuetifyjs.com" target="_blank"
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
      changeCatagory: 'HOME',
      changeSource: ''
    }
  }
}
</script>
