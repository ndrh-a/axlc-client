"use client";

import { useState } from "react";
import { IconChefHat, IconPlus, IconX, IconSearch, IconClock, IconUsers, IconStar } from "@tabler/icons-react";
import axiosInstance from "@/services/axios";

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  rating: number;
  cuisine: string;
  dietary: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string>("");

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validIngredients = ingredients.filter(ing => ing.trim() !== "");
    
    if (validIngredients.length === 0) {
      setError("Please enter at least one ingredient");
      return;
    }

    setIsLoading(true);
    setError("");
    setRecipe(null);

    try {
      const response = await axiosInstance.post('/recipe/analyze', {
        message: `I have these ingredients: ${validIngredients.join(', ')}. Can you suggest a recipe?`,
        ingredients: validIngredients
      });

      if (response.data && response.data.error) {
        throw new Error(response.data.error);
      }

      setRecipe(response.data);
    } catch (err) {
      console.error('Recipe generation error:', err);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setIngredients([""]);
    setRecipe(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <IconChefHat className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Smart Recipe Analyzer
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What&apos;s in your kitchen?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Input your available ingredients and let our AI create delicious recipe suggestions tailored just for you.
            </p>
          </div>

          {/* Ingredient Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Available Ingredients
                </label>
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => updateIngredient(index, e.target.value)}
                          placeholder="e.g., chicken breast, tomatoes, pasta..."
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                        />
                      </div>
                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <IconX className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="mt-3 flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  <IconPlus className="h-4 w-4" />
                  <span>Add another ingredient</span>
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <IconSearch className="h-5 w-5" />
                      <span>Find Recipe</span>
                    </>
                  )}
                </button>
                {recipe && (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Recipe Display */}
          {recipe && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Recipe Header */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 sm:p-8 text-white">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold">{recipe.title}</h3>
                  <div className="flex items-center space-x-1">
                    <IconStar className="h-5 w-5 fill-current" />
                    <span className="font-semibold">{recipe.rating}</span>
                  </div>
                </div>
                <p className="text-green-100 text-lg">{recipe.description}</p>
                
                {/* Recipe Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {recipe.cuisine}
                  </span>
                  {recipe.dietary.map((diet, index) => (
                    <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                      {diet}
                    </span>
                  ))}
                </div>
                
                {/* Recipe Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <IconClock className="h-5 w-5" />
                    <div>
                      <p className="text-sm text-green-100">Prep Time</p>
                      <p className="font-semibold">{recipe.prepTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IconClock className="h-5 w-5" />
                    <div>
                      <p className="text-sm text-green-100">Cook Time</p>
                      <p className="font-semibold">{recipe.cookTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IconUsers className="h-5 w-5" />
                    <div>
                      <p className="text-sm text-green-100">Servings</p>
                      <p className="font-semibold">{recipe.servings}</p>
                    </div>
                  </div>
                </div>

                {/* Nutrition Info */}
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <h4 className="text-sm font-medium text-green-100 mb-3">Nutrition (per serving)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{recipe.nutrition.calories}</p>
                      <p className="text-xs text-green-100">Calories</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{recipe.nutrition.protein}g</p>
                      <p className="text-xs text-green-100">Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{recipe.nutrition.carbs}g</p>
                      <p className="text-xs text-green-100">Carbs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{recipe.nutrition.fat}g</p>
                      <p className="text-xs text-green-100">Fat</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipe Content */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Ingredients */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Ingredients
                    </h4>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Instructions
                    </h4>
                    <ol className="space-y-3">
                      {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 Smart Recipe Analyzer. Powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
