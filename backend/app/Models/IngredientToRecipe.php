<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IngredientToRecipe extends Model
{
    protected $table = "ingredient_to_recipe";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'recipe', 'ingredient', 'amount', 'unit'
    ];

    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible =  ['id', 'name', 'unit', 'amount'];

    protected $appends = ['name'];

    /**
     * Inidicate if user has liked this recipe
     */
    public function getNameAttribute()
    {
        return $this->ingredients->name;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function ingredients()
    {
        return $this->belongsTo(Ingredient::class, "ingredient");
    }
}
