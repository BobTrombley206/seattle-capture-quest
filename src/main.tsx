import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Signal to vite-plugin-prerender that the page is ready to snapshot
document.dispatchEvent(new Event("render-event"));
