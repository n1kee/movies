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
		$imgHost = "https://image.tmdb.org/t/p/w400/";
		$response = Http::get($url, [
			"api_key" => env("THEMOVIEDB_API_KEY"),
		]);
		foreach ($response['results'] as $movie) {
			preg_match('/^(\d+)/', $movie["release_date"], $yearMatches);
			DB::table('movies')->insert([
				'title' => $movie["original_title"],
				'img' => $imgHost . $movie["poster_path"],
				'description' => $movie["overview"],
				'year' => (int) $movie["release_date"],
				'rating' => (float) $movie["vote_average"],
			]);
		}
	}
}
