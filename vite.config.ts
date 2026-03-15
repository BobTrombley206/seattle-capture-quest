import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

const Renderer = vitePrerender.PuppeteerRenderer;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      vitePrerender({
        staticDir: path.resolve(__dirname, "dist"),
        routes: ["/", "/book", "/booking-success", "/booking-canceled"],
        renderer: new Renderer({
          headless: true,
          renderAfterDocumentEvent: "render-event",
        }),
        postProcess(renderedRoute: any) {
          // Ensure trailing-slash structure for Cloudflare Pages
          if (renderedRoute.route !== "/") {
            renderedRoute.outputPath = path.join(
              __dirname,
              "dist",
              renderedRoute.route,
              "index.html"
            );
          }
          return renderedRoute;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
