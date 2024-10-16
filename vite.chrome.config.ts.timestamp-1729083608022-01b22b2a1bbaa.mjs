// vite.chrome.config.ts
import { crx } from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.25/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import { defineConfig as defineConfig2 } from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/vite@5.4.8_@types+node@22.7.4_sass@1.79.4_terser@5.34.1/node_modules/vite/dist/node/index.js";

// manifest.chrome.config.ts
import { defineManifest } from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.25/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.config.ts
import { env } from "node:process";

// package.json
var package_default = {
  name: "purifyr-extension",
  displayName: "Purifyr",
  type: "module",
  version: "0.0.1",
  private: true,
  description: "Extension for awareness, prevention and support against harmful online content.",
  repository: {
    type: "git",
    url: "https://github.com/purifyr/purifyr-extension"
  },
  scripts: {
    build: "npm run build:chrome && npm run build:firefox",
    "build:chrome": "vite build -c vite.chrome.config.ts",
    "build:firefox": "vite build -c vite.firefox.config.ts",
    dev: 'concurrently "npm run dev:chrome" "npm run dev:firefox"',
    "dev:chrome": "vite -c vite.chrome.config.ts",
    "dev:firefox": "vite build --mode development --watch -c vite.firefox.config.ts",
    format: "prettier --write .",
    lint: "eslint . --fix",
    "lint:manifest": "web-ext lint --pretty",
    preview: "vite preview",
    typecheck: "vue-tsc --noEmit"
  },
  dependencies: {
    marked: "^14.1.2",
    pinia: "^2.2.4",
    "pinia-plugin-persistedstate": "^4.1.1",
    vue: "^3.5.11",
    "vue-router": "^4.4.5",
    "webextension-polyfill": "^0.12.0"
  },
  devDependencies: {
    "@antfu/eslint-config": "^3.7.3",
    "@crxjs/vite-plugin": "^2.0.0-beta.25",
    "@iconify-json/ic": "^1.2.1",
    "@iconify-json/mdi": "^1.2.0",
    "@tailwindcss/forms": "^0.5.9",
    "@tailwindcss/typography": "^0.5.15",
    "@types/eslint": "^9.6.1",
    "@types/node": "^22.7.4",
    "@types/webextension-polyfill": "^0.12.1",
    "@vitejs/plugin-vue": "^5.1.4",
    "@vue/compiler-sfc": "^3.5.11",
    "@vueuse/core": "^11.1.0",
    autoprefixer: "^10.4.20",
    "chrome-types": "^0.1.307",
    concurrently: "^9.0.1",
    "cross-env": "^7.0.3",
    daisyui: "^4.12.12",
    eslint: "^9.12.0",
    globals: "^15.10.0",
    postcss: "^8.4.47",
    prettier: "^3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.8",
    sass: "^1.79.4",
    tailwindcss: "^3.4.13",
    terser: "^5.34.1",
    typescript: "^5.6.2",
    "unplugin-auto-import": "^0.18.3",
    "unplugin-icons": "^0.19.3",
    "unplugin-vue-components": "^0.27.4",
    "unplugin-vue-router": "^0.10.8",
    vite: "^5.4.8",
    "vite-plugin-pages": "^0.32.3",
    "vite-plugin-vue-devtools": "^7.4.6",
    "vue-tsc": "^2.1.6",
    "web-ext": "^8.3.0",
    "webext-bridge": "^6.0.1"
  },
  pnpm: {
    overrides: {},
    peerDependencyRules: {
      allowAny: [],
      allowedDeprecatedVersions: {
        "sourcemap-codec": "1.4.8"
      },
      allowedVersions: {},
      ignoreMissing: []
    }
  },
  overrides: {
    "@crxjs/vite-plugin": "$@crxjs/vite-plugin"
  }
};

// manifest.config.ts
var { version, name, description, displayName } = package_default;
var [major, minor, patch, label = "0"] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);
var manifest_config_default = {
  name: env.mode === "staging" ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: '',
  action: {
    default_popup: "src/popup/index.html"
  },
  background: {
    service_worker: "src/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      all_frames: true,
      js: ["src/content-script/index.ts"],
      matches: ["*://*/*"],
      run_at: "document_end"
    }
  ],
  // Full options page
  options_page: "src/options/index.html",
  // Embedded options page
  // options_ui: {
  //   page: 'src/options/index.html',
  // },
  offline_enabled: true,
  // host_permissions: [],
  permissions: ["storage", "tabs", "background", "notifications"],
  web_accessible_resources: [
    {
      matches: ["*://*/*"],
      resources: ["src/content-script/index.ts"]
    },
    {
      matches: ["*://*/*"],
      resources: ["src/content-script/iframe/index.html"]
    }
  ],
  icons: {
    16: "src/assets/security.png",
    24: "src/assets/security.png",
    32: "src/assets/security.png",
    128: "src/assets/security.png"
  }
};

