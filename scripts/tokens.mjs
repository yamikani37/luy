// Builds src/styles/tokens.css from design/tokens.json. Run: npm run tokens
// Any token with a "dark" value is redefined for dark mode (system setting, or the header toggle).
import { readFileSync, writeFileSync } from 'node:fs';

const t = JSON.parse(readFileSync(new URL('../design/tokens.json', import.meta.url), 'utf8'));
const ref = (v) => v.replace(/\{([\w-]+)\}/g, 'var(--$1)');
const groups = [t.color, t.spacing, t.radius, t.shadow, t.duration, t.easing];
const all = groups.flatMap((g) => g.tokens);
const line = (name, v) => `  --${name}: ${ref(v)};`;

const dark = all.filter((x) => x.dark).map((x) => '  ' + line(x.name, x.dark));
const darkBlock = ['    color-scheme: dark;', ...dark].join('\n');

const css = `/* Generated from design/tokens.json by scripts/tokens.mjs: edit the JSON, then run \`npm run tokens\`. */
:root {
  color-scheme: light;
${all.map((x) => line(x.name, x.value)).join('\n')}
  --font-display: ${t.type.families.display};
  --font-sans: ${t.type.families.sans};
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
${darkBlock}
  }
}
:root[data-theme='dark'] {
${darkBlock.replace(/^  /gm, '')}
}
`;
writeFileSync(new URL('../src/styles/tokens.css', import.meta.url), css);
console.log('tokens.css written');
