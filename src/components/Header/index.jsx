import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RiContactsLine } from 'react-icons/ri';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import SearchBar from '../SearchBar';
import './header.css';

function Header({ renderSearchBtn = true }) {
  const [renderSearchBar, setRenderSearchBar] = useState(false);
  const history = useHistory();

  const toProfile = () => {
    history.push('/profile');
  };

  return (
    <header>
      <div id="header-container">

        <RiContactsLine className="icon" onClick={ toProfile } />
        {renderSearchBtn
        && (
          <div>
            <BiSearchAlt2
              className="icon"
              onClick={ () => setRenderSearchBar(!renderSearchBar) }
            />
            {renderSearchBar ? <IoIosArrowUp className="icon-arrow" />
              : <IoIosArrowDown className="icon-arrow" /> }

          </div>)}
      </div>
      {renderSearchBar && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  renderSearchBtn: PropTypes.bool,
}.isRequired;

export default Header;
