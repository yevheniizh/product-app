import { useRef, forwardRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";
import mergeRefs from "merge-refs";

import { useGlobalStore } from "../../store";
import constants from "../../constants";
import "./BackgroundMaterial";

export const Background = forwardRef((_, ref) => {
  const bgRef = useRef();
  const size = useThree((state) => state.size);
  const skin = useGlobalStore((state) => state.controls.skin);
  useGlobalStore.subscribe(
    (state) => state.controls.skin,
    (skin) => {
      const material = bgRef.current.material;
      material.uniforms.uColor2.value = new THREE.Color(constants.SKINS[skin][1]);
      gsap.to(material.uniforms.uTransition, {
        value: 1,
        duration: constants.SKIN_TRANSITION_DURATION,
        onComplete: () => {
          material.uniforms.uColor1.value = material.uniforms.uColor2.value;
          material.uniforms.uTransition.value = 0;
        },
      });
    }
  );

  useFrame(({ clock }) => {
    bgRef.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  const materialProps = useMemo(
    () => ({
      uColor1: new THREE.Color(constants.SKINS[skin][1]),
      uColor2: new THREE.Color(constants.SKINS[skin][1]),
      uTransition: 0,
      uResolution: new THREE.Vector3(size.width, size.height, 1),
    }),
    []
  );

  return (
    <mesh ref={mergeRefs(bgRef, ref)} receiveShadow castShadow position={[0, 0, -1000]}>
      <planeGeometry args={[size.width, size.height]} />
      <backgroundMaterial {...materialProps} />
    </mesh>
  );
});
