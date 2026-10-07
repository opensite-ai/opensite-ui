import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

//-----------------------------------
// This script reads manifests of the components and then creates src/registry/block-loader.ts
// Each entry connects a block ID to a dynamic import and its named component export:
//-----------------------------------

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptsDirectory, "..");
const manifestsDirectory = path.join(scriptsDirectory, "manifests");
const manifests = fs
  .readdirSync(manifestsDirectory)
  .filter((name) => /^blocks-.*\.json$/.test(name))
  .sort();

const entries = [];
const seenIds = new Set();

for (const manifest of manifests) {
  const manifestPath = path.join(manifestsDirectory, manifest);
  const manifestEntries = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifestEntries)) {
    throw new Error(`Expected an array of blocks in ${manifestPath}`);
  }

  for (const entry of manifestEntries) {
    const id = path.posix.basename(entry.path);

    if (!/^[a-z0-9-]+$/.test(id)) {
      throw new Error(`Invalid block ID "${id}" in ${manifestPath}`);
    }
    if (seenIds.has(id)) {
      throw new Error(`Duplicate block ID in manifests: ${id}`);
    }
    if (
      typeof entry.exportName !== "string" ||
      !/^[A-Za-z_$][\w$]*$/.test(entry.exportName)
    ) {
      throw new Error(`Missing or invalid exportName for block "${id}"`);
    }

    const wrapperPath = path.join(repositoryRoot, "src", `${id}.ts`);
    if (!fs.existsSync(wrapperPath)) {
      throw new Error(`Missing block wrapper: ${wrapperPath}`);
    }

    seenIds.add(id);
    entries.push({ id, exportName: entry.exportName });
  }
}

const loaderEntries = entries
  .map(
    ({ id, exportName }) => `  "${id}": () =>
    import("../${id}").then(
      (module) => module.${exportName},
    ),`,
  )
  .join("\n");

const output = `const blockComponentRegistry: Record<string, React.ComponentType<any>> = {};

type BlockLoader = () => Promise<React.ComponentType<any>>;

// --------------------------------------
// Block loader registry for dynamic imports of React components
// Use explicit dynamic imports for each block to ensure proper bundling and named exports.
// import(\`../blocks/\${id}\`) would hide the targets from the bundler, would include an overly broad set of modules,
// and wouldn't match these wrappers’ named exports.
// --------------------------------------

const BLOCK_LOADERS: Record<string, BlockLoader> = {
${loaderEntries}
} satisfies Record<string, BlockLoader>;

//-----------------------------
// Load a block component dynamically based on its ID
// @param id The ID of the block to load
// @returns A promise that resolves to the React component for the block
// @throws An error if the block ID is unknown
// @example
// const MyBlock = await loadBlockComponent("link-page-grid-cards");
// MyBlock will now hold the dynamically imported React component for the specified block
// --------------------------------------
export async function loadBlockComponent(
  id: string,
): Promise<React.ComponentType<any>> {
  const loader = BLOCK_LOADERS[id]

  if (!loader) {
    throw new Error(\`Unknown block: \${id}\`);
  }
  return loader();
}
`;

const outputPath = path.join(repositoryRoot, "src/registry/block-loader.ts");
fs.writeFileSync(outputPath, output);
console.log(`Generated block loader for ${entries.length} blocks.`);
