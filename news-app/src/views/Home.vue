<template>
  <v-container grid-list-md fluid>
    <v-layout wrap>
      <div id="homeTitle" class="display-1">
        Showing you the {{ contentType }}
      </div>

      <v-flex md12 id="searchBar">
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="search"
          label="Filter news by keyword. Advanced: use quotes ('') for exact matches, and the + / - symbols for needed / excluded words."
          class="hidden-sm-and-down"
          v-model="filterQuery"
          @input="loadFilter"
        ></v-text-field>
      </v-flex>

      <div class="dateContainter">
        <h3>Search by Date</h3>
        <div>
          <h4 class="textInDateSearch">From:</h4>
          <input type="date" v-model="fromDate" />
          <h4 class="textInDateSearch">To:</h4>
          <input type="date" v-model="toDate" />
        </div>
        <div>
          <input type="submit" v-on:click="filterByDate" />
        </div>
      </div>

      <v-flex
        xs12
        sm12
        md12
        v-for="article in articles"
        :key="article.publishedAt"
      >
        <Article :article="article" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import debounce from 'lodash/debounce'
import axios from 'axios'
import Article from '../components/Article'

const stage = 'dev'
axios.defaults.baseURL = `${process.env.VUE_APP_SERVICE_URL}${stage}`
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'

export default {
  components: {
    Article
  },
  props: {
    title: String
  },
  data: () => ({
    articles: [],
    filterQuery: '',
    contentType: 'top UK headlines',
    fromDate: null,
    toDate: null
  }),
  created() {
    this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
  },

  methods: {
    filterByDate() {
      const { fromDate, toDate, filterQuery } = this

      filterQuery === '' ? 'gb' : filterQuery
      if (fromDate && toDate) {
        this.loadArticles(
          'search',
          JSON.stringify({ from: fromDate, to: toDate, q: filterQuery })
        )
      }
    },
    filterByCatagory() {
      const { fromDate, toDate, filterQuery } = this

      if (fromDate && toDate) {
        this.contentType = `search results for: ${filterQuery}, from: ${fromDate} to: ${toDate}`
        this.loadArticles(
          'search',
          JSON.stringify({ from: fromDate, to: toDate, q: filterQuery })
        )
      }
    },

    loadFilter: debounce(function loadFilter(input) {
      if (input) {
        this.contentType = `search results for: ${input}`
        this.loadArticles('search', JSON.stringify({ q: input }))
      } else {
        this.contentType = 'top UK headlines'
        this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
      }
    }, 500),
    loadArticles(type, params) {
      axios
        .post(`/articles?type=${type}`, params)
        .then(response => {
          this.articles = response.data.articles
        })
        .catch(error => console.log({ error }))
    }
  }
}
</script>

<style scoped>
#homeTitle {
  margin: auto;
  margin-bottom: 2.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.searchBar {
  width: 50vw;
}
.dateContainter {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #cfcfcf;
  border: 2px solid #2a2b2d44;
  padding: 5px;
  width: 20vw;
}
</style>
