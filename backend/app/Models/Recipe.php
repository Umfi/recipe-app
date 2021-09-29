<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'image', 'time', 'difficulty', 'calories', 'amount'
    ];

    protected $appends = ['liked', 'totalLikes', 'rating', 'userRating', 'totalRatings'];

    protected $hidden = ['favorites', 'ratings'];

    /**
     * Indicate if user has liked this recipe
     * @return bool
     */
    public function getLikedAttribute(): bool
    {
        return $this->favorites()->where('creator',  auth()->id())->exists();
    }

    /**
     * Number of likes of the recipe
     * @return int
     */
    public function getTotalLikesAttribute(): int
    {
        return $this->favorites()->count();
    }

    /**
     * Get average rating of recipe
     * @return int
     */
    public function getRatingAttribute(): ?int
    {
        return $this->ratings()->avg('rating');
    }

    /**
     * Get user rating of recipe
     * @return int
     */
    public function getUserRatingAttribute(): ?int
    {
        $rating = $this->ratings()->where('creator',  auth()->id())->first();

        if ($rating) {
            return $rating->rating;
        }

        return null;
    }

    /**
     * Number of ratings of the recipe
     * @return int
     */
    public function getTotalRatingsAttribute(): int
    {
        return $this->ratings()->count();
    }



    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'creator');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ingredients(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(IngredientToRecipe::class, "recipe")->orderBy('id');;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function instructions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Instruction::class, "recipe")->orderBy('id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function favorites(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Favorite::class, "recipe");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ratings(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Rating::class, "recipe");
    }

}
