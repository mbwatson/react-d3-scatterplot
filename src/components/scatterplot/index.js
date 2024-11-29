import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import classes from './scatterplot.module.css';
import { PointHighlight } from './point-highlight';

const { Delaunay } = d3;

const MARGIN = {
            top: 36,
  left: 72,          right: 48,
           bottom: 48,
};

export const Scatterplot = ({ data, width, height }) => {
  const svgRef = useRef();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const locations = useMemo(() => new Set(data.map(d => d.location)), []);
  const color = useCallback(d3.scaleOrdinal().domain(locations).range(d3.schemeObservable10), [locations]);

  // x scale
  const dateBounds = d3.extent(data.map(d => new Date(d.date)));
  const x = useCallback(d3.scaleUtc()
    .domain(dateBounds)
    .range([MARGIN.left, width - MARGIN.right]), []);

  // y scale
  const valueBounds = d3.extent(data.map(d => +d.value));
  const y = useCallback(d3.scaleLinear()
    .domain(valueBounds)
    .range([height - MARGIN.bottom, MARGIN.top]), []);

  // draw axes
  useEffect(() => {
    if (!svgRef.current) {
      return;
    }
    const svg = d3.select(svgRef.current);
    // x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${ height - MARGIN.bottom })`)
      .call(d3.axisBottom(x));
    // y-axis
    svg.append('g')
      .attr('transform', `translate(${ MARGIN.left }, 0)`)
      .call(d3.axisLeft(y));
  }, []);

  const delaunay = useMemo(() => {
    const formattedData = data.map((d) => [x(new Date(d.date)), y(d.value)]);
    return Delaunay.from(formattedData);
  }, [x, y]);

  const voronoi = useMemo(() => {
    return delaunay.voronoi([0, 0, width, height]);
  }, [delaunay, width, height]);

  // memoize all points (+highlight) component
  const Points = useCallback(() => data.map(d => (
    <Fragment key={ d.id }>
      { // hovered point emphasis
        d.id === hoveredPoint?.id && (
          <PointHighlight cx={ x(new Date(d.date)) } cy={ y(d.value) } />
        )
      }
      <circle
        r={ 4 }
        cy={ y(d.value) }
        cx={ x(new Date(d.date)) }
        fill={ color(d.location) }
        onMouseOver={ () => setHoveredPoint(d) }
      />
    </Fragment>
  )), [data, hoveredPoint, x, y]);

  const VoronoiMesh = useCallback(() => (
    <g className="voronoi">
      { data.map((d, i) => (
        <path
          key={i}
          d={voronoi.renderCell(i)}
          stroke="#234"
          fill="transparent"
          opacity={0.1}
          onMouseOver={ () => setHoveredPoint(d) }
          onMouseOut={ () => setHoveredPoint(null) }
        />
      ))}
    </g>
  ), []);

  // memoized tooltip component
  const Tooltip = useCallback(({ datum }) => {
    const calculatedStyles = datum ? {
      filter: 'opacity(1.0) drop-shadow(0 0 var(--spacing-1) #0003)',
      left: x(new Date(datum.date)) + 20 + 'px',
      top: y(datum.value) + 20 + 'px',
      borderColor: color(datum.location),
      backgroundColor: `color-mix(in oklab, ${ color(datum.location) } 25%, #fff)`,
    } : { filter: 'opacity(0.0)' };

    return (
      <div className={ classes.tooltip } style={{ ...calculatedStyles }}>
        { Object.entries(datum ?? {}).map(([key, value]) => (
          <div key={ `${ key }-${ value }` }>
            <strong>{ key }:</strong> { value }
          </div>
        )) }
      </div>
    );
  }, [hoveredPoint]);

  return (
    <Fragment>
      <svg
        ref={ svgRef }
        className={ classes.scatterplot }
        width={ width }
        height={ height }
        viewBox={ `0 0 ${ width } ${ height }` }
        onMouseOut={ () => setHoveredPoint(null) }
      >
        <Points />
        <VoronoiMesh />
      </svg>
      <Tooltip datum={ hoveredPoint } />
    </Fragment>
  );
};

Scatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
