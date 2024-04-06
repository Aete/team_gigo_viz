import styled from "styled-components";
import { useRecoilState } from "recoil";
import AlgorithmComparisonChart from "./AlgorithmComparisonChart";
import TopSuccessSpotsList from "./TopSuccessSpotsList";
import { subMenuState } from "../../../recoil/atoms";

const ChartsContainer = styled.div`
  margin-top: 20px;
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  flex-direction: column;
`;

export default function Overview({ selectedAlgorithm }) {
  const [subMenu] = useRecoilState(subMenuState);
  return (
    <ChartsContainer $isVisible={subMenu === "overview"}>
      <AlgorithmComparisonChart selectedAlgorithm={selectedAlgorithm} />
      <TopSuccessSpotsList selectedAlgorithm={selectedAlgorithm} />
    </ChartsContainer>
  );
}
