import PropTypes from 'prop-types';

const activityShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export {activityShape};
