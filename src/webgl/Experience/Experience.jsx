import React, { Suspense } from "react";
import { Environment } from "@react-three/drei";

import { Poi } from "../Poi/Poi";
import { useControls } from "leva";

export const Experience = () => {
  const { environmentRotationY, ...envProps } = useControls("Environment", {
    environmentRotationY: { value: Math.PI / 6, min: 0, max: Math.PI * 2 },
    environmentIntensity: { value: 0.25, min: 0, max: 1 },
  });

  return (
    <>
      <ambientLight intensity={0.7} color={0xffffff} />
      <Environment preset="studio" {...envProps} environmentRotation={[0, environmentRotationY, 0]} />

      <Suspense fallback={null}>
        <Poi />
      </Suspense>
    </>
  );
};
