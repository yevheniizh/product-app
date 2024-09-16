export default {
  CAMERA: {
    FOV: 30,
    POSITION: [0, 0, 0.25],
    NEAR: 0.01, // NOTE: do not set less than 0.01 or the scene will be distorted
    FAR: 1000,
  },
  SKIN_TRANSITION_DURATION: 2,
  SKINS: [
    ["Pink", 0xe6bcd8],
    ["Green", 0xbfcec2],
    ["Purple", 0xb4b5df],
  ],
  VIEWS: [
    ["Front", Math.PI * 2],
    ["Side", Math.PI / 2],
    ["Back", Math.PI],
  ],
};
