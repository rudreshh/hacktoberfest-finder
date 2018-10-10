window.Vue = require('vue');

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

            fetch(`https://api.github.com/search/issues?page=${this.page}&q=label:hacktoberfest+type:issue+state:open`)
            .then(response => response.json())
            .then(response => {
                this.results = [
                    ...this.results,
                    ...response.data.items
                ];
                this.results.forEach(element => {
                    element.repoTitle = element.repository_url.split('/').slice(-1).join();
                });
                this.page = this.page + 1;
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
