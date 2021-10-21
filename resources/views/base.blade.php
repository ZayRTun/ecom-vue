@php
    $config = [
        'data' => [
            'user' => Auth::user(),
            'min_delivery_amount' => 20000
        ]
    ];
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

        <title>Laravel</title>
    </head>
    <body class="antialiased min-h-screen text-gray-700">
        <div id="app">
            {{-- <app-layout></app-layout> --}}
        </div>

        <script>
            window.config = @json($config)
        </script>

        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
