// PostgREST JWT Token Generator
// Usage: PGRST_JWT_SECRET=xxx node generate-token.js [role]
// Role: anon (default) atau writer
//
// SECURITY (2026-08-11): this used to hardcode the actual signing secret —
// that secret was committed to git and must be treated as leaked/rotated.
// Never hardcode a real secret here again; pass it via env var instead.

const crypto = require('crypto');

const SECRET = process.env.PGRST_JWT_SECRET;
if (!SECRET) {
  console.error('Error: set PGRST_JWT_SECRET env var first (matches PostgREST\'s jwt-secret).');
  process.exit(1);
}
const role = process.argv[2] || 'writer';

function base64url(buf) {
  return buf.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const header = base64url(Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
const payload = base64url(Buffer.from(JSON.stringify({ role: `postgrest_${role}` })));
const signature = base64url(
  crypto.createHmac('sha256', SECRET)
    .update(`${header}.${payload}`)
    .digest()
);

const token = `${header}.${payload}.${signature}`;

console.log('============================================');
console.log(`  PostgREST JWT Token (${role})`);
console.log('============================================');
console.log('');
console.log('Token:');
console.log(token);
console.log('');
console.log('Usage (curl):');
console.log(`  curl -H "Authorization: Bearer ${token}" \\`);
console.log(`    "https://admin.easylegal.my.id/db/Article?limit=5"`);
console.log('');
console.log('CRUD Examples:');
console.log('');
console.log('# READ (GET):');
console.log(`  curl -H "Authorization: Bearer ${token}" \\`);
console.log(`    "https://admin.easylegal.my.id/db/Article?select=id,slug,title&limit=5"`);
console.log('');
console.log('# CREATE (POST):');
console.log(`  curl -X POST -H "Authorization: Bearer ${token}" \\`);
console.log(`    -H "Content-Type: application/json" \\`);
console.log(`    -H "Prefer: return=representation" \\`);
console.log(`    -d '{"slug":"test","title":"Test","excerpt":"Excerpt","content":"Content","category":"Pajak","coverImage":"","readTime":"5 min"}' \\`);
console.log(`    "https://admin.easylegal.my.id/db/Article"`);
console.log('');
console.log('# UPDATE (PATCH):');
console.log(`  curl -X PATCH -H "Authorization: Bearer ${token}" \\`);
console.log(`    -H "Content-Type: application/json" \\`);
console.log(`    -d '{"title":"Updated Title"}' \\`);
console.log(`    "https://admin.easylegal.my.id/db/Article?slug=eq.test"`);
console.log('');
console.log('# DELETE:');
console.log(`  curl -X DELETE -H "Authorization: Bearer ${token}" \\`);
console.log(`    "https://admin.easylegal.my.id/db/Article?slug=eq.test"`);
