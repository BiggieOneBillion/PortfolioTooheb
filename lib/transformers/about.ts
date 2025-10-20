// utils/patchUtils.ts
type Patch = Record<string, any>;

const isPlainObject = (v: any) =>
  v !== null && typeof v === 'object' && !Array.isArray(v);

/**
 * Recursively remove `_id` from any object or objects in arrays.
 */
export function deepStripIds<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => deepStripIds(item)) as unknown as T;
  }
  if (isPlainObject(value)) {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value as Record<string, any>)) {
      if (k === '_id') continue;
      out[k] = deepStripIds(v);
    }
    return out as T;
  }
  return value;
}

/**
 * Produce dot-path -> value patch.
 * - Skips any key named "_id" (root or nested).
 * - Arrays are compared after deepStripIds, and if different the cleaned array (no _id) is put in the patch.
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
      if (key === '_id') continue; // NEVER consider _id

      const oldV = (oldObj || {})[key];
      const newV = (newObj || {})[key];
      const path = basePath ? `${basePath}.${key}` : key;

      // both plain objects -> recurse
      if (isPlainObject(oldV) && isPlainObject(newV)) {
        const nested = diffObjects(oldV, newV, path);
        Object.assign(patch, nested);
        continue;
      }

      // arrays -> compare cleaned (no _id), store cleaned new value if changed
      if (Array.isArray(oldV) || Array.isArray(newV)) {
        const oldArr = Array.isArray(oldV) ? oldV : [];
        const newArr = Array.isArray(newV) ? newV : [];

        const cleanedOld = deepStripIds(oldArr);
        const cleanedNew = deepStripIds(newArr);

        if (JSON.stringify(cleanedOld) !== JSON.stringify(cleanedNew)) {
          add(path, cleanedNew); // cleanedNew has no _id anywhere inside
        }
        continue;
      }

      // primitives / different types
      if (oldV !== newV) add(path, newV);
    }

    return patch;
  }

  // root-level simple compare (rare)
  if (JSON.stringify(oldObj) !== JSON.stringify(newObj)) {
    add(basePath || '', newObj);
  }

  return patch;
}

/**
 * Convert the dot-path patch into a $set object for MongoDB.
 * - Filters out any path targeting `_id` (defensive).
 * - Optionally attach updatedAt if provided.
 */
export function patchToSet(patch: Patch, opts?: { includeUpdatedAt?: boolean }) {
  const setObj: Record<string, any> = {};

  for (const [k, v] of Object.entries(patch || {})) {
    // skip any attempt to set _id (top-level or nested)
    if (k === '_id' || k.startsWith('_id.') || k.includes('._id')) continue;
    if (k === '') {
      // root-replace: expand top-level keys rather than setting the root object
      if (isPlainObject(v)) {
        Object.assign(setObj, v);
      } else {
        // unusual: non-object root replacement — skip (or handle explicitly if you want)
      }
      continue;
    }
    setObj[k] = v;
  }

  if (opts?.includeUpdatedAt) {
    setObj['updatedAt'] = new Date();
  }

  return setObj;
}