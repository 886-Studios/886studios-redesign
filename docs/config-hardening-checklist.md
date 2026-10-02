# Configuration hardening checklist

Reviewed October 2, 2026. Scope: the public Astro site and the separately deployed Vercel perks portal. Evidence comes from the current working tree at `7a96c57`, including existing uncommitted changes. The original audit recommendations are below; the implementation status records the subsequent compatibility-focused changes.

The primary risks are guessing the shared portal code, exposing partner data through public files or caches, and deploying with incorrect credentials or environment settings. The shared code grants possession-based access; it does not identify or revoke individual users.

## Implementation status — October 2, 2026

The requested implementation was narrowed to preserve existing behavior. No production
credentials were changed and no new service, firewall rule, or deployment was created.

- [x] **Close the local login race.** The handler reads the bounded body before checking
  the counter, then checks the code and updates failures without an intervening await.
  Concurrent requests cannot pass a stale count. Successful login still resets failures.
  A full 10,000-key table now blocks untracked keys until capacity is available.
- [ ] **Add login rate limiting across instances.** The limiter remains process-local.
  A shared store or platform rule still needs provisioning and verification on both
  **POST `/perks/login`** entry points. Verify the real counting key through the proxy,
  evaluate shared-office traffic in logging mode, then enforce the chosen policy.
  No Redis dependency was added to an existing deployment. See [Vercel rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting).
- [x] **Add stronger credential checks to release preflight.** It rejects whitespace,
  control characters, known placeholders, access codes outside 16–256 characters, and
  session secrets outside 43–512 base64/base64url/hex-compatible characters. Generate
  secrets from at least 32 random bytes; format checks cannot prove randomness.
  Runtime and form validation now share the same 256-character code maximum.
- [ ] **Activate stronger credential minimums at runtime after coordinated rotation.**
  Runtime keeps the existing six-character code and 32-character secret minimums so
  current valid credentials and sessions remain compatible. It does not yet enforce
  preflight's whitespace/placeholder rules. Before adopting the release gate, supply
  compliant credentials, redistribute a changed code to approved companies, and retire
  old deployments. Changing either credential invalidates existing sessions.
- [x] **Validate complete origins and ports.** Production accepts only a complete HTTPS
  origin with no embedded credentials, non-root path, query, or fragment; local dev
  permits loopback HTTP. Both scripts validate decimal integer ports from 1 to 65535.
  Existing defaults remain `https://www.886studios.com`, `/perks`, and `4186`; explicitly
  empty base paths still support root-mounted deployments. Normalize malformed existing
  settings before release. Runtime configuration errors produce a safe 503.
- [x] **Add a separate release preflight.** `npm run preflight` validates runtime settings,
  stronger credentials, Node 22, and the local `.vercel/project.json` name/IDs for
  `886-studios-perks`, with `/perks` and the production origin. It rejects conflicting
  environment project/org IDs and prints variable names without values. It does not
  query Vercel or prove a stale link still names the correct remote project.
- [x] **Align Node versions.** The portal now uses `>=22.12.0 <23`, its own `.nvmrc`, and
  `engine-strict=true`. The function still targets `nodejs22.x`; no dependency or root
  lockfile change was needed. Tests were run on Node 22.23.3.
- [x] **Keep production checks separate from fixture builds.** `npm run validate:release`
  runs preflight, tests, and build. Existing `build` and `validate` commands do not require
  production credentials. A synthetic build test verifies the packaged runtime/login
  flow and checks that development credentials, environment files, and source snapshots
  are absent from the output. Only the function contains the synthetic private catalog.
- [ ] **Verify live release and response settings.** Supply the real private catalog and
  portal project link securely, run `validate:release` on the intended release commit,
  and verify remote project identity, cookie scope, all cache-control layers, CSP, HSTS,
  rewrite behavior, and direct/proxy access. The real catalog is absent in this checkout.

## Implementation verification

On Node **22.23.3**:

```sh
node --test --test-reporter=spec apps/perks-portal/tests/*.test.mjs tests/*.test.mjs
```

**72 passed, 0 failed, 1 skipped.** The skipped test needs the absent real private catalog.
The passing tests cover concurrent login attempts, capacity exhaustion, legacy credentials,
session behavior, strict preflight rejection/redaction, origin/port validation, a synthetic
portal build, packaged production login, and the public-site regression suite. No live
production configuration or private catalog was used.

## Environment inventory and intended settings

