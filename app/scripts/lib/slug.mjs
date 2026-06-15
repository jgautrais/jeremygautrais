// Derive a stable id, category and human title from an illustration filename.
//
// Filenames are inconsistent (mixed `-` and `_` separators), e.g.
//   voxel-028_farewell_orange_funicular.jpg
//   vector_001_turntable.jpg
//   pixel_001-some_pixel_art.jpg
// All share the shape:  <category><sep><number><sep><rest>

const CATEGORIES = ["voxel", "vector", "pixel"];
const FILENAME = /^(voxel|vector|pixel)[-_](\d+)[-_](.+)$/;

// "farewell_orange_funicular" -> "Farewell orange funicular"
function toTitle(rest) {
  const words = rest.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// Returns { id, category, title } or null when the name does not match.
export function parseFilename(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  const match = base.match(FILENAME);
  if (!match) return null;

  const [, category, number, rest] = match;
  return {
    id: `${category}-${number}`,
    category,
    title: toTitle(rest),
  };
}

export { CATEGORIES };
