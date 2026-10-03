import fs from "fs";
import path from "path";

const rootDir = path.resolve(import.meta.dir, "..");
const rootPkgPath = path.join(rootDir, "package.json");
const distPkgPath = path.join(rootDir, "dist", "package.json");

const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf-8"));

// Prepare package.json for the release distribution
const distPkg: Record<string, any> = {
  name: rootPkg.name,
  version: rootPkg.version,
  private: rootPkg.private,
  type: rootPkg.type,
  main: "./index.js",
  module: "./index.js",
  types: "./index.d.ts",
  exports: {
    ".": {
      import: "./index.js",
      types: "./index.d.ts"
    }
  }
};

if (rootPkg.peerDependencies) {
  distPkg.peerDependencies = rootPkg.peerDependencies;
}

if (rootPkg.dependencies) {
  distPkg.dependencies = rootPkg.dependencies;
}

// Ensure dist directory exists
const distDir = path.join(rootDir, "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(distPkgPath, JSON.stringify(distPkg, null, 2) + "\n", "utf-8");
console.log("Successfully generated dist/package.json");
