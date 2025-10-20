// utils/diffAndHelpers.ts
type Patch = Record<string, any>;

const isPlainObject = (v: any) =>
  v !== null && typeof v === 'object' && !Array.isArray(v);

/**
 * Recursively remove `_id` fields from any object or objects inside arrays.
 */
function deepStripIds<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => deepStripIds(item)) as unknown as T;
  }
  if (isPlainObject(value)) {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value as Record<string, any>)) {
      if (k === '_id') continue; // skip _id
      out[k] = deepStripIds(v);
    }
    return out as T;
  }
  return value;
}

/**
 * Produces a patch mapping dot-paths to new values.
 * - Recurses into plain objects.
 * - Treats arrays as whole replacements.
 * - When comparing arrays of objects, strips `_id` from elements for comparison.
 * - When adding arrays to patch, the array stored in the patch has all `_id` removed recursively.
 */
export function diffObjects(oldObj: any, newObj: any, basePath = ''): Patch {
  const patch: Patch = {};

  const add = (path: string, value: any) => {
    patch[path] = value;
  };

  if (isPlainObject(oldObj) && isPlainObject(newObj)) {
    const keys = new Set([
      ...Object.keys(oldObj || {}),
      ...Object.keys(newObj || {}),
    ]);

    for (const key of keys) {
      const oldV = (oldObj || {})[key];
      const newV = (newObj || {})[key];
      const path = basePath ? `${basePath}.${key}` : key;

      // both plain objects -> recurse
      if (isPlainObject(oldV) && isPlainObject(newV)) {
        const nested = diffObjects(oldV, newV, path);
        Object.assign(patch, nested);
        continue;
      }

      // arrays -> treat as whole replacement; ignore _id fields inside for comparison
      if (Array.isArray(oldV) || Array.isArray(newV)) {
        const oldArr = Array.isArray(oldV) ? oldV : [];
        const newArr = Array.isArray(newV) ? newV : [];

        // strip _id for comparison
        const cleanedOld = deepStripIds(oldArr);
        const cleanedNew = deepStripIds(newArr);

        if (JSON.stringify(cleanedOld) !== JSON.stringify(cleanedNew)) {
          // add cleanedNew (no _id anywhere inside) to patch
          add(path, cleanedNew);
        }
        continue;
      }

      // primitives / other types
      if (oldV !== newV) add(path, newV);
    }

    return patch;
  }

  // root-level comparison (non-object or arrays)
  if (JSON.stringify(oldObj) !== JSON.stringify(newObj)) {
    add(basePath || '', newObj);
  }

  return patch;
}

/**
 * Convert a dot-path patch { "a.b": val, "c": val2 } into a nested object
 * { a: { b: val }, c: val2 }
 *
 * This returns a shallow-merged nested object. If you have overlapping keys,
 * deeper keys are merged as objects.
 */
export function dotPatchToNested(patch: Patch): Record<string, any> {
  const out: Record<string, any> = {};

  for (const [dotPath, value] of Object.entries(patch)) {
    if (!dotPath) {
      // replace root
      return value;
    }
    const parts = dotPath.split('.');
    let curr = out;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (i === parts.length - 1) {
        curr[p] = value;
      } else {
        if (!isPlainObject(curr[p])) curr[p] = {};
        curr = curr[p];
      }
    }
  }

  return out;
}

export function patchToSet(patch: Patch): Record<string, any> {
  // if patch is empty
  if (!patch || Object.keys(patch).length === 0) return {};

  // if patch contains root replacement (key === ''), then the value is the new root object
  if (Object.prototype.hasOwnProperty.call(patch, '')) {
    const rootVal = patch[''];
    if (rootVal && typeof rootVal === 'object' && !Array.isArray(rootVal)) {
      // convert top-level keys into dot-set entries
      const setObj: Record<string, any> = {};
      for (const [k, v] of Object.entries(rootVal)) {
        setObj[k] = v;
      }
      return setObj;
    } else {
      // root is non-object (rare) — then you probably want to replace the document; return as-is under a top-level key
      return { root: rootVal };
    }
  }

  // Normal case: patch already uses dot-paths -> return as $set body
  return { ...patch };
}