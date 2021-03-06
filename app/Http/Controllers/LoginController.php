<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
	/**
	 * Logs out the user.
	 *
	 * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
	 */
	public function logout()
	{
		Auth::logout();

		request()->session()->invalidate();

		request()->session()->regenerateToken();

		return redirect('/');
	}

	/**
	 * Logs in the user.
	 *
	 * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
	 */
    function login() {
	    $credentials = \request()->only('email', 'password');

	    if (Auth::attempt($credentials)) {
		    \request()->session()->regenerate();

		    return redirect(
            "/login-success/". Auth::user()->name . "/" . csrf_token()
		    );
	    }

	    return response("Unauthorized", 401);
    }
}