| Setting | Current default / use | Hardening requirement |
| --- | --- | --- |
| `PERKS_ACCESS_CODE` | Blank template; runtime permits 6–256 characters | Required portal Secret; release preflight requires 16–256 characters and rejects malformed values. Share only with approved companies. |
| `PERKS_SESSION_SECRET` | Blank template; runtime requires at least 32 characters | Required portal Secret generated from at least 32 random bytes; release preflight requires at least 43 encoded characters. Keep it server-side and separate from the access code. |
| `APP_ORIGIN` | Runtime fallback `https://www.886studios.com` | Set explicitly in production; validate the entire origin. Use the actual preview origin for separately scoped preview credentials. |
| `APP_BASE_PATH` | `/perks` in production entry points; empty in development | Set `/perks` explicitly for the proxied deployment. Preserve intentional root-mounted local/test support. |
| `PORT` | `4186` for portal scripts | Local/standalone configuration only; integer validation. Both scripts bind to `127.0.0.1`. |
| `PROD`, `VERCEL`, `VERCEL_ENV` | All must indicate Vercel production before public analytics are included | Use platform flags; avoid copying production flags into local configuration. No portal analytics. |
| Four `*_SITE_VERIFICATION` variables | Optional public ownership meta tags; Google has a public fallback | Public configuration, not credentials. Production ownership settings do not need rotation as secrets. |
| `INDEXNOW_SITE_URL` | `https://www.886studios.com` | Retain HTTPS origin validation and same-origin submission checks. |
| `INDEXNOW_ENDPOINT` | `https://api.indexnow.org/indexnow` | Retain HTTPS validation, 15-second timeout, and redirect rejection. Set overrides only for an intended endpoint; HTTPS alone does not establish endpoint trust. |
| `INDEXNOW_KEY_FILE`, `INDEXNOW_KEY` | `public/indexnow-key.txt`; optional exported key override | Public ownership proof; retain traversal/symlink checks and published-key matching. These CLI settings are not loaded automatically from `.env`. |
| Local `LUMA_API_KEY` | Present in ignored root `.env`; no reference found in audited source/scripts | Check whether another workflow still uses it; remove the local copy and revoke at the provider if obsolete. The documented event sync uses public feeds. |
| Local `VERCEL_OIDC_TOKEN` | Present in ignored root `.env.local` | Treat as a credential; retain local exclusion and keep it out of logs, shared archives, and browser code. |

## Platform checks and secret handling

These require inspecting the deployed projects; repository configuration cannot prove their current state.

- [ ] Confirm the portal credentials use Vercel's **Secret** type (existing Sensitive variables continue to work), scoped to the perks project and required environments. Use separate credentials and synthetic catalog data for previews; restrict previews containing real partner data. Vercel Secrets are write-only after saving. [Vercel Secret variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables).
- [ ] Confirm the public site's project has no portal credentials or partner catalog, and that portal secrets are never emitted into public HTML, JavaScript, URLs, telemetry, or build logs. The local development script intentionally prints its development-only access code; exclude those logs from shared artifacts.
- [ ] Verify active firewall rules on every reachable login entry point, including direct deployment URLs, and verify counting behavior through the public rewrite.
- [ ] Verify the branch protection represented by `.github/main-branch-protection.json` is actually enabled, including the required GitHub and Vercel statuses. The committed template alone does not apply it.
- [ ] Treat the portal's `.vercel/output` as confidential: the server function legitimately contains the private catalog. Store the catalog and artifact backups with restricted access; git-ignore does not protect copies placed in shared ZIPs or CI artifacts.
- [ ] Maintain a credential rotation procedure: generate replacements securely, update the portal environment, deploy a new release, verify new login and rejection of old sessions, then retire accessible old deployments/aliases containing the previous configuration. Vercel environment changes affect new deployments, not existing ones. [Vercel environment variables](https://vercel.com/docs/environment-variables).
- [ ] If a real credential or partner redemption code is exposed, revoke/rotate it at its issuer first, then remove exposed copies and assess access. Removing a Git file alone does not revoke a credential. No confirmed exposure was found by this audit, so no exposure-driven rotation was performed.

## Existing controls to preserve

- [x] Public-site installation uses `npm ci` and a committed lockfile; `.npmrc` enforces supported engines.
- [x] Both GitHub workflows pin actions to commit SHAs. Ordinary validation has read-only permissions and checkout credential persistence disabled. The event-sync job's write permissions support its documented publication flow.
- [x] Public scripts are external; CSP rejects inline JavaScript and eval. Root response configuration includes HSTS, framing restrictions, nosniff, referrer, and permissions policies.
- [x] Portal login fails closed when credentials or catalog data are missing. Authentication uses signed, HTTP-only, SameSite=Strict, Secure production cookies with seven-day expiry and `/perks` scope.
- [x] Portal forms require the configured same origin; request bodies are capped at 2 KB, and login inputs are capped at 256 characters.
- [x] Portal HTML is configured as private/no-store across browser and CDN controls. Only allowlisted files under the portal's `public/` directory are served without authentication; the catalog stays behind access checks. No-index headers cover errors and authenticated responses. Public builds and IndexNow submissions reject portal references.
- [x] Environment files, portal private files, and Vercel output are ignored. No real `.env`, private catalog, development credentials, or Vercel artifacts were tracked in the current tree or found in the relevant local path history.

## Original audit validation and limits

Ran the existing configuration/privacy/authentication suites:

```sh
node --test tests/analytics-configuration.test.mjs tests/indexnow-configuration.test.mjs tests/perks-privacy.test.mjs apps/perks-portal/tests/*.test.mjs
```

Result: **27 passed, 0 failed, 1 skipped**, on Node **26.10.0**. The skipped test requires the absent ignored private catalog. Additional dummy-credential probes reproduced the whitespace, overlong-code, and origin-normalization gaps without using production credentials.

Secret review inventoried 417 tracked paths, checked non-binary current files up to 5 MB for common private-key/API-token signatures, and scanned 1,294 selected text blobs reachable from local Git refs. It also checked exact matches for two local credentials without printing their values. No matches were found. This is a bounded local scan; it does not establish the absence of secrets in remote-only history, logs, deployment artifacts, unscanned formats, or other accounts.

Live environment values, firewall settings, branch protection, response headers, deployment aliases, and private release artifacts were not inspected. At audit time, a fresh production build, Node 22 validation, and dependency advisory audit had not been performed. See the implementation verification above for the later Node 22 and synthetic-build results. The private catalog and portal project link are absent from this checkout, so they must be supplied securely before validating a real portal release.
