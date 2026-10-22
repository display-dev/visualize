// Keep dependency cycles in one chunk. Packing arbitrary module IDs changes
// CommonJS initialization order; pack dependency-ordered SCCs instead.
export function readableChunks(entry, root) {
  let assignments;
  return (id, { getModuleIds, getModuleInfo }) => {
    if (!assignments) {
      const ids = [...getModuleIds()].filter(id => !getModuleInfo(id).isExternal).sort();
      const indices = new Map(), low = new Map(), active = new Set(), stack = [], components = [];
      let next = 0;
      function visit(id) {
        indices.set(id, next); low.set(id, next++); stack.push(id); active.add(id);
        const info = getModuleInfo(id);
        for (const child of [...info.importedIds, ...info.dynamicallyImportedIds].sort()) {
          if (getModuleInfo(child)?.isExternal) continue;
          if (!indices.has(child)) { visit(child); low.set(id, Math.min(low.get(id), low.get(child))); }
          else if (active.has(child)) low.set(id, Math.min(low.get(id), indices.get(child)));
        }
        if (low.get(id) === indices.get(id)) {
          const component = [];
          let child;
          do { child = stack.pop(); active.delete(child); component.push(child); } while (child !== id);
          components.push(component.sort());
        }
      }
      for (const id of ids) if (!indices.has(id)) visit(id);
      assignments = new Map();
      let group = 0, bytes = 0;
      for (const component of components) {
        const size = component.reduce((sum, id) => sum + Buffer.byteLength((getModuleInfo(id).code ?? '').replaceAll(root, '<build>')), 0);
        if (bytes && bytes + size > 50_000) { group++; bytes = 0; }
        for (const id of component) {
          // Keep the public entry filename stable, including its cycle if any.
          assignments.set(id, component.includes(entry) ? 'index' : `chunk-${String(group).padStart(3, '0')}`);
        }
        bytes += size;
      }
    }
    return assignments.get(id);
  };
}
