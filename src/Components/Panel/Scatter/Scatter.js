import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ScatterPlot } from "./scatterplot";
import { useRecoilState } from "recoil";
import calculateCentroid from "../../../utils/calCentroid";
import buildingJson from "../../../utils/data/building.json";
import { buildingState, subMenuState } from "../../../recoil/atoms";

const ScatterContainer = styled.div`
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  min-height: 400px;
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
`;

const ScatterHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  & select {
    height: 20px;
  }
`;

export default function Scatter() {
  const [building, setBuilding] = useRecoilState(buildingState);
  const [subMenu] = useRecoilState(subMenuState);
  const [chart, setChart] = useState(null);
  const [xFeature, setXFeature] = useState("office_area");
  const [yFeature, setYFeature] = useState("retail_area");

  const container = useRef(null);

  const setBuildingByBin = (bin) => {
    const previousBin = building?.properties?.bin;

    if (previousBin && previousBin.toString() === bin.toString()) {
      setBuilding(null);
    }

    const buildingData = buildingJson.features.filter(
      (row) => parseInt(row.properties.bin) === bin
    )[0];

    const { properties } = buildingData;
    const coordinates = buildingData.geometry.coordinates[0];
    const centroid = calculateCentroid(coordinates);
    setBuilding({ properties, centroid });
  };

  useEffect(() => {
    if (!chart) {
      setChart(
        new ScatterPlot(
          container.current,
          building && building.properties.bin,
          setBuildingByBin
        )
      );
    } else {
      chart.update(building && building.properties.bin, xFeature, yFeature);
    }
  }, [building, xFeature, yFeature, chart, setBuildingByBin]);

  const handleXChange = (e) => {
    const selectedValue = e.target.value;
    setXFeature(selectedValue);
  };

  const handleYChange = (e) => {
    const selectedValue = e.target.value;
    setYFeature(selectedValue);
  };

  return (
    <ScatterContainer $isVisible={subMenu === "scatter"}>
      <ScatterHeader>
        X:
        <select value={xFeature} onChange={handleXChange}>
          <option value="office_area">Office Area</option>
          <option value="retail_area">Retail Area</option>
          <option value="residential_area">Residential Area</option>
        </select>
        Y:
        <select value={yFeature} onChange={handleYChange}>
          <option value="office_area">Office Area</option>
          <option value="retail_area">Retail Area</option>
          <option value="residential_area">Residential Area</option>
        </select>
      </ScatterHeader>
      <div className="ScatterChart" ref={container}></div>
    </ScatterContainer>
  );
}
