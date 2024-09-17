import React, { Suspense } from "react";

import { Lights } from "../Lights/Lights";
import { DraggablePoiWrapper, Poi } from "../Poi/Poi";
import { Background } from "../Background/Background";

export const Experience = () => {
  return (
    <>
      <Lights />

      <Background />

      <DraggablePoiWrapper>
        <Suspense fallback={null}>
          <Poi />
        </Suspense>
      </DraggablePoiWrapper>
    </>
  );
};
