<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLikesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('likes', function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table->unsignedBigInteger("user_id");
			$table->unsignedBigInteger("movie_id");
			$table->index('user_id');
			$table->index('movie_id');
			$table->foreign('user_id')->references('id')->on('users');
			$table->foreign('movie_id')->references('id')->on('movies');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('user_movie');
	}
}
