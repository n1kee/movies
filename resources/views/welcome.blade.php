<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <link  rel="stylesheet" href="/css/app.css">
    </head>
    <body>
        @csrf
        <input class="d-none" name="user_name" value="{{$userName}}">
        <div id="root"></div>
        <script src="/js/app.js"></script>
    </body>
</html>
