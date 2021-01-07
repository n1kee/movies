<?php

use Illuminate\Database\Seeder;

class MoviesSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$url = "https://api.themoviedb.org/3/movie/now_playing";
		$response = Http::get($url, [
			"api_key" => env("THEMOVIEDB_API_KEY"),
		]);
		foreach ($response['results'] as $movie) {
			preg_match('/[^\/]+/', $movie["poster_path"], $imgMatches);
			DB::table('movies')->insert([
				'title' => $movie["original_title"],
				'img' => $imgMatches[0],
				'description' => $movie["overview"],
				'year' => (int) $movie["release_date"],
				'rating' => (float) $movie["vote_average"],
			]);
		}
	}
}
