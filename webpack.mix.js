let mix = require('laravel-mix');
var tailwindcss = require('tailwindcss');
require('laravel-mix-purgecss');
require('laravel-mix-postcss-config')
const postCSSNested = require('postcss-nested')


mix.js('assets/js/app.js', 'build')
    .postCss('assets/css/app.css', 'build')
	    .options({
	      processCssUrls: false,
	      postCss: [ tailwindcss('./tailwind.js') ],
			})
			.postCssConfig({
				plugins: [ postCSSNested() ]
			})
	    .purgeCss({
	        enabled: true,
	        extensions: ['html'],
	        folders: ['./'],
	    });