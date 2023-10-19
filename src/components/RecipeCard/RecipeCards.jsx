import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCards.css';

export default function RecipeCards({ recipe, index, linkToDetails }) {
  return (
    <Link id="recipe-link" to={ linkToDetails }>
      <div id="recipe-card" data-testid={ `${index}-recipe-card` }>
        <div id="image-container">
          <img
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt={ recipe.strDrink || recipe.strMeal }
            id="recipe-img"
          />
        </div>

        <h3
          data-testid={ `${index}-card-name` }
          id="recipe-name"
        >
          {recipe.strDrink || recipe.strMeal}
        </h3>
      </div>
    </Link>
  );
}

RecipeCards.propTypes = {
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strMeal: PropTypes.string,
    linkToDetails: PropTypes.string,
  }).isRequired,
}.isRequired;
