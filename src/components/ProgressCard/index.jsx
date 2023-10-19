import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext';
import { tag } from '../../helpers/Functions';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';
import './ProgressCard.css';

export default function ProgressCard({ ingredients, doneTasks, id }) {
  const {
    details,

  } = useContext(SearchContext);

  const history = useHistory();
  const type = history.location.pathname;

  return (
    <div id="details-card">
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
        {tag(type) === 'Meal' ? `(${details.detail[0].strCategory})`
          : `(${details.detail[0].strAlcoholic})`}
      </p>

      <div id="details-buttons-box">
        <ShareButton type={ type?.replace('/in-progress', '') } />
        <FavoriteButton className="details-buttons" id={ id } type={ type } />

      </div>

      <div className="ingredients-container">
        <h3 className="recipe-titles">Ingredients</h3>
        <div id="task-list">
          {details.ingredients.map((item, index) => (
            <label
              id={ `${index}-task` }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className={ ingredients?.includes(item.ingredient)
                ? 'done ' : 'ingredient-item' }
              htmlFor={ item.ingredient }
            >
              <input
                checked={ ingredients?.includes(item.ingredient) }
                className="ingredients-inputs"
                onChange={ doneTasks }
                id={ item.ingredient }
                name={ index }
                type="checkbox"
              />

              {`${item.ingredient} - ${item.measure}`}

            </label>

          ))}
        </div>

      </div>
      <h3 className="recipe-titles">Instructions</h3>
      <p
        style={ { padding: '0 10vw', fontSize: '4vw', marginBottom: '30px' } }
        data-testid="instructions"
      >
        {details.detail[0].strInstructions}
      </p>
    </div>
  );
}
ProgressCard.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
  doneTasks: PropTypes.func,
  id: PropTypes.string,
}.isRequired;
