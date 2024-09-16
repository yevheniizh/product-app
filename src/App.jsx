import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { Leva } from "leva";

import constants from "./constants.js";
import { useGlobalStore } from "./store.js";
import { Layout } from "./html/Layout/Layout.jsx";
import { Experience } from "./webgl/Experience/Experience.jsx";
import { SkinsOptionGroup } from "./html/OptionGroup/components/SkinsOptionGroup.jsx";
import { ViewsOptionGroup } from "./html/OptionGroup/components/ViewsOptionGroup.jsx";
import { HtmlContainer } from "./html/HtmlContainer/HtmlContainer.jsx";

export function App() {
  const ref = useRef();
  const isDebugMode = useGlobalStore((state) => state.isDebugMode);

  return (
    <Layout ref={ref}>
      <Canvas
        shadows
        eventSource={ref}
        gl={{ antialias: true }}
        camera={{
          position: constants.CAMERA.POSITION,
          fov: constants.CAMERA.FOV,
          far: constants.CAMERA.FAR,
          near: constants.CAMERA.NEAR,
        }}
      >
        {/* NOTE: Workaround how to hide all the panels without an error */}
        {!isDebugMode && <Leva hidden={!isDebugMode} />}
        {isDebugMode && <Stats />}
        <Experience />
      </Canvas>

      <HtmlContainer>
        <ViewsOptionGroup />
        <SkinsOptionGroup />
      </HtmlContainer>
    </Layout>
  );
}
