import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const BackgroundMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: null,
    uColor2: null,
    uTransition: 0,
    uResolution: new THREE.Vector3(),
  },
  `
    void main()	{
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
    `,
  `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uTransition;

    void main() {
        gl_FragColor = vec4(mix(uColor1, uColor2, uTransition), 1.0);
    }
    `
);

extend({ BackgroundMaterial });
