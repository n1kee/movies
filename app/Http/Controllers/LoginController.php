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

    function authenticate() {
	    $credentials = \request()->only('email', 'password');

	    if (Auth::attempt($credentials)) {
		    \request()->session()->regenerate();

		    return redirect()->intended('dashboard');
	    }

	    return back()->withErrors([
		    'email' => 'The provided credentials do not match our records.',
	    ]);
    }
}
