#!/bin/sh
# Xcode Cloud post-clone hook. The Next.js server is deployed separately, never from CI here.
# Bundled offline Counter Kit lives in ios-offline/. cap sync copies it into the binary.
set -eu
cd "$CI_PRIMARY_REPOSITORY_PATH"
if ! command -v node >/dev/null 2>&1; then
  export HOMEBREW_NO_AUTO_UPDATE=1 HOMEBREW_NO_INSTALL_CLEANUP=1
  brew install node@22
  export PATH="$(brew --prefix node@22)/bin:$PATH"
fi
node -v
npm ci --no-audit --no-fund
npm run type-check
npm test
npx cap sync ios
