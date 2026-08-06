#!/bin/bash
# Generate JWT token untuk PostgREST CRUD access
# Usage: ./generate-token.sh [role]
# Role: anon (default) atau writer

ROLE=${1:-writer}
SECRET="9012f916ba100fe8949e530f1f4eb5f088cacdaf128189486efa4116b4813ece"

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
