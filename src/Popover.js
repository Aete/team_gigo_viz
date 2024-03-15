import React from 'react';
import styled from 'styled-components';

const PopoverContainer = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 250px;
  z-index: 1;
`;

const PopoverArrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px;
  border-color: transparent transparent white transparent;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
`;

const Popover = ({ x, y, properties }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <PopoverContainer style={{ left: x, top: y }} onClick={stopPropagation}>
      <PopoverArrow />
      <div>
        <strong>Possibility of Success:</strong> {properties.possibilityOfSuccess}%
      </div>
      <div>
        <strong>Applied ML Algorithm:</strong> {properties.appliedAlgorithm}
      </div>
      <div>
        <strong>GTFS Stop ID:</strong> {properties.gtfsStopId}
      </div>
      <div>
        <strong>Latitude:</strong> {properties.latitude}
      </div>
      <div>
        <strong>Longitude:</strong> {properties.longitude}
      </div>
    </PopoverContainer>
  );
};

export default Popover;