// manifest.chrome.config.ts
var manifest_chrome_config_default = defineManifest((_env) => ({
  ...manifest_config_default
}));

// vite.config.ts
import { dirname, relative } from "node:path";
import { fileURLToPath, URL } from "node:url";
import vue from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.8_@types+node@22.7.4_sass@1.79.4_terser@5.34.1__vue@3.5.11_typescript@5.6.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/unplugin-auto-import@0.18.3_@nuxt+kit@3.13.2_rollup@4.21.0_webpack-sources@3.2.3__@vueuse+cor_quawcalorjfkr7tb6xl4elg3oa/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.11_vue-template-compiler@2.7.14/node_modules/unplugin-icons/dist/resolver.js";
import Icons from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.11_vue-template-compiler@2.7.14/node_modules/unplugin-icons/dist/vite.js";
import Components from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.8_@nuxt+kit@3.13.2_rollup@4.21.0_webpack-so_4celoyohremuos3qwhvmxqrspu/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/vite@5.4.8_@types+node@22.7.4_sass@1.79.4_terser@5.34.1/node_modules/vite/dist/node/index.js";
import Pages from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/vite-plugin-pages@0.32.3_@vue+compiler-sfc@3.5.11_vite@5.4.8_@types+node@22.7.4_sass@1.79.4_t_36lgw3n7wrhkbnz2vqnu44pq2a/node_modules/vite-plugin-pages/dist/index.js";
import vueDevTools from "file:///home/mesah/Projets/workshop/purifyr-extension/node_modules/.pnpm/vite-plugin-vue-devtools@7.4.6_@nuxt+kit@3.13.2_rollup@4.21.0_webpack-sources@3.2.3__rollup@4_aidkfzcocurcvja2pplyaf2nku/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";

