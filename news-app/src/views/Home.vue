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

      <v-flex v-if="showDate" class="dateContainer" xs8 d-flex>
        <template>
          <v-layout>
            <h4 class="datetitle">search by date</h4>
            <h4 class="textInDateSearch">from:</h4>
            <input type="date" v-model="fromDate" />
            <h4 class="textInDateSearch">to:</h4>
            <input type="date" v-model="toDate" />
            <v-btn @click="checkForDateResults" flat>
              <div>submit</div>
            </v-btn>
          </v-layout>
        </template>
      </v-flex>

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
  props: ['changeCatagory'],
  data: () => ({
    articles: [],
    filterQuery: '',
    contentType: 'top UK headlines',
    showDate: false,
    source: '',
    sources: ['TechCrunch', 'CBS-NEWS', 'BBC-NEWS', 'Business Insider UK']
  }),
  watch: {
    changeCatagory() {
      if (this.sources.includes(this.changeCatagory)) {
        this.showDate = false
        this.loadSourceFilter(this.changeCatagory)
      } else {
        this.showDate = true
        this.loadFilter(this.changeCatagory)
      }
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
        //if there is a catagory and not it is not a source
        if (
          this.changeCatagory &&
          !this.sources.includes(this.changeCatagory)
        ) {
          this.loadArticles(
            'search',
            JSON.stringify({
              from: fromDate,
              to: toDate,
              q: this.changeCatagory
            })
          )
        } else {
          let filter = filterQuery === '' ? 'gb' : filterQuery

          this.loadArticles(
            'search',
            JSON.stringify({ from: fromDate, to: toDate, q: filter })
          )
        }
      }
    },

    loadSourceFilter(source) {
      if (source) {
        let cleanedSource = source.toLowerCase().replace(/\s/g, '-')
        this.loadArticles(
          'headlines',
          JSON.stringify({ sources: cleanedSource })
        )
      }
    },

    loadFilter: debounce(function loadFilter(input) {
      if (input) {
        this.contentType = `${input}`
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
          this.toDate = null
          this.fromDate = null
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
.datetitle,
.textInDateSearch {
  padding: 5px;
  width: 20vw;
}
.dateContainter {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  background-color: #cfcfcf;
  border: 2px solid #2a2b2d44;
  padding: 5px;
  width: 20vw;
}
</style>
