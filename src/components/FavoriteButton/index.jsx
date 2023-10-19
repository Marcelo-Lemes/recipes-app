import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { setFavorite } from '../../helpers/favorite';
import { getLocalStorage } from '../../helpers/localStorage';
import SearchContext from '../../contexts/SearchContext';
import './FavoriteButton.css';

// O Parâmetro 'type' seria o pathname da página e 'id' é o id da receita selecionada.
export default function FavoriteButton({ type, id, dataTestId = 'favorite-btn' }) {
  const {
    details,
    favorited,
    setFavorited,
  } = useContext(SearchContext);

  useEffect(() => {
    const verifyFavorite = () => {
      const favoriteRecipes = getLocalStorage('favoriteRecipes') || [];
      return favoriteRecipes.some((recipe) => id === recipe.id);
    };

    setFavorited(verifyFavorite());
  }, [id, setFavorited]);

  return (
    <button
      type="button"
      id="favorite-buttons"
      onClick={ () => {
        setFavorited(setFavorite(
          favorited,
          details,
          type,
          id,
        ));
      } }
    >
      {favorited ? <AiFillHeart
        id="full-heart"
        style={ {
          fontSize: '10vw' } }
      />
        : (
          <AiOutlineHeart
            id="heart"
            style={ {
              fontSize: '10vw' } }
          />)}
    </button>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
