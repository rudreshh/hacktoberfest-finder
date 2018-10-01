import axios from 'axios';

window.Vue = require('vue');
window.axios = axios;

const app = new Vue({

    el: '#app',

    data() {

      return {

        results: ''

      }

    },

    methods: {

        loadIssues: function() {

            axios({
                method: "get",
                url: "https://api.github.com/search/issues?q=label:hacktoberfest+type:issue+state:open"
            }).then(response => (this.results = response.data.items));

        }

    },

    mounted() {

        this.loadIssues()

    }

});