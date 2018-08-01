import PropTypes from 'prop-types';

const savedTripShape = PropTypes.shape({
  activityId: PropTypes.string.isRequired,
  activityName: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,
  countryId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  linkUrl: PropTypes.string.isRequired,
  savedTripId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export {savedTripShape};
