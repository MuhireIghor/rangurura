import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    base:'/',
    server: {
      port: 3000,
      historyApiFallback: true,
    },
    build: {
      rollupOptions: {
        external: ['redux-persist/integration/react'],
        output: {
          entryFileNames: "assets/[name].js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: "assets/[name].[ext]",
      },
      },
    },
    resolve: {
      alias: {
        app: resolve(__dirname, "src", "app"),
        components: resolve(__dirname, "src", "components"),
        hooks: resolve(__dirname, "src", "hooks"),
        assets: resolve(__dirname, "src", "assets"),
        configs: resolve(__dirname, "src", "configs"),
        constants: resolve(__dirname, "src", "constants"),
        utils: resolve(__dirname, "src", "utils"),
        services: resolve(__dirname, "src", "services"),
      },
    },
  };
});
