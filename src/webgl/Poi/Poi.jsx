import { useRef, forwardRef, useMemo } from "react";
import { useGLTF, useKTX2, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { gsap } from "gsap";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import mergeRefs from "merge-refs";

import { Draggable } from "./Draggable";
import { useGlobalStore } from "../../store";
import constants from "../../constants";
import { Background } from "../Background/Background";

export const Poi = forwardRef((_, ref) => {
  const globalRef = useRef();
  const meshRef = useRef();
  useControls("GltfModel", {
    metalness: { value: 0.7, min: 0, max: 1, onChange: (value) => (meshRef.current.material.metalness = value) },
    roughness: { value: 3.5, min: 0, max: 10, onChange: (value) => (meshRef.current.material.roughness = value) },
    aoIntensity: {
      value: 1,
      min: 0,
      max: 1,
      onChange: (value) => (meshRef.current.material.aoMapIntensity = value),
    },
  });

  /** NODES */
  const { nodes } = useGLTF("/model.glb", true);
  const bodyGeometry = BufferGeometryUtils.mergeGeometries(
    Object.values(nodes)
      .filter((object) => object.isMesh && !object.name.includes("Bits"))
      .map((node) => node.geometry)
  );
  const bitsGeometry = Object.values(nodes).find((object) => object.isMesh && object.name.includes("Bits"))?.geometry;

  /** TEXTURES */
  const textures = useKTX2([
    "/textures/512/Body_Pink_D.png.ktx2",
    "/textures/512/Body_Green_D.png.ktx2",
    "/textures/512/Body_Purple_D.png.ktx2",
  ]);
  const [bitsOrmTexture, bodyOrmTexture] = useTexture(
    ["/textures/Bits_ORM.png", "/textures/Body_ORM.png"],
    (textures) => {
      textures.forEach((texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
      });
    }
  );

  useGlobalStore.subscribe(
    (state) => state.controls.skin,
    (skin) => {
      const shader = meshRef.current.material.userData.shader;
      shader.uniforms.uTexture2.value = textures[skin];
      gsap.to(shader.uniforms.uTransition, {
        value: 1,
        duration: constants.SKIN_TRANSITION_DURATION,
        onComplete: () => {
          shader.uniforms.uTexture1.value = shader.uniforms.uTexture2.value;
          shader.uniforms.uTransition.value = 0;
        },
      });
    }
  );

  const draggable = useGlobalStore((state) => state.controls.draggable);
  const setDraggable = useGlobalStore((state) => state.setDraggable);
  const resetRotateTo = useGlobalStore((state) => state.resetRotateTo);

  // Rotate to
  useGlobalStore.subscribe(
    (state) => state.controls.rotateTo,
    (value) => {
      if (!value) return;
      globalRef.current.rotateTo({ value, onResolve: resetRotateTo });
    }
  );

  const bodyMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      aoMap: bodyOrmTexture,
      metalnessMap: bodyOrmTexture,
      roughnessMap: bodyOrmTexture,
      metalness: 0.7,
      roughness: 3.5,
      aoMapIntensity: 0.8,
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTexture1 = { value: textures[0] };
      shader.uniforms.uTexture2 = { value: textures[0] };
      shader.uniforms.uTransition = { value: 0 };

      shader.fragmentShader = `
        uniform sampler2D uTexture1;
        uniform sampler2D uTexture2;
        uniform float uTransition;
        ${shader.fragmentShader}
        `.replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `vec4 diffuseColor = mix(texture2D(uTexture1, vUv), texture2D(uTexture2, vUv), uTransition);`
      );

      material.userData.shader = shader;
    };
    material.defines = { USE_UV: "" };

    return material;
  }, []);

  const bitsMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: bitsOrmTexture,
      aoMap: bitsOrmTexture,
      metalnessMap: bitsOrmTexture,
      roughnessMap: bitsOrmTexture,
    });

    return material;
  }, []);

  return (
    <>
      <Draggable ref={mergeRefs(globalRef, ref)} ready={draggable} onDragReady={setDraggable}>
        <mesh castShadow receiveShadow geometry={bodyGeometry} material={bodyMaterial} ref={meshRef} />
        <mesh castShadow receiveShadow geometry={bitsGeometry} material={bitsMaterial} />
      </Draggable>

      <Background />
    </>
  );
});

useGLTF.preload("/model.glb");
