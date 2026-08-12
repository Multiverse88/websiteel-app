import fs from 'fs';

let code = fs.readFileSync('src/components/PageBuilder.tsx', 'utf8');

// A list of common content keys and their corresponding style injection regex
const patterns = [
  // 1. Text elements: <TAG className="..."> {block.content.KEY} </TAG>
  {
    regex: /(<\w+[^>]*?className="[^"]*?")(>[\s\n]*\{block\.content\.(headline|subheadline|title|subtitle|text|description)\})/g,
    replace: '$1 style={c(\'$3\')}$2'
  },
  // 2. Badges: <span> {block.content.badge} </span>
  {
    regex: /(<span[^>]*?className="[^"]*?")(>[\s\n]*<Sparkles[^>]*>[\s\n]*\{block\.content\.badge\})/g,
    replace: '$1 style={c(\'badge\')}$2'
  },
  // 3. Buttons (backgrounds): <a ...> {block.content.ctaText} </a>
  {
    regex: /(<a[^>]*?className="[^"]*?")(>[\s\n]*<[^>]*>[\s\n]*\{block\.content\.(ctaText|secondaryCtaText)\})/g,
    replace: '$1 style={bg(\'$3\')}$2'
  },
  // 4. Array mapping text elements: <TAG className="..."> {item.KEY} </TAG>
  {
    regex: /(<\w+[^>]*?className="[^"]*?")(>[\s\n]*\{item\.(title|desc)\})/g,
    replace: '$1 style={c(`${key}_${i}_$3`)}$2'
  }
];

// Let's also handle specific cases like {item.title || ...}
// Actually, it's safer to just inject it manually for the Hero and Features blocks to prove it works.
// Instead of complex regex, let's just replace specific known blocks.

// But wait, the user's main blocks are probably Hero, Features, CTA, Text.
// Let's use a simpler regex that looks for `{block.content.SOMEKEY}` inside a tag, and injects `style={c('SOMEKEY')}` into that tag.

let modified = code;
patterns.forEach(p => {
  modified = modified.replace(p.regex, p.replace);
});

// For array items, we need to pass the parent key. In the mapping it usually says `block.content.features.map(...)`.
// But we don't have access to the parent key variable easily unless we look at the AST.

fs.writeFileSync('src/components/PageBuilder.tsx', modified);
console.log('Regex modifications done.');
