import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import {
  ROUTE_DONE_RECIPES,
  ROUTE_FAVORITE_RECIPES,
  ROUTE_LOGIN,
  TEST_ID_BTN_PROFILE_DONE_RECIPES,
  TEST_ID_BTN_PROFILE_FAVORITE_RECIPES,
  TEST_ID_BTN_PROFILE_LOGOUT,
  TEST_ID_PROFILE_EMAIL,
  USER,
} from '../../helpers/constants';
import { getLocalStorage } from '../../helpers/localStorage';
import './Profile.css';

export default function Profile() {
  const history = useHistory();

  const goTo = (route) => history.push(route);

  const { email } = getLocalStorage(USER);

  const logout = () => {
    localStorage.clear();
    goTo(ROUTE_LOGIN);
  };

  return (
    <div id="profile-container">
      <section id="profile-box">
        <p
          style={ { fontSize: '6vw', textAlign: 'center', marginBottom: '50px' } }
          data-testid={ TEST_ID_PROFILE_EMAIL }
        >
          {email}

        </p>
        <div>
          <Button
            className="profile-buttons"
            dataTestId={ TEST_ID_BTN_PROFILE_FAVORITE_RECIPES }
            onClick={ () => goTo(ROUTE_FAVORITE_RECIPES) }
          >
            Favorite Recipes
          </Button>
          <Button
            className="profile-buttons"
            dataTestId={ TEST_ID_BTN_PROFILE_DONE_RECIPES }
            onClick={ () => goTo(ROUTE_DONE_RECIPES) }
          >
            Done Recipes
          </Button>

        </div>

        <Button
          id="logout-button"
          dataTestId={ TEST_ID_BTN_PROFILE_LOGOUT }
          onClick={ () => logout() }
        >
          Logout
        </Button>

      </section>
      <Footer />
    </div>
  );
}
