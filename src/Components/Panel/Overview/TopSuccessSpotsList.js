import React from "react";
import styled from "styled-components";
import { H4Title } from "../../titles";

const ListContainer = styled.div`
  margin-top: 20px;

  & li {
    margin-bottom: 8px;
    font-size: 15px;
    cursor: pointer;
  }

  & li:hover {
    font-weight: bold;
  }
`;

const listData = {
  accessibility: [
    { id: 1, name: "Spot 1", probability: 0.95, bin: 1062896 },
    { id: 2, name: "Spot 2", probability: 0.92, bin: 1034194 },
    { id: 3, name: "Spot 3", probability: 0.92, bin: 1015219 },
    { id: 4, name: "Spot 4", probability: 0.92, bin: 1012831 },
    { id: 5, name: "Spot 5", probability: 0.92, bin: 1080673 },
    { id: 6, name: "Spot 6", probability: 0.92, bin: 1084820 },
    { id: 7, name: "Spot 7", probability: 0.92, bin: 1027086 },
    { id: 8, name: "Spot 8", probability: 0.92, bin: 1067973 },
    { id: 9, name: "Spot 9", probability: 0.92, bin: 1034194 },
    { id: 10, name: "Spot 10", probability: 0.92, bin: 1087186 },

    // ...
  ],
  algorithm2: [
    { id: 1, name: "Spot 1", probability: 0.95, bin: 1062896 },
    { id: 2, name: "Spot 2", probability: 0.92, bin: 1034194 },
    { id: 3, name: "Spot 3", probability: 0.92, bin: 1015219 },
    { id: 4, name: "Spot 4", probability: 0.92, bin: 1012831 },
    { id: 5, name: "Spot 5", probability: 0.92, bin: 1080673 },
    { id: 6, name: "Spot 6", probability: 0.92, bin: 1084820 },
    { id: 7, name: "Spot 7", probability: 0.92, bin: 1027086 },
    { id: 8, name: "Spot 8", probability: 0.92, bin: 1067973 },
    { id: 9, name: "Spot 9", probability: 0.92, bin: 1034194 },
    { id: 10, name: "Spot 10", probability: 0.92, bin: 1087186 },
    // ...
  ],

  algorithm3: [
    { id: 1, name: "Spot 1", probability: 0.95, bin: 1062896 },
    { id: 2, name: "Spot 2", probability: 0.92, bin: 1034194 },
    { id: 3, name: "Spot 3", probability: 0.92, bin: 1015219 },
    { id: 4, name: "Spot 4", probability: 0.92, bin: 1012831 },
    { id: 5, name: "Spot 5", probability: 0.92, bin: 1080673 },
    { id: 6, name: "Spot 6", probability: 0.92, bin: 1084820 },
    { id: 7, name: "Spot 7", probability: 0.92, bin: 1027086 },
    { id: 8, name: "Spot 8", probability: 0.92, bin: 1067973 },
    { id: 9, name: "Spot 9", probability: 0.92, bin: 1034194 },
    { id: 10, name: "Spot 10", probability: 0.92, bin: 1087186 },
    // ...
  ],
};

const TopSuccessSpotsList = ({ selectedAlgorithm, handleBinSelect }) => {
  const handleClick = (bin) => {
    handleBinSelect(bin);
  };
  return (
    <ListContainer>
      <H4Title>Top Success Spots</H4Title>
      <ul>
        {listData[selectedAlgorithm] !== undefined &&
          listData[selectedAlgorithm].map((spot) => (
            <li key={spot.id} onClick={(e) => handleClick(spot.bin)}>
              {spot.name} - {spot.probability}
            </li>
          ))}
      </ul>
    </ListContainer>
  );
};

export default TopSuccessSpotsList;
