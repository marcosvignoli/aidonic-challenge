#!/usr/bin/env node

import fs from "fs";
import path from "path";

// Function to add .js extensions to imports in built files
function addJsExtensions(filePath) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");

  // Replace relative imports to add .js extension
  content = content.replace(/from ["'](\.[^"']+)["']/g, (match, importPath) => {
    if (importPath.endsWith(".js")) return match;
    return `from "${importPath}.js"`;
  });

  fs.writeFileSync(filePath, content);
}

// Add .js extensions to all built files
const distDir = path.join(__dirname, "dist");
const files = ["demo.js", "store.js", "index.js"];

files.forEach((file) => {
  const filePath = path.join(distDir, file);
  addJsExtensions(filePath);
  console.log(`✅ Added .js extensions to ${file}`);
});

console.log("🎉 Build post-processing complete!");
