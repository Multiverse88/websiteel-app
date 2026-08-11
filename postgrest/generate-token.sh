#!/bin/bash
# Generate JWT token untuk PostgREST CRUD access
# Usage: PGRST_JWT_SECRET=xxx ./generate-token.sh [role]
# Role: anon (default) atau writer
#
# SECURITY (2026-08-11): this used to hardcode the actual signing secret —
# that secret was committed to git and must be treated as leaked/rotated.
# Never hardcode a real secret here again; pass it via env var instead.

ROLE=${1:-writer}
if [ -z "$PGRST_JWT_SECRET" ]; then
  echo "Error: set PGRST_JWT_SECRET env var first (matches PostgREST's jwt-secret)." >&2
  exit 1
fi
SECRET="$PGRST_JWT_SECRET"

# Header
HEADER=$(echo -n '{"alg":"HS256","typ":"JWT"}' | openssl dgst -sha256 -hmac "$SECRET" -binary | base64 | tr '+/' '-_' | tr -d '=')

# Payload (role = postgrest_writer untuk CRUD)
PAYLOAD=$(echo -n "{\"role\":\"postgrest_${ROLE}\"}" | openssl dgst -sha256 -hmac "$SECRET" -binary | base64 | tr '+/' '-_' | tr -d '=')

# Signature
SIGNATURE=$(echo -n "${HEADER}.${PAYLOAD}" | openssl dgst -sha256 -hmac "$SECRET" -binary | base64 | tr '+/' '-_' | tr -d '=')

TOKEN="${HEADER}.${PAYLOAD}.${SIGNATURE}"

echo "============================================"
echo "  PostgREST JWT Token ($ROLE)"
echo "============================================"
echo ""
echo "Token:"
echo "$TOKEN"
echo ""
echo "Usage:"
echo "  curl -H 'Authorization: Bearer $TOKEN' \\"
echo "    'https://admin.easylegal.my.id/db/Article?limit=5'"
echo ""
echo "Or save to file:"
echo "  export PGRST_JWT=$TOKEN"
echo "  curl -H 'Authorization: Bearer \$PGRST_JWT' \\"
echo "    'https://admin.easylegal.my.id/db/Article?limit=5'"
