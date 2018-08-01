import PropTypes from 'prop-types';

const tripShape = PropTypes.shape({
  activityId: PropTypes.string.isRequired,
  activityName: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,
  countryId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export {tripShape};
