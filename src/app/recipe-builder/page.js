'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipeBuilder() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const email = localStorage.getItem('email')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleYesClick = () => {
    // We add code here later
  };

  const handleNoClick = () => {
    // We add code here later
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    router.push('/');
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    setRecipe('');
    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate recipe');
      }
      setRecipe(data.recipe);
      console.log(data.recipe)
    } catch (error) {
      console.error('Failed to generate recipe:', error);
      setError(error.message || 'An error occurred while generating the recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Recipe Builder</h1>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter your ingredients"
        className="border p-2 mr-2"
      />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`${
          isSubmitting ? 'bg-gray-500' : 'bg-blue-500'
        } text-white px-4 py-2 rounded mr-2`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Log out
      </button>
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {recipe && (
        <div className="mt-4">
          <p className="mb-4 whitespace-pre">{recipe}</p>
          <p>Was this response helpful?</p>
          <button 
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleYesClick}>
            Yes
          </button>
          <button 
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleNoClick}>
            No
          </button>
        </div>
      )}
    </div>
  );
}