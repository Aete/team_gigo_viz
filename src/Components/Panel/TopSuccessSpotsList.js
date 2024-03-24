import React from "react";
import styled from "styled-components";
import { H4Title } from "../titles";

const ListContainer = styled.div`
  margin-top: 20px;

  & li {
    margin-bottom: 8px;
    font-size: 15px;
  }
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
      <H4Title>Top Success Spots</H4Title>
      <ul>
        {listData[selectedAlgorithm] !== undefined &&
          listData[selectedAlgorithm].map((spot) => (
            <li key={spot.id}>
              {spot.name} - {spot.probability}
            </li>
          ))}
      </ul>
    </ListContainer>
  );
};

export default TopSuccessSpotsList;
