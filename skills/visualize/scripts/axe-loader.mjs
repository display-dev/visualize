// Assemble the readable CommonJS graph as inline script, preserving the previous
// axe injection behavior on artifacts whose CSP permits only inline scripts.
import { readFileSync } from 'node:fs';

const directory = new URL('./vendor/axe/', import.meta.url);

export async function loadAxe(page) {
  const manifest = JSON.parse(readFileSync(new URL('./vendor/manifest.json', import.meta.url), 'utf8'));
  const names = Object.keys(manifest.files).filter(name => /^axe\/[a-z0-9-]+\.cjs$/.test(name)).map(name => name.slice(4)).sort();
  if (!names.includes('index.cjs')) throw new Error('Bundled axe entry is missing');
  const factories = names.map(name =>
    `${JSON.stringify(`./${name}`)}: function(module, exports, require) {\n${readFileSync(new URL(name, directory), 'utf8')}\n}`
  );
  // The registry is limited to the bundled graph. There is no filesystem or
  // network resolution in the browser; each CommonJS module initializes once.
  await page.addScriptTag({ content: `(() => {
    const modules = { ${factories.join(',\n')} };
    const cache = Object.create(null);
    function require(id) {
      if (!Object.prototype.hasOwnProperty.call(modules, id)) throw new Error('Unknown bundled axe module: ' + id);
      if (!cache[id]) {
        const module = { exports: {} };
        cache[id] = module;
        modules[id](module, module.exports, require);
      }
      return cache[id].exports;
    }
    require('./index.cjs');
  })();` });
}
