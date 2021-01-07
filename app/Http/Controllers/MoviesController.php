<?php

namespace App\Http\Controllers;

use App\Movie;
use App\Like;
use Illuminate\Support\Facades\Auth;

class MoviesController extends Controller
{
	public $pageSize = 10;

	public function __construct()
	{
		$this->middleware('auth');
	}

    function get() {
	    $movies = Movie::select("movies.id as id", "title", "likes.id as is_liked")
		    ->leftJoin("likes", function($q) {
			    $q->select("*")
				    ->from("likes")
				    ->where("likes.user_id", "=", Auth::user()->id);
		    })
	        ->paginate($this->pageSize);
	    return response()->json([
		    "movies" => $movies->items(),
		    "movies_total" => $movies->total(),
	    ]);
    }

	function getById($id) {
		$movie = Movie::find($id);
		if (!$movie) return response("Not found", 404);
		return response()->json($movie);
	}


	function like($id, $userId) {
		$record = new Like;
		$record->movie_id = $id;
		$record->user_id = $userId;
		$record->save();
	}

	function unlike($id) {
		$record = Like::find($id);
		if (!empty($record)) $record->delete();
	}
}
