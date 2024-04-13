import React, { useState } from "react";
import styled from "styled-components";
import { H1Subtitle, H1TitleWithSubtitle, H3Title } from "./Components/titles";
import { Button, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  isMainPanelOpenState,
  isPredictPanelOpenState,
  layerState,
} from "./recoil/atoms";

const PanelContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 10px;
  width: 400px;
  height: calc(99.5% - 50px);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isMainPanelOpen, $isOpen }) => {
    if ($isMainPanelOpen) {
      if ($isOpen) return "translate(100%)";
      else return "translateX(0)";
    } else {
      if ($isOpen) return "translate(0)";
      else return "translateX(-100%)";
    }
  }};
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: ${({ $isOpen }) => ($isOpen ? "-30px" : "-100px")};
  width: ${({ $isOpen }) => ($isOpen ? "30px" : "100px")};
  height: 30px;
  background-color: #fab1a0;
  border: none;
  cursor: pointer;
`;

// const PredictButton = styled.button`
//   color: white;
//   background-color: steelblue;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.5em 1em;
//   border-radius: 5px;
// `;

const inputs = [
  { id: "office_area	", label: "Office Area" },
  { id: "retail_area	", label: "Retail Area" },
  { id: "residential_area", label: "Residential Area" },
  { id: "street_width_min", label: "Street Width Min" },
  { id: "Street_width_max", label: "Street Width Max" },
  { id: "posted_speed", label: "Posted Speed" },
  { id: "betweeness", label: "Betweeness" },
  { id: "distance_from_station", label: "Distance from Station(ft)" },
  { id: "ridership_morning", label: "Ridership Morning" },
  { id: "ridership_midday", label: "Ridership Midday" },
  { id: "ridership_evening", label: "Ridershiop Evening" },
  { id: "ridership_night", label: "Ridership Night" },
  { id: "ridership_late_night", label: "Ridership Late Night" },
];

const InputContainer = styled.div`
  display: flex;
  height: 500px;
  flex-direction: column;
  overflow: scroll;
`;

const PredictPanel = () => {
  // const [selectedAlgorithm, setSelectedAlgorithm] = useState("accessibility");
  const [selectedModel, setSelectedModel] = useState("model1");
  const [, setLayer] = useRecoilState(layerState);
  const [isPredictPanelOpen, setIsPredictPanelOpen] = useRecoilState(
    isPredictPanelOpenState
  );
  const [isMainPanelOpen] = useRecoilState(isMainPanelOpenState);

  const togglePanel = () => {
    setIsPredictPanelOpen(!isPredictPanelOpen);
  };

  const handleModelSelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedModel(selectedValue);
    handleSelect(e);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setLayer(e.target.value);
  };

  return (
    <PanelContainer
      $isOpen={isPredictPanelOpen}
      $isMainPanelOpen={isMainPanelOpen}
    >
      <H1TitleWithSubtitle>Predict Yourself</H1TitleWithSubtitle>
      <H1Subtitle>Try our model with your custom input data</H1Subtitle>
      <H3Title>Model :</H3Title>
      <select value={selectedModel} onChange={handleModelSelect}>
        <option value="model1">Random Forest</option>
        <option value="model2">PCA</option>
        <option value="model3">Support Vector Machine</option>
      </select>
      <hr></hr>
      <InputContainer>
        {inputs.map((input) => (
          <TextField id={input.id} label={input.label} variant="outlined" />
        ))}
      </InputContainer>
      <Button variant="contained">Predict!</Button>
      <ToggleButton $isOpen={isPredictPanelOpen} onClick={togglePanel}>
        {isPredictPanelOpen ? "<" : "Predict Yourself!"}
      </ToggleButton>
    </PanelContainer>
  );
};

export default PredictPanel;
