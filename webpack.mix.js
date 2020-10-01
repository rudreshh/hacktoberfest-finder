let mix = require('laravel-mix')
let tailwindcss = require('tailwindcss')

require('laravel-mix-purgecss')
require('laravel-mix-postcss-config')


mix.js('src/js/app.js', 'js')
    .postCss('src/css/app.css', 'css')
	.options({
	    processCssUrls: false,

	    postCss: [
	    	tailwindcss
	    ],
	})
