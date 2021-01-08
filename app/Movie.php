<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
	const UPDATED_AT = null;
	public $timestamps = [ "created_at" ];

	public function likes()
	{
		return $this->hasMany(Like::class);
	}
}
