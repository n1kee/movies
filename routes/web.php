<?php

use Illuminate\Support\Facades\Route;
use \Illuminate\Support\Facades\Auth;

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

	Route::post('/login', "LoginController@login")->name("login");

	Route::post('/logout', "LoginController@logout")->name("logout");

	Route::get('/movies', "MoviesController@get");

	Route::get('/movies/{id}', "MoviesController@getById")
		->where('id', '[0-9]+');

	Route::get('/movies/likes', "MoviesController@getLikes");

	Route::post('/movies/{id}/like', "MoviesController@like")
		->where('id', '[0-9]+')
		->where('userId', '[0-9]+');

	Route::post('/movies/unlike/{likeId}', "MoviesController@unlike")
		->where('likeId', '[0-9]+');
});

Route::get('/{any}',  function () {
	return view('welcome', [
		"userName" => Auth::user() ? Auth::user()->name : "",
	]);
})->where('any', '^(?!api).*$');
