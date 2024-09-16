import React from "react";
import * as THREE from "three";

import constants from "../../../constants.js";
import { useGlobalStore } from "../../../store.js";
import { OptionGroup } from "../OptionGroup.jsx";
import { Option } from "../Option.jsx";
import "./SkinsOptionGroup.css";

export const SkinsOptionGroup = () => {
  const currentSkin = useGlobalStore((state) => state.controls.skin);
  const setSkin = useGlobalStore((state) => state.setSkin);

  return (
    <OptionGroup
      className="skins-option-group"
      id="skins-option-group"
      onChange={(e) => setSkin(parseInt(e.target.value))}
    >
      {constants.SKINS.map(([skin, color], i) => (
        <Option
          key={skin}
          id={skin}
          value={i}
          name="skins-option-group"
          className="skins-option"
          checked={currentSkin === i}
          rounded
        >
          <div className="skins-option--color" style={{ "--skin-color": new THREE.Color(color).getStyle() }} />
        </Option>
      ))}
    </OptionGroup>
  );
};
