import React, { useState } from 'react';
import DoneCard from '../../components/DoneCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const [type, setType] = useState('all');

  const filterButton = (filter) => setType(filter);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <div>
      <Header title="Favorite Recipes" renderSearchBtn={ false } />
      <div style={ { display: 'flex', justifyContent: 'center', marginTop: '80px' } }>
        <button
          onClick={ () => filterButton('all') }
          data-testid="filter-by-all-btn"
          className="favorite-filters-buttons"
        >
          all
        </button>
        <button
          onClick={ () => filterButton('meal') }
          data-testid="filter-by-meal-btn"
          className="favorite-filters-buttons"
        >
          meals
        </button>
        <button
          onClick={ () => filterButton('drink') }
          data-testid="filter-by-drink-btn"
          className="favorite-filters-buttons"
        >
          drinks
        </button>

      </div>
      { favoriteRecipes ? <DoneCard type={ type } recipes={ favoriteRecipes } />
        : <h3>Você ainda não favoritou nenhuma receita.</h3> }
      <Footer />
    </div>
  );
}
