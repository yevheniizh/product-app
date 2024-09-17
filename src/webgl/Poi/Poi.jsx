import React, { useEffect, useRef } from "react";
import constants from "../../constants";
import { usePoi } from "./usePoi";
import { Draggable } from "./Draggable";
import { useGlobalStore } from "../../store";

export const Poi = (props) => {
  const meshRef = useRef();

  const { bitsGeometry, bodyGeometry, bodyMaterial, bitsMaterial } = usePoi(meshRef);

  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={bodyGeometry} material={bodyMaterial} ref={meshRef} />
      <mesh castShadow receiveShadow geometry={bitsGeometry} material={bitsMaterial} />
    </group>
  );
};

export const DraggablePoiWrapper = ({ children }) => {
  const ref = useRef(null);

  const draggable = useGlobalStore((state) => state.controls.draggable);
  const setDraggable = useGlobalStore((state) => state.setDraggable);
  const resetRotateTo = useGlobalStore((state) => state.resetRotateTo);

  // Rotate to
  useEffect(() => {
    const unsubscribe = useGlobalStore.subscribe(
      (state) => state.controls.rotateTo,
      (value) => {
        if (!value) return;
        ref.current.rotateTo({ value, onResolve: resetRotateTo });
      }
    );
    return unsubscribe;
  }, []);

  return (
    <Draggable
      ref={ref}
      ready={draggable}
      onDragReady={setDraggable}
      initialRotationFrom={[0, constants.MAIN_VIEW_INITIAL_ROTATION_Y_FROM, 0]}
      initialRotationTo={[0, constants.MAIN_VIEW_INITIAL_ROTATION_Y_TO, 0]}
    >
      {children}
    </Draggable>
  );
};
