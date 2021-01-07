<?php

namespace App\Http\Controllers;

use App\Movie;

class MoviesController extends Controller
{
	public $pageSize = 10;

	public function __construct()
	{
		$this->middleware('auth');
	}

    function get() {
	    $movies = Movie::select("id", "title")
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
}
