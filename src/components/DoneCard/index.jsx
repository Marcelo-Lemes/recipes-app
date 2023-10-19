import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';
import './DoneCard.css';

export default function DoneCard({ type, recipes }) {
  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const history = useHistory();
  const path = history.location.pathname;

  return (
    <div>
      {recipes
        .filter((recipe) => {
          if (type === 'all') {
            return recipe;
          } return recipe.type === type;
        })
        .map((recipe, index) => (
          <Link
            style={ { textDecoration: 'none' } }
            key={ index }
            to={ `../${recipe.type.concat('s')}/${recipe.id}` }
          >
            <div id="done-card" key={ index }>
              <div id="done-img-box">
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  id="done-img"
                />
              </div>
              <div id="favorite-text-box">
                <h2
                  id="favorite-name"
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h2>
                <div>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    style={ { marginTop: '-20px',
                      marginBottom: '25px',
                      color: 'black',
                      textAlign: 'center',
                    } }
                  >
                    {recipe.type === 'meal'
                      ? `( ${recipe.nationality} - ${recipe.category} )`
                      : `( ${recipe.alcoholicOrNot} )`}
                  </p>
                </div>
                {path?.includes('done-recipes')
                  ? (
                    <div>
                      {recipe.tags.map((tag, i) => (
                        <p
                          style={ { textAlign: 'center',
                            marginTop: '-20px',
                            marginBottom: '30px',
                          } }
                          key={ i }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          { tag }
                        </p>
                      )) }
                      <p
                        data-testid={ `${index}-horizontal-done-date` }
                      >
                        {recipe.doneDate}
                      </p>
                    </div>)
                  : null }
                <div style={ { display: 'flex', justifyContent: 'center' } }>
                  <ShareButton
                    dataTestId={ `${index}-horizontal-share-btn` }
                    type={ `/${recipe.type}s/${recipe.id}` }
                  />
                  {path?.includes('favorite-recipes')
                    ? (
                      <FavoriteButton
                        dataTestId={ `${index}-horizontal-favorite-btn` }
                        id={ recipe.id }
                        type={ `/${recipe.type}s/${recipe.id}` }
                      />)
                    : null}

                </div>
              </div>

            </div>

          </Link>
        ))}
    </div>
  );
}
DoneCard.propTypes = {
  type: PropTypes.string,
  path: PropTypes.string,
  recipes: PropTypes.string,
}.isRequired;
