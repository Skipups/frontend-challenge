<template>
  <v-container grid-list-md fluid>
    <v-layout wrap>
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
      <div :key="componentKey">
        <v-flex v-if="isSource" class="dateContainer" xs8 align-end d-flex>
          <span>search by date</span>
          <h4 class="textInDateSearch">From:</h4>
          <input type="date" v-model="fromDate" />
          <h4 class="textInDateSearch">To:</h4>
          <input type="date" v-model="toDate" />
          <v-btn @click="checkForDateResults" flat>
            <div>submit</div>
          </v-btn>
        </v-flex>
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
  props: ['changeCatagory', 'changeSource'],
  data: () => ({
    articles: [],
    filterQuery: '',
    contentType: 'top UK headlines',
    fromDate: null,
    toDate: null,
    source: ''
  }),
  watch: {
    changeCatagory() {
      this.loadFilter(this.changeCatagory)
    },
    changeSource() {
      this.source = this.changeSource

      this.loadSourceFilter(this.changeSource)
      this.source = null
    }
  },
  created() {
    this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
  },
  methods: {
    //if dates produce results
    checkForDateResults() {
      const { fromDate, toDate, filterQuery } = this
      //if there is a to and from date
      if (this.fromDate && this.toDate) {
        //if there is a catagory
        if (this.changedCatagory) {
          this.loadArticles(
            'search',
            JSON.stringify({
              from: fromDate,
              to: toDate,
              q: this.changedCatagory
            })
          )
        } else {
          let filter = filterQuery === '' ? 'gb' : filterQuery

          this.loadArticles(
            'search',
            JSON.stringify({ from: fromDate, to: toDate, q: filter })
          )
        }
      } else {
        this.loadFilter(this.filter)
      }
      ;(this.toDate = null),
        (this.fromDate = null)((this.filterQuery = null)),
        (this.contentType = null),
        (this.source = null),
        (this.changeCatagory = null),
        (this.changeSource = null)
    },

    loadSourceFilter(source) {
      if (source) {
        let cleanedSource = source.toLowerCase().replace(/\s/g, '-')
        this.loadArticles(
          'headlines',
          JSON.stringify({ sources: cleanedSource })
        )
      }

      // ;(this.filterQuery = null),
      //   (this.contentType = null),
      //   (this.source = null),
      //   (this.changeCatagory = null),
      //   (this.changeSource = null)
    },

    loadFilter: debounce(function loadFilter(input) {
      if (input) {
        this.contentType = `${input}`
        this.loadArticles('search', JSON.stringify({ q: input }))
      } else {
        this.contentType = 'top UK headlines'
        this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
      }
      // ;(this.filterQuery = null),
      //   (this.contentType = null),
      //   (this.source = null),
      //   (this.changeCatagory = null),
      //   (this.changeSource = null)
    }, 500),
    loadArticles(type, params) {
      console.log('loadArticles ran')
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
