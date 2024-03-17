import React from "react";
import styled from "styled-components";

const PopoverContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 250px;
`;

const PopoverArrow = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px;
  border-color: transparent transparent white transparent;
`;

const Popover = ({ properties }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <PopoverContainer onClick={stopPropagation}>
      <PopoverArrow />
      <div>
        <strong>Possibility of Success:</strong>{" "}
        {properties.possibilityOfSuccess}%
      </div>
      <div>
        <strong>Applied ML Algorithm:</strong> {properties.appliedAlgorithm}
      </div>
      <div>
        <strong>GTFS Stop ID:</strong> {properties.gtfsStopId}
      </div>
    </PopoverContainer>
  );
};

export default Popover;
