import React, { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { a, easings, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useCursor } from "@react-three/drei";
import { degToRad } from "maath/misc";
import * as THREE from "three";
import constants from "../../constants";

export const Draggable = forwardRef(
  ({ children, responsiveness = 5, initialRotationFrom, initialRotationTo, ready, onDragReady }, ref) => {
    const { size } = useThree();
    const euler = useMemo(() => new THREE.Euler(), []); // Actual rotation state
    const [spring, api] = useSpring(() => ({
      // Initial rotation
      from: { rotation: initialRotationFrom },
      to: { rotation: initialRotationTo },
      onChange: ({ value: { rotation } }) => {
        euler.set(...rotation);
      },
      config: { easing: easings.easeInOutExpo, duration: 3000 },
      onResolve: onDragReady,
    }));

    useImperativeHandle(ref, () => ({
      rotateTo: ({ value, onResolve }) => {
        api.start({
          rotation: [0, degToRad(360) * Math.round(euler.y / degToRad(360)) + value, 0],
          config: { duration: 1000 },
          onChange: ({ value: { rotation } }) => {
            euler.set(...rotation);
          },
          onResolve,
        });
      },
    }));

    const [dragging, drag] = useState(false);
    useCursor(dragging, "grabbing", "grab");

    const bind = useGesture({
      onDragStart: () => drag(true),
      onDragEnd: () => drag(false),
      onDrag: ({ delta: [dx, dy] }) => {
        // Ref: https://codesandbox.io/p/sandbox/r3f-drag-rotate-vnjey
        euler.y += (dx / size.width) * responsiveness;
        api.set({ rotation: euler.toArray().slice(0, 3) });
      },
    });

    return (
      <a.group ref={ref} {...(ready && bind())} {...spring} dispose={null}>
        {children}
      </a.group>
    );
  }
);
