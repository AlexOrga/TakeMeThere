import PropTypes from 'prop-types';

const countryShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export {countryShape};
