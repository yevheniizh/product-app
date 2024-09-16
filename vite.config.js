import react from "@vitejs/plugin-react";
import { transformWithEsbuild } from "vite";
import glsl from "vite-plugin-glsl";
import svgr from "vite-plugin-svgr";

export default {
  root: "src/",
  publicDir: "../public/",
  base: "./",
  plugins: [
    // SVG support
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "default",
      },
    }),
    // React support
    react(),

    // Shaders
    glsl(),

    // .js file support as if it was JSX
    {
      name: "load+transform-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;

        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
  ],
  build: {
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
};
