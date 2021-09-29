<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});


$router->group(['prefix' => 'api'], function () use ($router)
{
    $router->post('register', 'AuthController@register');
    $router->post('login', 'AuthController@login');

    $router->get('recipes', 'RecipeController@all');
    $router->get('recipe/{id}', 'RecipeController@get');

    $router->get('created-recipes', 'RecipeController@created');
    $router->get('liked-recipes', 'RecipeController@liked');
});


// API protected route group
$router->group(['middleware' => 'auth', 'prefix' => 'api'], function ($router)
{
    $router->post('logout', 'AuthController@logout');
    $router->post('refresh', 'AuthController@refresh');
});

