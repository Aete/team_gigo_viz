import { atom } from "recoil";

export const buildingState = atom({
  key: "building",
  default: null,
});

export const layerState = atom({
  key: "layer",
  default: "accessibility",
});

export const subMenuState = atom({
  key: "subMenu",
  default: "overview",
});
