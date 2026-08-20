#!/bin/bash
PACKAGES=(
  "@cacheable/utils"
  "@hubsync/web-sdk-react"
  "@nebula.js/nucleus"
  "@ornikar/babel-preset-base"
  "@ornikar/babel-preset-kitt-universal"
  "@ornikar/babel-preset-react"
  "@ornikar/browserslist-config"
  "@ornikar/commitlint-config"
  "@ornikar/eslint-config-babel"
  "@ornikar/eslint-config-react"
  "@ornikar/eslint-config-typescript"
  "@ornikar/eslint-config-typescript-react"
  "@ornikar/eslint-plugin-neverthrow"
  "@ornikar/eslint-plugin-ornikar"
  "@ornikar/graphql-config"
  "@ornikar/intl-config"
  "@ornikar/kitt2"
  "@ornikar/monorepo-config"
  "@ornikar/postcss-config"
  "@ornikar/prettier-config"
  "@ornikar/prismic-components"
  "@ornikar/react-modern-calendar-datepicker"
  "@ornikar/react-native-svg-transformer"
  "@ornikar/renovate-config"
  "@ornikar/repo-config-react"
  "@ornikar/repo-config-react-legacy-css"
  "@ornikar/rollup-plugin-postcss"
  "@ornikar/stylelint-config"
  "@ornikar/typed-css-modules-loader"
  "@qlik/embed-react"
  "@qlik/embed-runtime"
  "@qlik/embed-web-components"
  "@qlik/runtime-module-loader"
  "@thiennq/docs-viewer"
  "babel-plugin-linaria-css-to-undefined"
  "cache-manager"
  "cacheable-request"
  "http-metrics-middleware"
  "keyv"
  "picasso-plugin-q"
  "pob-test-package-in-monorepo"
)

FOUND=0
for pkg in "${PACKAGES[@]}"; do
  # check in package-lock.json
  if grep -r -l "\"$pkg\"" apps/web/package-lock.json package-lock.json 2>/dev/null; then
    echo "WARNING: Found $pkg"
    FOUND=1
  fi
done

if [ $FOUND -eq 0 ]; then
  echo "SAFE: No malicious packages found in package-lock.json"
fi
