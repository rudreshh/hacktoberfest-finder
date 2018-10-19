window.Vue = require('vue');

const app = new Vue({

    el: '#app',

    data() {

      return {

        results: [],
        page: 1,
        languages: ['JavaScript','Python','Java','PHP','Go','HTML','C++','Ruby','TypeScript','C#'],
        language: '',
        showViewMore: false,
        isFetching: false,
      }

    },

    methods: {

        loadIssues: function() {
            this.isFetching = true;
            fetch(`https://api.github.com/search/issues?page=${this.page}&q=language:${this.language}+label:hacktoberfest+type:issue+state:open`)
            .then(response => response.json())
            .then(response => {
                this.results = [
                    ...this.results,
                    ...response.items
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

        },

        // handling the language option
        chooseLanguage: function(language){
            this.results = [];
            this.language = language.split('+').join('%2B').split('#').join('%23').toLowerCase();
            this.showViewMore = false;
            this.isFetching = false;
            this.page = 1;
            this.loadIssues();
        }
    },

    mounted() {

        this.loadIssues()
    
    }

});