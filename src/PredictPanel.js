import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { H1Subtitle, H1TitleWithSubtitle, H3Title } from "./Components/titles";
import { Button, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  isMainPanelOpenState,
  isPredictPanelOpenState,
  layerState,
  buildingState,
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

const inputs = [
  { id: "retail_area", label: "Retail Area" },
  { id: "retail_within_450ft", label: "Retail within 450ft" },
  { id: "residential_area", label: "Residential Area" },
  { id: "residential_within_450ft", label: "Residential within 450ft" },
  { id: "office_within_450ft", label: "Office within 450ft" },
  { id: "distance_from_station(ft)", label: "Distance to station (ft)" },
  { id: "distance_to_park", label: "Distance to school" },
  { id: "distance_to_school", label: "Distance to park" },
  { id: "idw_atvc_mean", label: "Estimated Vehicle Traffic-1" },
  { id: "idw_aadt_mean", label: "Estimated Vehicle Traffic-2" },
  { id: "food_100", label: "Restaurant Count within 100m" },
  { id: "food_400", label: "Restaurant Count within 400m" },
  { id: "food_800", label: "Restaurant Count within 800m" },
  { id: "food_1000", label: "Restaurant Count within 1000m" },
];

const InputContainer = styled.div`
  display: flex;
  margin: 15px 0;
  padding-top: 10px;
  flex-direction: column;
  height: 600px;
  overflow-y: scroll;

  & .MuiTextField-root {
    margin: 10px 0;
  }
`;

const PredictPanel = () => {
  const [selectedModel, setSelectedModel] = useState("model1");
  const [, setLayer] = useRecoilState(layerState);
  const [isPredictPanelOpen, setIsPredictPanelOpen] = useRecoilState(
    isPredictPanelOpenState
  );
  const [isMainPanelOpen] = useRecoilState(isMainPanelOpenState);
  const [building] = useRecoilState(buildingState);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (building === null) {
      return;
    }
    const { properties } = building;
    setInputValues(properties);
  }, [building]);

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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: value,
    }));
  };

  const predict = () => {
    const {
      retail_area,
      retail_within_450ft,
      residential_area,
      residential_within_450ft,
      office_within_450ft,
      distance_to_park,
      distance_to_school,
      food_100,
      food_400,
      food_800,
      food_1000,
      idw_atvc_mean,
      idw_aadt_mean,
    } = inputValues;
    const xData = {
      dist_park: distance_to_park,
      retail_450: retail_within_450ft,
      retail_area,
      dist_station: inputValues["distance_from_station(ft)"],
      residential_450: residential_within_450ft,
      idw_atvc_mean,
      food_1000,
      food_800,
      idw_aadt_mean,
      residential_area,
      dist_school: distance_to_school,
      food_400,
      office_450: office_within_450ft,
      food_100,
    };
    axios
      .get("https://teamgigo-dbd388857a8d.herokuapp.com/predict", {
        params: xData,
      })
      .then((response) => {
        console.log("Prediction", response.data);
      })
      .catch((error) => {
        console.error("Error fetching prediction", error);
      });
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
        {inputs.map((input, i) => (
          <TextField
            key={`input-${i}`}
            id={input.id}
            label={input.label}
            variant="outlined"
            value={inputValues[input.id] || 0}
            onChange={handleInputChange}
          />
        ))}
      </InputContainer>
      <Button variant="contained" onClick={predict}>
        Predict!
      </Button>
      <ToggleButton $isOpen={isPredictPanelOpen} onClick={togglePanel}>
        {isPredictPanelOpen ? "<" : "Predict Yourself!"}
      </ToggleButton>
    </PanelContainer>
  );
};

export default PredictPanel;
