import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Carousel from '../../components/Carousel';
import SearchContext from '../../contexts/SearchContext';
import { MAX_INGREDIENTS } from '../../helpers/constants';
import { recipeTypes, tag } from '../../helpers/Functions';
import { detailsApi } from '../../helpers/recipesApi';
import './RecipeDetails.css';
import FavoriteButton from '../../components/FavoriteButton';
import ShareButton from '../../components/ShareButton';

export default function RecipeDetails() {
  const {
    details,
    setDetails,
    setRecipes,
  } = useContext(SearchContext);

  const { id } = useParams();
  const history = useHistory();
  const type = history.location.pathname;

  const back = () => {
    if (type.includes('meals')) {
      return history.push('/meals');
    } return history.push('/drinks');
  };

  const startButton = () => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress !== undefined
      && recipesInProgress !== null) {
      if (recipesInProgress[`${recipeTypes(type)}`][id]) {
        return history.push(`/${recipeTypes(type)}/${id}/in-progress`);
      }
      recipesInProgress[`${recipeTypes(type)}`][id] = [];
      return localStorage
        .setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
    const recipesTest = {
      meals: {},
      drinks: {},
    };
    if (type.includes('meals')) {
      recipesTest.meals[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesTest));
      return history.push(`/meals/${id}/in-progress`);
    }
    if (type.includes('drinks')) {
      recipesTest.drinks[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesTest));
      return history.push(`/drinks/${id}/in-progress`);
    }
  };

  const progressRecipes = () => {
    const recipesList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesList !== undefined
      && recipesList !== null) {
      if (tag(type) === 'Meal') {
        return Object.keys(recipesList.meals).some((recipe) => id === recipe);
      }
      if (tag(type) === 'Drink') {
        return Object.keys(recipesList.drinks).some((recipe) => id === recipe);
      }
    } return false;
  };

  const doneRecipes = () => {
    const recipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesList !== undefined
      && recipesList !== null) {
      return recipesList.some((recipe) => id === recipe.id);
    } return false;
  };

  useEffect(() => {
    async function getDetails() {
      const recipeDetails = await detailsApi(id, type);
      const ingredientList = [];
      await recipeDetails?.map((item) => {
        for (let index = 1; index < MAX_INGREDIENTS; index += 1) {
          if (item[`strIngredient${index}`] !== ''
           && item[`strIngredient${index}`] !== null
           && item[`strIngredient${index}`] !== undefined) {
            ingredientList.push({
              ingredient: item[`strIngredient${index}`],
              measure: item[`strMeasure${index}`],
            });
          }
        } return setDetails({
          detail: recipeDetails,
          ingredients: ingredientList,
        });
      });
    }
    async function getRecipes() {
      const mealsURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const drinksURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      if (type?.includes('meals')) {
        const response = await fetch(mealsURL);
        const json = await response.json();
        return setRecipes({
          recipeType: json,
        });
      }
      const response = await fetch(drinksURL);
      const json = await response.json();
      return setRecipes({
        recipeType: json,
      });
    }
    getDetails();
    getRecipes();
  }, [id, type, setRecipes, setDetails]);

  return (
    <div>
      {details.detail?.[0]
        ? (
          <>
            <section id="details-card">
              <img
                src={ details.detail[0][`str${tag(type)}Thumb`] }
                alt={ details.detail[0][`str${tag(type)}`] }
                data-testid="recipe-photo"
                id="details-image"
              />
              <h2
                style={ {
                  color: 'white',
                  fontSize: '45px',
                  textAlign: 'center' } }
                data-testid="recipe-title"
              >
                {details.detail[0][`str${tag(type)}`]}
              </h2>
              <p
                style={ {
                  color: 'black',
                  fontSize: '25px',
                  textAlign: 'center',
                  marginTop: '0px',
                  marginBottom: '15px',
                } }
                data-testid="recipe-category"
              >
                {tag(type) === 'Meal' ? `(${details.detail[0].strCategory
                })` : details.detail[0].strAlcoholic}
              </p>
              <div id="details-buttons-box">
                <ShareButton className="details-buttons" type={ type } />
                <FavoriteButton className="details-buttons" id={ id } type={ type } />

              </div>
            </section>

            <ul style={ { padding: '0px' } }>
              <h3 className="recipe-titles">Ingredients:</h3>
              {details.ingredients.map((item, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                  className="ingredient-itens"
                >
                  {`${item.ingredient} - ${item.measure}`}
                </li>
              ))}
            </ul>
            <h3 className="recipe-titles">Instructions:</h3>
            <p
              style={ { padding: '0 10vw', fontSize: '4vw', marginBottom: '30px' } }
              data-testid="instructions"
            >
              {details.detail[0].strInstructions}
            </p>
            { tag(type) === 'Meal'
              ? (
                <iframe
                  id="video"
                  data-testid="video"
                  title={ details.detail[0][`str${tag(type)}`] }
                  src={ details.detail[0].strYoutube ? details.detail[0].strYoutube
                    .replace('watch?v=', 'embed/')
                    .replace('youtube', 'youtube-nocookie') : null }
                />
              ) : null}
            <Carousel tag={ tag(type) } />
            <div id="recipes-buttons-box">
              <button
                className="back-button"
                onClick={ back }
                style={ doneRecipes() ? { marginRight: 'auto' } : null }
              >
                Back
              </button>

              { !doneRecipes() ? (
                <Button
                  className="start-button"
                  dataTestId="start-recipe-btn"
                  onClick={ startButton }
                >
                  {progressRecipes() ? 'Continue Recipe' : 'Start Recipe' }
                </Button>)
                : null}

            </div>

          </>) : null}
    </div>
  );
}
