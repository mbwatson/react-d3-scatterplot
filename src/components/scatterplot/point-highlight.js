import PropTypes from 'prop-types';

export const PointHighlight = ({ cx, cy }) => (
  <circle
    r={ 10 }
    fill="crimson"
    stroke="crimson"
    strokeWidth="2"
    cx={ cx }
    cy={ cy }
  >
    <animate attributeName="r" begin="0s" dur="1s" keyTimes="0;1" values="2;22" repeatCount="indefinite" />
    <animate attributeName="opacity" begin="0s" dur="1s" from="100%" to="0%" repeatCount="indefinite" />
    <animate attributeName="fill-opacity" begin="0s" dur="1s" from="100%" to="0%" repeatCount="indefinite" />
  </circle>
);

PointHighlight.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
};
