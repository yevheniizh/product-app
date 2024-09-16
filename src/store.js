import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";

export const useGlobalStore = create(
  subscribeWithSelector((set, get) => ({
    // POI CONTROLS
    controls: {
      skin: 0,
      draggable: false,
      rotateTo: null,
    },
    setSkin: (skin) =>
      set(
        produce((state) => {
          state.controls.skin = skin;
        })
      ),
    setDraggable: () =>
      set(
        produce((state) => {
          state.controls.draggable = true;
        })
      ),
    setRotateTo: (value) =>
      set(
        produce((state) => {
          state.controls.rotateTo = value;
        })
      ),
    resetRotateTo: () =>
      set(
        produce((state) => {
          state.controls.rotateTo = null;
        })
      ),

    // OTHER
    isDebugMode: new URL(window.location.href).searchParams.has("debug"),

    computed: {},
  }))
);
