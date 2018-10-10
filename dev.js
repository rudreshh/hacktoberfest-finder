import axios from 'axios';

window.Vue = require('vue');
window.axios = axios;

const app = new Vue({

    el: '#app',

    data() {

      return {

        results: [],
        page: 1,
        showViewMore: false,
        isFetching: false,
      }

    },

    methods: {

        loadIssues: function() {
            this.isFetching = true;
            axios({
                method: "get",
                url: `https://api.github.com/search/issues?page=${this.page}&q=label:hacktoberfest+type:issue+state:open`
            }).then(response => {
                this.results = [
                    ...this.results,
                    ...response.data.items
                ];
                this.results.forEach(element => {
                    element.repoTitle = element.repository_url.split('/').slice(-1).join();
                });
                this.page = this.page + 1;
                this.showViewMore = true;
                this.isFetching = false;
            }).catch(error => {
                this.showViewMore = false;
                this.isFetching = false;
            });

        }

    },

    mounted() {

        this.loadIssues()

    }

});
