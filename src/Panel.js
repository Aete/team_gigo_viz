import React, { useState } from "react";
import styled from "styled-components";
import { H1Title, H3Title } from "./Components/titles";

import Overview from "./Components/Panel/Overview/Overview";
import { Navigation } from "./Components/Panel/Navigation";
import Table from "./Components/Panel/Table";
import Scatter from "./Components/Panel/Scatter/Scatter";

const PanelContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 400px;
  height: calc(99.5% - 10px);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(-100%)"};
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: -30px;
  width: 30px;
  height: 30px;
  background-color: white;
  border: none;
  cursor: pointer;
`;

const Panel = ({ handleSelect, building, handleBinSelect }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("accessibility");
  const [subMenu, setSubMenu] = useState("overview");

  const [isOpen, setisOpen] = useState(true);

  const togglePanel = () => {
    setisOpen(!isOpen);
  };

  const handleAlgorithmSelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedAlgorithm(selectedValue);
    handleSelect(e);
  };

  return (
    <PanelContainer $isOpen={isOpen}>
      <H1Title>Traffic-Driven Restaurant Success Prediction</H1Title>
      <H3Title>Layers :</H3Title>
      <select value={selectedAlgorithm} onChange={handleAlgorithmSelect}>
        <option value="accessibility">(Prediction) Algorithm 1</option>
        <option value="algorithm2">(Prediction) Algorithm 2</option>
        <option value="data1">(Data) Feature1</option>
      </select>
      <Navigation setSubMenu={setSubMenu} subMenu={subMenu} />
      {subMenu === "overview" && (
        <Overview
          building={building}
          selectedAlgorithm={selectedAlgorithm}
          handleBinSelect={handleBinSelect}
        />
      )}

      {subMenu === "table" && <Table building={building} />}
      {subMenu === "scatter" && (
        <Scatter building={building} handleBinSelect={handleBinSelect} />
      )}
      <ToggleButton onClick={togglePanel}>{isOpen ? "<" : ">"}</ToggleButton>
    </PanelContainer>
  );
};

export default Panel;
