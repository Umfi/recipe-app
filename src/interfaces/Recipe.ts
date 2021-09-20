export interface Recipe {
    id: number;
    name: string;
    img: string;
    liked: boolean;
    time: number;
    difficulty: string;
    rating: number;
    votes: number;
    calories: number;
    amount: number;
}

export default function toggleLike(recipe: Recipe){
    recipe.liked = !recipe.liked;
}