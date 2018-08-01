import PropTypes from 'prop-types';

const cityShape = PropTypes.shape({
  countryId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export {cityShape};
