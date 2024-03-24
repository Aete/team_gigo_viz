import styled from "styled-components";
import AlgorithmComparisonChart from "./AlgorithmComparisonChart";
import TopSuccessSpotsList from "./TopSuccessSpotsList";

const ChartsContainer = styled.div`
  margin-top: 20px;
`;

export default function Overview({ selectedAlgorithm }) {
  return (
    <ChartsContainer>
      <AlgorithmComparisonChart selectedAlgorithm={selectedAlgorithm} />
      <TopSuccessSpotsList selectedAlgorithm={selectedAlgorithm} />
    </ChartsContainer>
  );
}
