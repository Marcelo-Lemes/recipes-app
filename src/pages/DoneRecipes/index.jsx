import React, { useState } from 'react';
import DoneCard from '../../components/DoneCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function DoneRecipes() {
  const [type, setType] = useState('all');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const filterButton = (filter) => setType(filter);

  return (
    <div>
      <Header title="Done Recipes" renderSearchBtn={ false } />
      <button
        onClick={ () => filterButton('all') }
        data-testid="filter-by-all-btn"
      >
        all
      </button>
      <button
        onClick={ () => filterButton('meal') }
        data-testid="filter-by-meal-btn"
      >
        meals
      </button>
      <button
        onClick={ () => filterButton('drink') }
        data-testid="filter-by-drink-btn"
      >
        drinks
      </button>

      { doneRecipes ? <DoneCard type={ type } recipes={ doneRecipes } />
        : <h3>Você ainda não terminou nenhuma receita.</h3> }
      <Footer />
    </div>
  );
}
