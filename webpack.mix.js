
const mix = require("laravel-mix");
const path = require('path');

mix.setPublicPath('./');

// Алиасы до папок
mix.webpackConfig({
    resolve: {
        alias: {
            // Модули NPM
            npm: path.resolve(__dirname, "node_modules"),
            // Модуль NPM Bootstrap 4
            // npmBootstrap4: path.resolve(__dirname, "node_modules/bootstrap/scss"),
        }
    },

});

mix.js('resources/app.js', 'public/js').react();
mix.sass('resources/app.scss', 'public/css');
