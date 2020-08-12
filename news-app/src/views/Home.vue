<template>
  <v-container grid-list-md fluid>
    <v-layout wrap>
      <div id="homeTitle" class="display-1">
        Showing you the {{ contentType }}
      </div>
      <v-flex xs12 sm6 offset-sm3>
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
      <div>
        <input
          type="submit"
          value="Sports"
          v-model="sports"
          @click="filterByCatagory"
        />
      </div>
      <div>
        <h3>Search by Date</h3>
        <div>
          <h4 class="textInDateSearch">From:</h4>
          <input type="date" v-model="fromDate" />
          <input type="date" v-model="toDate" />
        </div>
        <div>
          <input type="submit" v-on:click="filterByDate" />
        </div>
      </div>
      <div><input type="checkbox" v-model="bbcOnly" /></div>
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
  data: () => ({
    articles: [],
    filterQuery: '',
    contentType: 'top UK headlines',
    fromDate: null,
    toDate: null,
    sports: ''
  }),
  created() {
    this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
  },

  methods: {
    filterByDate() {
      const { fromDate, toDate, filterQuery } = this
      console.log('filtering by data', fromDate, toDate, filterQuery)
      filterQuery === '' ? 'gb' : filterQuery
      if (fromDate && toDate) {
        this.contentType = `search results for: ${filterQuery}, from: ${fromDate} to: ${toDate}`
        this.loadArticles(
          'search',
          JSON.stringify({ from: fromDate, to: toDate, q: filterQuery })
        )
      }
    },
    filterByCatagory() {
      const { sports } = this
      console.log('filtering by sports', sports)

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
        console.log('filterQuery', this.filterQuery)
        this.contentType = `search results for: ${input}`
        this.loadArticles('search', JSON.stringify({ q: input }))
      } else {
        this.contentType = 'top UK headlines'
        this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
      }
    }, 500),
    loadArticles(type, params) {
      console.log('type', type, 'params', params)
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
}
</style>
