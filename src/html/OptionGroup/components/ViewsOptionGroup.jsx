import React, { Suspense } from "react";

import constants from "../../../constants.js";
import { useGlobalStore } from "../../../store.js";
import { OptionGroup } from "../OptionGroup.jsx";
import { Option } from "../Option.jsx";
import { Poi } from "../../../webgl/Poi/Poi.jsx";
import { View } from "@react-three/drei";
import { Lights } from "../../../webgl/Lights/Lights.jsx";
import "./ViewsOptionGroup.css";

export const ViewsOptionGroup = () => {
  const setRotateTo = useGlobalStore((state) => state.setRotateTo);

  return (
    <OptionGroup
      className="views-option-group"
      id="views-option-group"
      onClick={(e) => setRotateTo(parseFloat(e.target.value))}
    >
      {constants.PRESET_VIEWS.map(([view, angle]) => (
        <Option key={view} id={view} value={angle} name="views-option-group" className="views-option">
          <View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            <Suspense fallback={null}>
              <Poi rotation={[0, angle, 0]} />
            </Suspense>
            <Lights />
          </View>
        </Option>
      ))}
    </OptionGroup>
  );
};
