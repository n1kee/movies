<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('api')->group(function () {
	Route::get('/movies', "MoviesController@get");

	Route::get('/movies/{id}', "MoviesController@getById")
		->where('id', '[0-9]+');
});

Route::get('/{any}',  function () {
	return view('welcome');
})->where('any', '^(?!api).*$');
