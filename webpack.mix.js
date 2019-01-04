let mix = require('laravel-mix');
var tailwindcss = require('tailwindcss');
require('laravel-mix-purgecss');

mix.js('assets/js/app.js', 'build')
    .sass('assets/sass/app.scss', 'build')
	    .options({
	      processCssUrls: false,
	      postCss: [ tailwindcss('./tailwind.js') ],
	    })
	    .purgeCss({
	        enabled: true,
	        extensions: ['html'],
	        folders: ['./'],
	    });