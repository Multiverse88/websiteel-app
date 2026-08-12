const fs = require('fs');
let code = fs.readFileSync('src/components/PageBuilder.tsx', 'utf8');

// 1. Add `c` and `bg` helpers inside SortableBlock right after `paddingStyle`
if (!code.includes('const c = (key: string) =>')) {
  code = code.replace(/const paddingStyle = {[\s\S]*?} as React\.CSSProperties;/m, `$&
  
  const c = (key: string) => block.styles?.colors?.[key] ? { color: block.styles.colors[key] } : {};
  const bg = (key: string) => block.styles?.colors?.[key] ? { backgroundColor: block.styles.colors[key], borderColor: block.styles.colors[key] } : {};`);
}

// Write it back
fs.writeFileSync('src/components/PageBuilder.tsx', code);
console.log('Helpers injected.');
