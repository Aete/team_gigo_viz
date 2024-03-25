import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ScatterPlot } from "./scatterplot";

const ScatterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  min-height: 400px;
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

export default function Scatter({ building, handleBinSelect }) {
  const [chart, setChart] = useState(null);
  const [xFeature, setXFeature] = useState("office_area");
  const [yFeature, setYFeature] = useState("retail_area");

  const container = useRef(null);

  useEffect(() => {
    if (!chart) {
      setChart(
        new ScatterPlot(
          container.current,
          building && building.properties.bin,
          handleBinSelect
        )
      );
    } else {
      chart.update(building && building.properties.bin, xFeature, yFeature);
    }
  }, [building, xFeature, yFeature, chart, handleBinSelect]);

  const handleXChange = (e) => {
    const selectedValue = e.target.value;
    setXFeature(selectedValue);
  };

  const handleYChange = (e) => {
    const selectedValue = e.target.value;
    setYFeature(selectedValue);
  };

  return (
    <ScatterContainer>
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
