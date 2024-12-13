import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"~bulma": path.resolve(__dirname, "node_modules/bulma"),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          // Define custom global variables (optional)
          $primary: #a29bfe;
          $link: #81ecec;
          $success: #55efc4;
          $info: #74b9ff;
          $warning: #ffeaa7;
          $danger: #fab1a0;
        `,
			},
		},
	},
});