// define.config.ts
import { spawnSync } from "node:child_process";
import fs from "node:fs";
var changelog = fs.readFileSync("./CHANGELOG.md", "utf-8");
var gitCommit = spawnSync("git", ["rev-parse", "--short", "HEAD"]).stdout.toString().trim();
var jsn = (value) => JSON.stringify(value);
var defineViteConfig = {
  __VERSION__: jsn(package_default.version),
  __NAME__: jsn(package_default.name),
  __DISPLAY_NAME__: jsn(package_default.displayName),
  __CHANGELOG__: jsn(changelog),
  __GIT_COMMIT__: jsn(gitCommit),
  __GITHUB_URL__: jsn(package_default.repository.url),
  // Set the HTML title for all pages from package.json so you can use %HTML_TITLE% in your HTML files.
  "import.meta.env.HTML_TITLE": jsn(package_default.displayName)
};

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///home/mesah/Projets/workshop/purifyr-extension/vite.config.ts";
var vite_config_default = defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "~": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      src: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@assets": fileURLToPath(new URL("src/assets", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern"
      }
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
    Pages({
      dirs: [
        {
          dir: "src/pages",
          baseRoute: "common"
        },
        {
          dir: "src/setup/pages",
          baseRoute: "setup"
        },
        {
          dir: "src/popup/pages",
          baseRoute: "popup"
        },
        {
          dir: "src/options/pages",
          baseRoute: "options"
        },
        {
          dir: "src/content-script/iframe/pages",
          baseRoute: "iframe"
        }
      ],
      extendRoute(route, parent) {
        if (route.path === "/common/login" || route.path === "/common/register") {
          return route;
        }
        return {
          ...route,
          meta: {
            ...route.meta,
            // Préserve les métadonnées existantes
            auth: true
            // Ajoute auth à true pour indiquer qu'une authentification est requise
          }
        };
      }
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        {
          "webextension-polyfill": [["*", "browser"]]
        }
      ],
      dts: "src/types/auto-imports.d.ts",
      dirs: ["src/composables/", "src/stores/", "src/utils/"],
      eslintrc: {
        enabled: true,
        filepath: "src/types/.eslintrc-auto-import.json"
      }
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ["src/components", "src/popup/layout/"],
      // generate `components.d.ts` for ts support with Volar
      dts: "src/types/components.d.ts",
      resolvers: [
        // auto import icons
        IconsResolver()
      ]
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      compiler: "vue3",
      scale: 1.5
    }),
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        const assetsPath = relative(dirname(path), "/assets").replace(
          /\\/g,
          "/"
        );
        return html.replace(/"\/assets\//g, `"${assetsPath}/`);
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        iframe: "src/content-script/iframe/index.html",
        popup: "src/popup/index.html",
        setup: "src/setup/index.html",
        options: "src/options/index.html"
      }
    }
  },
  optimizeDeps: {
    include: ["vue", "@vueuse/core", "webextension-polyfill"],
    exclude: ["vue-demi"]
  },
  assetsInclude: ["src/assets/*/**"],
  define: defineViteConfig
});

// vite.chrome.config.ts
vite_config_default.plugins?.push(
  crx({
    manifest: manifest_chrome_config_default,
    browser: "chrome",
    contentScripts: {
      injectCss: true
    }
  })
);
if (!vite_config_default.build) {
  vite_config_default.build = {};
}
vite_config_default.build.outDir = "dist/chrome";
var vite_chrome_config_default = defineConfig2({
  ...vite_config_default
});
export {
  vite_chrome_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jaHJvbWUuY29uZmlnLnRzIiwgIm1hbmlmZXN0LmNocm9tZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiIsICJ2aXRlLmNvbmZpZy50cyIsICJkZWZpbmUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWVzYWgvUHJvamV0cy93b3Jrc2hvcC9wdXJpZnlyLWV4dGVuc2lvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWVzYWgvUHJvamV0cy93b3Jrc2hvcC9wdXJpZnlyLWV4dGVuc2lvbi92aXRlLmNocm9tZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWVzYWgvUHJvamV0cy93b3Jrc2hvcC9wdXJpZnlyLWV4dGVuc2lvbi92aXRlLmNocm9tZS5jb25maWcudHNcIjtpbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuY2hyb21lLmNvbmZpZydcbmltcG9ydCBWaXRlQ29uZmlnIGZyb20gJy4vdml0ZS5jb25maWcnXG5cblZpdGVDb25maWcucGx1Z2lucz8ucHVzaChcbiAgY3J4KHtcbiAgICBtYW5pZmVzdCxcbiAgICBicm93c2VyOiAnY2hyb21lJyxcbiAgICBjb250ZW50U2NyaXB0czoge1xuICAgICAgaW5qZWN0Q3NzOiB0cnVlLFxuICAgIH0sXG4gIH0pXG4pXG5cbmlmICghVml0ZUNvbmZpZy5idWlsZCkge1xuICBWaXRlQ29uZmlnLmJ1aWxkID0ge31cbn1cblxuVml0ZUNvbmZpZy5idWlsZC5vdXREaXIgPSAnZGlzdC9jaHJvbWUnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAuLi5WaXRlQ29uZmlnLFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWVzYWgvUHJvamV0cy93b3Jrc2hvcC9wdXJpZnlyLWV4dGVuc2lvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWVzYWgvUHJvamV0cy93b3Jrc2hvcC9wdXJpZnlyLWV4dGVuc2lvbi9tYW5pZmVzdC5jaHJvbWUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21lc2FoL1Byb2pldHMvd29ya3Nob3AvcHVyaWZ5ci1leHRlbnNpb24vbWFuaWZlc3QuY2hyb21lLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZU1hbmlmZXN0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IE1hbmlmZXN0Q29uZmlnIGZyb20gJy4vbWFuaWZlc3QuY29uZmlnJ1xuXG4vLyBAdHMtZXhwZWN0LWVycm9yIE1hbmlmZXN0Q29uZmlnIHByb3ZpZGVzIGFsbCByZXF1aXJlZCBmaWVsZHNcbmV4cG9ydCBkZWZhdWx0IGRlZmluZU1hbmlmZXN0KChfZW52KSA9PiAoe1xuICAuLi5NYW5pZmVzdENvbmZpZyxcbn0pKVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9tZXNhaC9Qcm9qZXRzL3dvcmtzaG9wL3B1cmlmeXItZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9tZXNhaC9Qcm9qZXRzL3dvcmtzaG9wL3B1cmlmeXItZXh0ZW5zaW9uL21hbmlmZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9tZXNhaC9Qcm9qZXRzL3dvcmtzaG9wL3B1cmlmeXItZXh0ZW5zaW9uL21hbmlmZXN0LmNvbmZpZy50c1wiO2ltcG9ydCB7IGVudiB9IGZyb20gJ25vZGU6cHJvY2VzcydcbmltcG9ydCB0eXBlIHsgTWFuaWZlc3RWM0V4cG9ydCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuY29uc3QgeyB2ZXJzaW9uLCBuYW1lLCBkZXNjcmlwdGlvbiwgZGlzcGxheU5hbWUgfSA9IHBhY2thZ2VKc29uXG4vLyBDb252ZXJ0IGZyb20gU2VtdmVyIChleGFtcGxlOiAwLjEuMC1iZXRhNilcbmNvbnN0IFttYWpvciwgbWlub3IsIHBhdGNoLCBsYWJlbCA9ICcwJ10gPSB2ZXJzaW9uXG4gIC8vIGNhbiBvbmx5IGNvbnRhaW4gZGlnaXRzLCBkb3RzLCBvciBkYXNoXG4gIC5yZXBsYWNlKC9bXlxcZC4tXSsvZywgJycpXG4gIC8vIHNwbGl0IGludG8gdmVyc2lvbiBwYXJ0c1xuICAuc3BsaXQoL1suLV0vKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IGVudi5tb2RlID09PSAnc3RhZ2luZycgPyBgW0lOVEVSTkFMXSAke25hbWV9YCA6IGRpc3BsYXlOYW1lIHx8IG5hbWUsXG4gIGRlc2NyaXB0aW9uLFxuICAvLyB1cCB0byBmb3VyIG51bWJlcnMgc2VwYXJhdGVkIGJ5IGRvdHNcbiAgdmVyc2lvbjogYCR7bWFqb3J9LiR7bWlub3J9LiR7cGF0Y2h9LiR7bGFiZWx9YCxcbiAgLy8gc2VtdmVyIGlzIE9LIGluIFwidmVyc2lvbl9uYW1lXCJcbiAgdmVyc2lvbl9uYW1lOiB2ZXJzaW9uLFxuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxuICAvLyBrZXk6ICcnLFxuICBhY3Rpb246IHtcbiAgICBkZWZhdWx0X3BvcHVwOiAnc3JjL3BvcHVwL2luZGV4Lmh0bWwnLFxuICB9LFxuICBiYWNrZ3JvdW5kOiB7XG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycsXG4gICAgdHlwZTogJ21vZHVsZScsXG4gIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIGFsbF9mcmFtZXM6IHRydWUsXG4gICAgICBqczogWydzcmMvY29udGVudC1zY3JpcHQvaW5kZXgudHMnXSxcbiAgICAgIG1hdGNoZXM6IFsnKjovLyovKiddLFxuICAgICAgcnVuX2F0OiAnZG9jdW1lbnRfZW5kJyxcbiAgICB9LFxuICBdLFxuICAvLyBGdWxsIG9wdGlvbnMgcGFnZVxuICBvcHRpb25zX3BhZ2U6ICdzcmMvb3B0aW9ucy9pbmRleC5odG1sJyxcbiAgLy8gRW1iZWRkZWQgb3B0aW9ucyBwYWdlXG4gIC8vIG9wdGlvbnNfdWk6IHtcbiAgLy8gICBwYWdlOiAnc3JjL29wdGlvbnMvaW5kZXguaHRtbCcsXG4gIC8vIH0sXG4gIG9mZmxpbmVfZW5hYmxlZDogdHJ1ZSxcbiAgLy8gaG9zdF9wZXJtaXNzaW9uczogW10sXG4gIHBlcm1pc3Npb25zOiBbJ3N0b3JhZ2UnLCAndGFicycsICdiYWNrZ3JvdW5kJywgJ25vdGlmaWNhdGlvbnMnXSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgbWF0Y2hlczogWycqOi8vKi8qJ10sXG4gICAgICByZXNvdXJjZXM6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L2luZGV4LnRzJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbJyo6Ly8qLyonXSxcbiAgICAgIHJlc291cmNlczogWydzcmMvY29udGVudC1zY3JpcHQvaWZyYW1lL2luZGV4Lmh0bWwnXSxcbiAgICB9LFxuICBdLFxuICBpY29uczoge1xuICAgIDE2OiAnc3JjL2Fzc2V0cy9zZWN1cml0eS5wbmcnLFxuICAgIDI0OiAnc3JjL2Fzc2V0cy9zZWN1cml0eS5wbmcnLFxuICAgIDMyOiAnc3JjL2Fzc2V0cy9zZWN1cml0eS5wbmcnLFxuICAgIDEyODogJ3NyYy9hc3NldHMvc2VjdXJpdHkucG5nJyxcbiAgfSxcbn0gYXMgTWFuaWZlc3RWM0V4cG9ydFxuIiwgIntcbiAgXCJuYW1lXCI6IFwicHVyaWZ5ci1leHRlbnNpb25cIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIlB1cmlmeXJcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiRXh0ZW5zaW9uIGZvciBhd2FyZW5lc3MsIHByZXZlbnRpb24gYW5kIHN1cHBvcnQgYWdhaW5zdCBoYXJtZnVsIG9ubGluZSBjb250ZW50LlwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3B1cmlmeXIvcHVyaWZ5ci1leHRlbnNpb25cIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJucG0gcnVuIGJ1aWxkOmNocm9tZSAmJiBucG0gcnVuIGJ1aWxkOmZpcmVmb3hcIixcbiAgICBcImJ1aWxkOmNocm9tZVwiOiBcInZpdGUgYnVpbGQgLWMgdml0ZS5jaHJvbWUuY29uZmlnLnRzXCIsXG4gICAgXCJidWlsZDpmaXJlZm94XCI6IFwidml0ZSBidWlsZCAtYyB2aXRlLmZpcmVmb3guY29uZmlnLnRzXCIsXG4gICAgXCJkZXZcIjogXCJjb25jdXJyZW50bHkgXFxcIm5wbSBydW4gZGV2OmNocm9tZVxcXCIgXFxcIm5wbSBydW4gZGV2OmZpcmVmb3hcXFwiXCIsXG4gICAgXCJkZXY6Y2hyb21lXCI6IFwidml0ZSAtYyB2aXRlLmNocm9tZS5jb25maWcudHNcIixcbiAgICBcImRldjpmaXJlZm94XCI6IFwidml0ZSBidWlsZCAtLW1vZGUgZGV2ZWxvcG1lbnQgLS13YXRjaCAtYyB2aXRlLmZpcmVmb3guY29uZmlnLnRzXCIsXG4gICAgXCJmb3JtYXRcIjogXCJwcmV0dGllciAtLXdyaXRlIC5cIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWZpeFwiLFxuICAgIFwibGludDptYW5pZmVzdFwiOiBcIndlYi1leHQgbGludCAtLXByZXR0eVwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwidHlwZWNoZWNrXCI6IFwidnVlLXRzYyAtLW5vRW1pdFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIm1hcmtlZFwiOiBcIl4xNC4xLjJcIixcbiAgICBcInBpbmlhXCI6IFwiXjIuMi40XCIsXG4gICAgXCJwaW5pYS1wbHVnaW4tcGVyc2lzdGVkc3RhdGVcIjogXCJeNC4xLjFcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjUuMTFcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC40LjVcIixcbiAgICBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEyLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYW50ZnUvZXNsaW50LWNvbmZpZ1wiOiBcIl4zLjcuM1wiLFxuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjIuMC4wLWJldGEuMjVcIixcbiAgICBcIkBpY29uaWZ5LWpzb24vaWNcIjogXCJeMS4yLjFcIixcbiAgICBcIkBpY29uaWZ5LWpzb24vbWRpXCI6IFwiXjEuMi4wXCIsXG4gICAgXCJAdGFpbHdpbmRjc3MvZm9ybXNcIjogXCJeMC41LjlcIixcbiAgICBcIkB0YWlsd2luZGNzcy90eXBvZ3JhcGh5XCI6IFwiXjAuNS4xNVwiLFxuICAgIFwiQHR5cGVzL2VzbGludFwiOiBcIl45LjYuMVwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjIuNy40XCIsXG4gICAgXCJAdHlwZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTIuMVwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMS40XCIsXG4gICAgXCJAdnVlL2NvbXBpbGVyLXNmY1wiOiBcIl4zLjUuMTFcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMS4xLjBcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjIwXCIsXG4gICAgXCJjaHJvbWUtdHlwZXNcIjogXCJeMC4xLjMwN1wiLFxuICAgIFwiY29uY3VycmVudGx5XCI6IFwiXjkuMC4xXCIsXG4gICAgXCJjcm9zcy1lbnZcIjogXCJeNy4wLjNcIixcbiAgICBcImRhaXN5dWlcIjogXCJeNC4xMi4xMlwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjkuMTIuMFwiLFxuICAgIFwiZ2xvYmFsc1wiOiBcIl4xNS4xMC4wXCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC40N1wiLFxuICAgIFwicHJldHRpZXJcIjogXCJeMy4zLjNcIixcbiAgICBcInByZXR0aWVyLXBsdWdpbi10YWlsd2luZGNzc1wiOiBcIl4wLjYuOFwiLFxuICAgIFwic2Fzc1wiOiBcIl4xLjc5LjRcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4xM1wiLFxuICAgIFwidGVyc2VyXCI6IFwiXjUuMzQuMVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjYuMlwiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xOC4zXCIsXG4gICAgXCJ1bnBsdWdpbi1pY29uc1wiOiBcIl4wLjE5LjNcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjcuNFwiLFxuICAgIFwidW5wbHVnaW4tdnVlLXJvdXRlclwiOiBcIl4wLjEwLjhcIixcbiAgICBcInZpdGVcIjogXCJeNS40LjhcIixcbiAgICBcInZpdGUtcGx1Z2luLXBhZ2VzXCI6IFwiXjAuMzIuM1wiLFxuICAgIFwidml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzXCI6IFwiXjcuNC42XCIsXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjIuMS42XCIsXG4gICAgXCJ3ZWItZXh0XCI6IFwiXjguMy4wXCIsXG4gICAgXCJ3ZWJleHQtYnJpZGdlXCI6IFwiXjYuMC4xXCJcbiAgfSxcbiAgXCJwbnBtXCI6IHtcbiAgICBcIm92ZXJyaWRlc1wiOiB7fSxcbiAgICBcInBlZXJEZXBlbmRlbmN5UnVsZXNcIjoge1xuICAgICAgXCJhbGxvd0FueVwiOiBbXSxcbiAgICAgIFwiYWxsb3dlZERlcHJlY2F0ZWRWZXJzaW9uc1wiOiB7XG4gICAgICAgIFwic291cmNlbWFwLWNvZGVjXCI6IFwiMS40LjhcIlxuICAgICAgfSxcbiAgICAgIFwiYWxsb3dlZFZlcnNpb25zXCI6IHt9LFxuICAgICAgXCJpZ25vcmVNaXNzaW5nXCI6IFtdXG4gICAgfVxuICB9LFxuICBcIm92ZXJyaWRlc1wiOiB7XG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCIkQGNyeGpzL3ZpdGUtcGx1Z2luXCJcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9tZXNhaC9Qcm9qZXRzL3dvcmtzaG9wL3B1cmlmeXItZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9tZXNhaC9Qcm9qZXRzL3dvcmtzaG9wL3B1cmlmeXItZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21lc2FoL1Byb2pldHMvd29ya3Nob3AvcHVyaWZ5ci1leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkaXJuYW1lLCByZWxhdGl2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCB7IGRlZmluZVZpdGVDb25maWcgYXMgZGVmaW5lIH0gZnJvbSAnLi9kZWZpbmUuY29uZmlnJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNTE3MyxcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgIGhtcjoge1xuICAgICAgcG9ydDogNTE3MyxcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ34nOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICBzcmM6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICdAYXNzZXRzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCdzcmMvYXNzZXRzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhcGk6ICdtb2Rlcm4nLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgICBQYWdlcyh7XG4gICAgICBkaXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBkaXI6ICdzcmMvcGFnZXMnLFxuICAgICAgICAgIGJhc2VSb3V0ZTogJ2NvbW1vbicsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkaXI6ICdzcmMvc2V0dXAvcGFnZXMnLFxuICAgICAgICAgIGJhc2VSb3V0ZTogJ3NldHVwJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpcjogJ3NyYy9wb3B1cC9wYWdlcycsXG4gICAgICAgICAgYmFzZVJvdXRlOiAncG9wdXAnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlyOiAnc3JjL29wdGlvbnMvcGFnZXMnLFxuICAgICAgICAgIGJhc2VSb3V0ZTogJ29wdGlvbnMnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlyOiAnc3JjL2NvbnRlbnQtc2NyaXB0L2lmcmFtZS9wYWdlcycsXG4gICAgICAgICAgYmFzZVJvdXRlOiAnaWZyYW1lJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBleHRlbmRSb3V0ZShyb3V0ZSwgcGFyZW50KSB7XG4gICAgICAgIGlmIChyb3V0ZS5wYXRoID09PSAnL2NvbW1vbi9sb2dpbicgfHwgcm91dGUucGF0aCA9PT0gJy9jb21tb24vcmVnaXN0ZXInKSB7XG4gICAgICAgICAgLy8gTGEgcm91dGUgcmFjaW5lIChcIi9cIikgbidleGlnZSBwYXMgZCdhdXRoZW50aWZpY2F0aW9uXG4gICAgICAgICAgcmV0dXJuIHJvdXRlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBam91dGVyIGxhIG1cdTAwRTl0YWRvbm5cdTAwRTllIGBhdXRoOiB0cnVlYCBcdTAwRTAgdG91dGVzIGxlcyBhdXRyZXMgcm91dGVzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ucm91dGUsXG4gICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgLi4ucm91dGUubWV0YSwgLy8gUHJcdTAwRTlzZXJ2ZSBsZXMgbVx1MDBFOXRhZG9ublx1MDBFOWVzIGV4aXN0YW50ZXNcbiAgICAgICAgICAgIGF1dGg6IHRydWUsICAgIC8vIEFqb3V0ZSBhdXRoIFx1MDBFMCB0cnVlIHBvdXIgaW5kaXF1ZXIgcXUndW5lIGF1dGhlbnRpZmljYXRpb24gZXN0IHJlcXVpc2VcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLFxuXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICAndnVlLXJvdXRlcicsXG4gICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICB7XG4gICAgICAgICAgJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCc6IFtbJyonLCAnYnJvd3NlciddXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBkdHM6ICdzcmMvdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgZGlyczogWydzcmMvY29tcG9zYWJsZXMvJywgJ3NyYy9zdG9yZXMvJywgJ3NyYy91dGlscy8nXSxcbiAgICAgIGVzbGludHJjOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIGZpbGVwYXRoOiAnc3JjL3R5cGVzLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJyxcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnLCAnc3JjL3BvcHVwL2xheW91dC8nXSxcbiAgICAgIC8vIGdlbmVyYXRlIGBjb21wb25lbnRzLmQudHNgIGZvciB0cyBzdXBwb3J0IHdpdGggVm9sYXJcbiAgICAgIGR0czogJ3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIC8vIGF1dG8gaW1wb3J0IGljb25zXG4gICAgICAgIEljb25zUmVzb2x2ZXIoKSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4taWNvbnNcbiAgICBJY29ucyh7XG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcbiAgICAgIGNvbXBpbGVyOiAndnVlMycsXG4gICAgICBzY2FsZTogMS41LFxuICAgIH0pLFxuICAgIC8vIHJld3JpdGUgYXNzZXRzIHRvIHVzZSByZWxhdGl2ZSBwYXRoXG4gICAge1xuICAgICAgbmFtZTogJ2Fzc2V0cy1yZXdyaXRlJyxcbiAgICAgIGVuZm9yY2U6ICdwb3N0JyxcbiAgICAgIGFwcGx5OiAnYnVpbGQnLFxuICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwsIHsgcGF0aCB9KSB7XG4gICAgICAgIGNvbnN0IGFzc2V0c1BhdGggPSByZWxhdGl2ZShkaXJuYW1lKHBhdGgpLCAnL2Fzc2V0cycpLnJlcGxhY2UoXG4gICAgICAgICAgL1xcXFwvZyxcbiAgICAgICAgICAnLydcbiAgICAgICAgKVxuICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC9cIlxcL2Fzc2V0c1xcLy9nLCBgXCIke2Fzc2V0c1BhdGh9L2ApXG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgaWZyYW1lOiAnc3JjL2NvbnRlbnQtc2NyaXB0L2lmcmFtZS9pbmRleC5odG1sJyxcbiAgICAgICAgcG9wdXA6ICdzcmMvcG9wdXAvaW5kZXguaHRtbCcsXG4gICAgICAgIHNldHVwOiAnc3JjL3NldHVwL2luZGV4Lmh0bWwnLFxuICAgICAgICBvcHRpb25zOiAnc3JjL29wdGlvbnMvaW5kZXguaHRtbCcsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsndnVlJywgJ0B2dWV1c2UvY29yZScsICd3ZWJleHRlbnNpb24tcG9seWZpbGwnXSxcbiAgICBleGNsdWRlOiBbJ3Z1ZS1kZW1pJ10sXG4gIH0sXG4gIGFzc2V0c0luY2x1ZGU6IFsnc3JjL2Fzc2V0cy8qLyoqJ10sXG4gIGRlZmluZSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21lc2FoL1Byb2pldHMvd29ya3Nob3AvcHVyaWZ5ci1leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL21lc2FoL1Byb2pldHMvd29ya3Nob3AvcHVyaWZ5ci1leHRlbnNpb24vZGVmaW5lLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9tZXNhaC9Qcm9qZXRzL3dvcmtzaG9wL3B1cmlmeXItZXh0ZW5zaW9uL2RlZmluZS5jb25maWcudHNcIjtpbXBvcnQgeyBzcGF3blN5bmMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuLy8gUmVhZCBDSEFOR0VMT0cubWQgZmlsZSBpbnRvIGEgc3RyaW5nLlxuY29uc3QgY2hhbmdlbG9nID0gZnMucmVhZEZpbGVTeW5jKCcuL0NIQU5HRUxPRy5tZCcsICd1dGYtOCcpXG5cbi8vIEdldCB0aGUgY3VycmVudCBnaXQgY29tbWl0IGhhc2guXG5jb25zdCBnaXRDb21taXQgPSBzcGF3blN5bmMoJ2dpdCcsIFsncmV2LXBhcnNlJywgJy0tc2hvcnQnLCAnSEVBRCddKVxuICAuc3Rkb3V0LnRvU3RyaW5nKClcbiAgLnRyaW0oKVxuXG5jb25zdCBqc24gPSAodmFsdWU6IHN0cmluZykgPT4gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG5cbi8vIERvbid0IGZvcmdldCB0byBhZGQgeW91ciBhZGRlZCB2YXJpYWJsZXMgdG8gdml0ZS1lbnYuZC50cyBhbHNvIVxuXG4vLyBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSBpbiB5b3VyIFZ1ZSBjb21wb25lbnRzIGFuZCB3aWxsIGJlIHJlcGxhY2VkIGJ5IHRoZWlyIHZhbHVlcyBhdCBidWlsZCB0aW1lLlxuLy8gVGhlc2Ugd2lsbCBiZSBjb21waWxlZCBpbnRvIHlvdXIgYXBwLiBEb24ndCBzdG9yZSBzZWNyZXRzIGhlcmUhXG5cbmV4cG9ydCBjb25zdCBkZWZpbmVWaXRlQ29uZmlnID0ge1xuICBfX1ZFUlNJT05fXzoganNuKHBhY2thZ2VKc29uLnZlcnNpb24pLFxuICBfX05BTUVfXzoganNuKHBhY2thZ2VKc29uLm5hbWUpLFxuICBfX0RJU1BMQVlfTkFNRV9fOiBqc24ocGFja2FnZUpzb24uZGlzcGxheU5hbWUpLFxuICBfX0NIQU5HRUxPR19fOiBqc24oY2hhbmdlbG9nKSxcbiAgX19HSVRfQ09NTUlUX186IGpzbihnaXRDb21taXQpLFxuICBfX0dJVEhVQl9VUkxfXzoganNuKHBhY2thZ2VKc29uLnJlcG9zaXRvcnkudXJsKSxcblxuICAvLyBTZXQgdGhlIEhUTUwgdGl0bGUgZm9yIGFsbCBwYWdlcyBmcm9tIHBhY2thZ2UuanNvbiBzbyB5b3UgY2FuIHVzZSAlSFRNTF9USVRMRSUgaW4geW91ciBIVE1MIGZpbGVzLlxuICAnaW1wb3J0Lm1ldGEuZW52LkhUTUxfVElUTEUnOiBqc24ocGFja2FnZUpzb24uZGlzcGxheU5hbWUpLFxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVSxTQUFTLFdBQVc7QUFDOVYsU0FBUyxnQkFBQUEscUJBQW9COzs7QUNEcVQsU0FBUyxzQkFBc0I7OztBQ0E3QyxTQUFTLFdBQVc7OztBQ0F4VjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFB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
