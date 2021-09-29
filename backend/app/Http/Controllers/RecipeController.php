<?php

namespace App\Http\Controllers;

use App\Models\Recipe;

class RecipeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * List all recipes
     * @return \Illuminate\Http\JsonResponse
     */
    public function all(): \Illuminate\Http\JsonResponse
    {
        return response()->json(
            Recipe::with(['ingredients','instructions', 'creator', 'favorites', 'ratings'])
                ->get()
        );
    }

    /**
     * List all created recipes from user
     * @return \Illuminate\Http\JsonResponse
     */
    public function created(): \Illuminate\Http\JsonResponse
    {
        return response()->json(
            Recipe::with(['ingredients','instructions', 'creator', 'favorites', 'ratings'])
                ->where('creator',  auth()->id())
                ->get()
        );
    }

    /**
     * List all liked recipes from user
     * @return \Illuminate\Http\JsonResponse
     */
    public function liked(): \Illuminate\Http\JsonResponse
    {
        return response()->json(
            Recipe::with(['ingredients','instructions', 'creator', 'favorites', 'ratings'])
                ->whereHas('favorites', function($q){
                    $q->where('creator', '=', auth()->id());
                })->get()
        );
    }

    /**
     * List top 4 trending recipes
     * @return \Illuminate\Http\JsonResponse
     */
    public function trending(): \Illuminate\Http\JsonResponse
    {
        return response()->json(
            Recipe::with(['ingredients','instructions', 'creator', 'favorites', 'ratings']) 
                ->take(4)
                ->get()
        );
    }

    /**
     * List recommended recipes
     * @return \Illuminate\Http\JsonResponse
     */
    public function recommended(): \Illuminate\Http\JsonResponse
    {
        // TODO: Implement recommendations 

        return response()->json(
            Recipe::with(['ingredients','instructions', 'creator', 'favorites', 'ratings']) 
                ->take(3)
                ->get()
        );
    }

    /**
     * Get a recipe
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function get($id): \Illuminate\Http\JsonResponse
    {
        return response()->json(
            Recipe::with(['ingredients','instructions', 'creator', 'favorites', 'ratings'])
                ->findOrFail($id)
        );
    }
}
