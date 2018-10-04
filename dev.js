import axios from 'axios';

window.Vue = require('vue');
window.axios = axios;

const app = new Vue({

    el: '#app',

    data() {

      return {

        results: [],
        page: 1,
        showViewMore: false
      }

    },

    methods: {

        loadIssues: function() {

            axios({
                method: "get",
                url: "https://api.github.com/search/issues?q=label:hacktoberfest+type:issue+state:open"
            }).then(response => {
                this.results = [
                    ...this.results,
                    ...response.data.items
                ];
                this.results.forEach(element => {
                    element.repoTitle = element.repository_url.split('/').slice(-1).join();
                });
                this.showViewMore = true;
            }).catch(error => {
                this.showViewMore = false;
            });

        }

    },

    mounted() {

        this.loadIssues()

    }

});