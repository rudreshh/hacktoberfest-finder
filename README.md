# Hacktoberfest Finder

[Hacktoberfest Finder](https://hacktoberfest-finder.netlify.app) is a project to help developers find projects to contribute to during Hacktoberfest. 

This project is **unofficial and isn't affiliated with DigitalOcean (or any of its partners).** It's maintained by [Duncan McClean](https://github.com/duncanmcclean), with lots of help from [contributors](./CONTRIBUTORS.md) over the years. 

## Setting up

To get up and running locally, follow these steps:

1. Fork this repository
2. Clone your fork to your computer.

```
git clone git@github.com:YOUR-GITHUB-USERNAME/hacktoberfest-finder.git
```

3. Run `npm install` in the cloned directory.
4. Copy the `.env.example` file to `.env`
5. Create a Github Personal Access Token [(read more)](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) and put it in your `.env` file. You don't need to select any scopes.
6. Then compile assets with `npm run dev` or watch for asset changes with `npm run watch`.

> If you're having trouble, open an issue & someone will (hopefully) be able to help!

## Contributing

Before contributing any pull requests to this pull request, please read the [`CONTRIBUTING.md`](./CONTRIBUTING.md) document. It details the project's code of conduct and the process of submitting pull requests.

Please don't try and submit pull requests for every open issue - leave some for others!

If you are a first time contributor, please add your name to the running list in [`CONTRIBUTORS.md`](./CONTRIBUTORS.md).
