window.Vue = require("vue")
const { allLanguages } = require("./languages")

new Vue({
    el: "#app",

    data() {
        return {
            languages: allLanguages.sort(),
            results: [],
            emojis: [],
            page: 1,
            isFilterToggled: false,
            isFetching: false,
            showViewMore: false,

            selectedLanguage: 'any',
            selectedSort: 'newest',
            cursor:null,
        }
    },

    methods: {

        async fetchRepos(){
            const headers = {"Content-Type": "application/json"}
            headers["Authorization"] = `Token ${process.env.MIX_GITHUB_TOKEN}`
                const query = /* GraphQL */ `query {
                search(
                  type: REPOSITORY
                  query: """
                  topic:hacktoberfest
                  created:>=2020-01-01
                  language:${this.selectedLanguage}
                  """
                  first: 30
                  after:${this.cursor?`"${this.cursor}"`:null}
                ) {
                  repos: edges {
                      cursor
                    repo: node {
                      ... on Repository {
                        issues(
                          labels: "hacktoberfest"
                          first: 20
                          filterBy: { assignee: null }
                          states: OPEN
                          orderBy: { field: CREATED_AT, direction: DESC }
                        ) {
                          issuesAll: edges {
                            issue: node {
                              title
                              url
                              createdAt
                              repository{
                                  url
                              }
                              labels(first:2){
                                  edges{
                                      node{
                                          name
                                      }
                                  }
                              }
                              comments {
                                totalCount
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              `

            const result = await fetch('https://api.github.com/graphql',
                {   method:'POST',
                    headers:headers,
                    body:JSON.stringify({query:query})
                }
            )
            const data = await result.json()
            const searchedRepos = data.data.search.repos
            this.cursor = searchedRepos[searchedRepos.length-1].cursor
            const repos = data.data.search.repos.filter( ({repo}) => { 
                return repo.issues.issuesAll.length>0
            })
            return repos
        },
        
        async getIssues(){
            const repos = await this.fetchRepos()
            const issues = repos.flatMap(({repo})=>repo.issues.issuesAll)
            return issues
        },

        getRepoName(repo_url){
            return repo_url.split("/").slice(-2).join("/")
        },

        sortIssues(issues){
            return issues.sort((a, b) => {
                if (this.selectedSort==='noReplies')
                    return a.issue.comments.totalCount > b.issue.comments.totalCount
                else 
                    return Date.parse(b.issue.createdAt) - Date.parse(a.issue.createdAt)
            })
        },

        loadIssues() {
            this.isFetching = true

            fetch("https://api.github.com/emojis")
                .then(response => response.json())
                .then(emojisResponse => (this.emojis = emojisResponse))
                .then(async issuesResponse => {
                    const issues = await this.getIssues()
                    const sortedIssues = this.sortIssues(issues)
                    let newResults = issues.map(
                        ({issue,...rest}) => ({
                            ...rest,
                            html_url:issue.url,
                            title:issue.title,
                            labels: issue.labels.edges.map(({node}) => ({
                                ...node,
                                parsedName: this.insertEmojis(node.name)
                            })),
                            repoTitle: this.getRepoName(issue.repository.url),
                            repository_url: issue.repository.url,
                            comments:issue.comments.totalCount
                            })
                    ) 

                    this.results = [...this.results, ...newResults]

                    this.page = this.page + 1
                    this.showViewMore = true
                    this.isFetching = false

                    if (issues.length === 0) {
                        // case when all the issues are already loaded
                        this.showViewMore = false
                    }
                })
                .catch(error => {
                    this.showViewMore = false
                    this.isFetching = false
                })
        },

        insertEmojis(label) {
            for (let [emoji, url] of Object.entries(this.emojis)) {
                label = label.replace(`:${emoji}:`, `<img src="${url}" class="h-4" />`)
            }

            return label
        },

        applyFilter() {
            this.results = []
            this.showViewMore = false
            this.isFetching = false
            this.page = 1
            this.loadIssues()
        },

        searchLanguages(event) {
            let searched = event.target.value
            if (searched.length !== 0) {
                this.selectedLanguage = this.languages.filter(
                    lang => lang.toLowerCase().indexOf(searched.toLowerCase()) > -1
                )
            }
        },

        closeLanguageSearch(event) {
            this.isFilterToggled = false
        },

        toggleFilter() {
            this.isFilterToggled = !this.isFilterToggled
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" })
        },

        // If not clicking the toggleFilter or the languageFilter
        // within that, then close the filter
        onClickOutside(event) {
            if (
                event.target.id !== "toggleFilter" &&
                event.target.id !== "languageSearch"
            ) {
                this.closeLanguageSearch()
            }
        }
    },

    watch: {
        selectedLanguage() {
            this.applyFilter()
        },
        selectedSort(){
            this.applyFilter()
        }
    },

    mounted() {
        this.loadIssues()
        document.addEventListener("click", this.onClickOutside)
    },

    destroyed() {
        document.removeEventListener("click", this.onClickOutside)
    }
})
