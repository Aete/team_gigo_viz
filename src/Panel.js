import React, { useState } from "react";
import styled from "styled-components";
import { H1Title, H3Title } from "./Components/titles";

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
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
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

const Panel = () => {
  const [isOpen, setisOpen] = useState(true);

  const togglePanel = () => {
    setisOpen(!isOpen);
  };

  return (
    <PanelContainer isOpen={isOpen}>
      <H1Title>Traffic-Driven Restaurant Success Prediction</H1Title>
      <H3Title>Layers :</H3Title>
      <select>
        <option value="knn">(Prediction) K-Nearest Neighbors</option>
        <option value="svm">(Prediction) Support Vector Machine</option>
        <option value="randomForest">(Prediction) Random Forest</option>
        <option value="decisionTree">(Prediction) Decision Tree</option>
        <option value="data1">(Data) Dataset1</option>
        <option value="data2">(Data) Dataset2</option>
        <option value="data3">(Data) Dataset3</option>
        <option value="data4">(Data) Dataset4</option>
      </select>
      <ToggleButton onClick={togglePanel}>{isOpen ? "<" : ">"}</ToggleButton>
    </PanelContainer>
  );
};

export default Panel;
