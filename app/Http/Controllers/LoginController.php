<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
	public function logout()
	{
		Auth::logout();

		request()->session()->invalidate();

		request()->session()->regenerateToken();

		return redirect('/');
	}

    function login() {
	    $credentials = \request()->only('email', 'password');

	    if (Auth::attempt($credentials)) {
		    \request()->session()->regenerate();

		    return redirect(
            "/login-success/". Auth::user()->name . "/" . csrf_token()
		    );
	    }

	    return back()->withErrors([
		    'email' => 'The provided credentials do not match our records.',
	    ]);
    }
}
