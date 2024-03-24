import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  margin-top: 20px;
`;

const TopSuccessSpotsList = ({ selectedAlgorithm }) => {
  const listData = {
    accessibility: [
      { id: 1, name: "Spot 1", probability: 0.95 },
      { id: 2, name: "Spot 2", probability: 0.92 },
      // ...
    ],
    algorithm2: [
      { id: 1, name: "Spot 1", probability: 0.93 },
      { id: 2, name: "Spot 2", probability: 0.91 },
      // ...
    ],
  };

  return (
    <ListContainer>
      <h4>Top Success Spots</h4>
      <ul>
        {listData[selectedAlgorithm] != undefined && listData[selectedAlgorithm].map((spot) => (
          <li key={spot.id}>
            {spot.name} - {spot.probability}
          </li>
        ))}
      </ul>
    </ListContainer>
  );
};

export default TopSuccessSpotsList;