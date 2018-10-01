let mix = require('laravel-mix');
var tailwindcss = require('tailwindcss');

mix.js('dev.js', 'app.js')
    .sass('app.scss', 'app.css')
    .options({
      processCssUrls: false,
      postCss: [ tailwindcss('./tailwind.js') ],
    });