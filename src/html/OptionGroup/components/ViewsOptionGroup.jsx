import React from "react";

import constants from "../../../constants.js";
import { useGlobalStore } from "../../../store.js";
import { OptionGroup } from "../OptionGroup.jsx";
import { Option } from "../Option.jsx";
import "./ViewsOptionGroup.css";

export const ViewsOptionGroup = () => {
  const setRotateTo = useGlobalStore((state) => state.setRotateTo);

  return (
    <OptionGroup
      className="views-option-group"
      id="views-option-group"
      onClick={(e) => setRotateTo(parseFloat(e.target.value))}
    >
      {constants.VIEWS.map(([view, angle]) => (
        <Option key={view} id={view} value={angle} name="views-option-group" className="views-option">
          {view}
        </Option>
      ))}
    </OptionGroup>
  );
};
