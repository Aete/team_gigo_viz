import React from "react";
import styled from "styled-components";

const PopoverContainer = styled.div`
  color: #212121;
`;

const Popover = ({ properties }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <PopoverContainer onClick={stopPropagation}>
      <div>
        <strong>bin:</strong> {properties.bin}
      </div>
      <div>
        <strong>AADT 2019 (idw):</strong>{" "}
        {Math.round(properties.idw_aadt_2019 * 1000) / 1000}
      </div>
      <div>
        <strong>distance_from_station(ft):</strong>{" "}
        {properties["distance_from_station(ft)"]}
      </div>
    </PopoverContainer>
  );
};

export default Popover;
