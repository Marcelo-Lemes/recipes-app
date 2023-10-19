import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { BiSolidShare } from 'react-icons/bi';
import SearchContext from '../../contexts/SearchContext';
import './ShareButton.css';

const MAX_TIMEOUT_COPY = 3000;

// O Parâmetro 'type' seria o pathname da página de detalhes da receita //

export default function ShareButton({
  type,
  dataTestId = 'share-btn',
}) {
  const { copied, setCopied } = useContext(SearchContext);
  function copyLink() {
    const link = `http://localhost:3000${type}`;
    clipboardCopy(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, MAX_TIMEOUT_COPY);
  }

  return (
    <div>

      <button
        className="details-buttons"
        type="button"
        data-testid={ dataTestId }
        src="src/images/shareIcon.svg"
        onClick={ copyLink }
      >
        <BiSolidShare className="details-image" />
      </button>
      {copied && <span style={{position: 'absolute', margin: '60px -38px 10px'}}>Link copied!</span>}
    </div>
  );
}

ShareButton.propTypes = {
  type: PropTypes.string,
  dataTestId: PropTypes.string,
}.isRequired;
