import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LuChefHat } from 'react-icons/lu';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

function Footer() {
  const { pathname } = useLocation();
  const history = useHistory();

  const toDrinks = () => {
    history.push('/drinks');
  };
  const toMeals = () => {
    history.push('/meals');
  };

  useEffect(() => {
    console.log(pathname);
  });

  return (
    <footer className="footer" data-testid="footer">
      <button
        style={ pathname === '/meals'
          ? { backgroundColor: 'white' } : null }
        className="recipes-buttons"
        onClick={ toMeals }
      >
        <img
          alt="profile-icon"
          src={ mealIcon }
          data-testid="meals-bottom-btn"
        />
      </button>
      <div id="logo">
        <LuChefHat id="logo-icon" />
      </div>
      <button
        style={ pathname === '/drinks'
          ? { backgroundColor: 'white' } : null }
        className="recipes-buttons"
        onClick={ toDrinks }
      >
        <img
          alt="profile-icon"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
        />
      </button>

    </footer>
  );
}

export default Footer;
