<?php

namespace App\Http\Controllers;

use App\Movie;
use App\Like;
use Illuminate\Support\Facades\Auth;

class MoviesController extends Controller
{
	/**
	 * Page size for the movie table.
	 */
	public $pageSize = 10;

	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Gets the movies.
	 *
	 * @param boolean $getLikes Specifies if return only user's liked movies.
	 * @return \Illuminate\Http\JsonResponse
	 */
    function get($getLikes = false) {
	    $movies = Movie::select("movies.id as id", "title", "likes.id as like_id");
	    $joinSubQuery = function($q) {
		    $q->on("likes.movie_id", "=", "movies.id")
			    ->select("*")
			    ->from("likes")
			    ->where("likes.user_id", "=", Auth::user()->id);
	    };
	    if ($getLikes) {
		    $movies = $movies->join("likes", $joinSubQuery)
			    ->orderBy("likes.created_at", "desc");
	    } else {
		    $movies = $movies->leftJoin("likes", $joinSubQuery)
			    ->orderBy("movies.created_at", "desc");
	    }
	    $movies = $movies->paginate($this->pageSize);
	    return response()->json([
		    "movies" => $movies->items(),
		    "movies_total" => $movies->total(),
	    ]);
    }

	/**
	 * Gets a movie by id.
	 * @param id string|number The movie id.
	 * @return \Illuminate\Http\JsonResponse
	 */
	function getById($id) {
		$movie = Movie::find($id);
		if (!$movie) return response("Not found", 404);
		return response()->json($movie);
	}

	/**
	 * Gets the user's liked movies.
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	function getLikes() {
		return $this->get(true);
	}

	/**
	 * Creates a like for a movie.
	 *
	 * @param $id string|number The movie id.
	 * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
	 */
	function like($id) {
		$like = new Like;
		$like->movie_id = $id;
		$like->user_id = Auth::user()->id;
		$like->save();
		return response($like->id);
	}

	/**
	 * Deletes a like for a movie.
	 *
	 * @param $id string|number The movie id.
	 * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
	 */
	function unlike($id) {
		$record = Like::find($id);
		if (!empty($record)) $record->delete();
	}
}
