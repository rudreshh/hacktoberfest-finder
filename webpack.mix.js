let mix = require('laravel-mix');
let tailwindcss = require('tailwindcss');
let postCSSNested = require('postcss-nested');

require('laravel-mix-purgecss')
require('laravel-mix-postcss-config')


mix.js('assets/js/app.js', 'build')
    .postCss('assets/css/app.css', 'build')
	.options({
	    processCssUrls: false,

	    postCss: [
	    	tailwindcss
	    ],
	})
	.postCssConfig({
		plugins: [
			postCSSNested()
		]
	});

if (mix.inProduction())	{
	mix.purgeCss({
	    enabled: true,
	    extensions: ['html'],
	    folders: ['.']
	});
}