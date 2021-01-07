<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    public $timestamps = false;

	public function likes()
	{
		return $this->hasMany(Like::class);
	}
}
