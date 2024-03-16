import React, { useState } from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 200px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
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
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PanelContainer isOpen={isOpen}>
      <h2>Traffic-Driven Restaurant Success Prediction</h2>
      <h3>ML Algorithm :</h3>
      <select>
        <option value="knn">K-Nearest Neighbors</option>
        <option value="svm">Support Vector Machine</option>
        <option value="randomForest">Random Forest</option>
        <option value="decisionTree">Decision Tree</option>
      </select>
      <h3>Layers to show :</h3>
      <label>
        <input type="checkbox" />
        🗺️ Google Map Data
        </label><br />
        <label>
        <input type="checkbox" />
        🚗 Traffic Data
        </label><br />
        <label>
        <input type="checkbox" />
        🚇 Subway Stations
      </label>

      <ToggleButton onClick={togglePanel}>{isOpen ? '>' : '<'}</ToggleButton>
    </PanelContainer>
  );
};

export default Panel;