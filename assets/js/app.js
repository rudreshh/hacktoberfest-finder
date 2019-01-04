window.Vue = require('vue');

const app = new Vue({

    el: '#app',

    data() {
      return {
        results: [],
        page: 1,
        languages: [
            'JavaScript', 
            'Python', 
            'Java',
            'PHP',
            'Go',
            'HTML',
            'C++',
            'Ruby',
            'TypeScript',
            'C#'
        ],
        selectedLanguage: '',
        showViewMore: false,
        isFetching: false,
        filtersToggled: false
      }
    },

    methods: {

        loadIssues() {
            this.isFetching = true;
            fetch(`https://api.github.com/search/issues?page=${this.page}&q=language:${this.filterLanguage}+label:hacktoberfest+type:issue+state:open`)
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

        chooseLanguage(language) {
            this.results = [];
            this.selectedLanguage = language;
            this.filtersToggled = !this.filtersToggled
            this.showViewMore = false;
            this.isFetching = false;
            this.page = 1;
            this.loadIssues();
        },

        toggleFilter() {
            this.filtersToggled = !this.filtersToggled
        }
    },

    computed: {
        filterLanguage() {
            return this.selectedLanguage.split('+').join('%2B').split('#').join('%23').toLowerCase();
        }
    },

    mounted() {
        this.loadIssues()
    }

});