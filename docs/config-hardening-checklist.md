# Configuration hardening checklist

Reviewed October 2, 2026. Scope: the public Astro site and the separately deployed Vercel perks portal. Evidence comes from the current working tree at `7a96c57`, including existing uncommitted changes. This document records recommendations; it does not apply configuration changes.

The primary risks are guessing the shared portal code, exposing partner data through public files or caches, and deploying with incorrect credentials or environment settings. The shared code grants possession-based access; it does not identify or revoke individual users.

## Prioritized work

Unchecked items are recommendations or deployment checks, not claims that production is currently misconfigured.

- [ ] **High — Add login rate limiting across instances.** `apps/perks-portal/src/auth.mjs:35` stores eight failures per 15 minutes in an in-memory `Map`. Cold starts and separate instances have separate counters; at 10,000 entries it also stops recording new keys. The README acknowledges the process-local limit, but the repository contains no shared limiter configuration. Configure a platform rule for **POST `/perks/login`**, covering both the public proxy and direct portal entry points, or use a durable shared counter. Verify the actual client IP through the proxy before choosing the counting key. Vercel WAF supports path/method conditions and rate limiting, but its counters are regional; use shared storage if an exact global limit is required. Its current Hobby/Pro counting windows also stop at ten minutes, so an eight-per-15-minute policy needs an appropriate alternative. Start with logging, account for office/shared IPs, and then enforce a tested threshold. Correct the README's production route from `/login` to `/perks/login`. [Vercel rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting), [rule parameters](https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration).

- [ ] **High — Tighten portal credential validation.** `apps/perks-portal/src/auth.mjs:8` only checks a six-character code and a 32-character secret. Local probes confirmed that six spaces and a 32-space secret pass validation. A 257-character code also passes configuration validation even though `apps/perks-portal/src/server.mjs:99` rejects login inputs over 256 characters. Reject whitespace-only values and known placeholders, enforce the same code maximum at configuration and login, and use a randomly generated access code of at least 16 characters plus a session secret generated from at least 32 random bytes. Length checks alone cannot establish randomness. Reject malformed credentials rather than silently trimming them. **Migration:** establish compliant credentials before increasing minimum lengths; changing either credential invalidates existing sessions and changing the access code requires redistributing it to approved companies.

- [ ] **Medium — Validate the complete origin and port.** `apps/perks-portal/src/server.mjs:46` reduces `APP_ORIGIN` to `.origin`. Probes confirmed that URLs containing credentials, a path, query, or fragment are accepted and those components are silently discarded. Require an absolute HTTPS origin with no embedded credentials, non-root path, query, or fragment in production. Preserve HTTP loopback support for development. Validate `PORT` as an integer from 1 to 65535 in `apps/perks-portal/scripts/dev.mjs` and `apps/perks-portal/scripts/start.mjs`; current `Number(...)` conversion permits confusing empty/invalid inputs. **Migration:** normalize existing settings to `APP_ORIGIN=https://www.886studios.com` and `PORT=4186` before stricter validation ships. Preserve the documented root-mounted development mode and validated `/perks` production base path.

- [ ] **Medium — Add a release configuration preflight.** The portal build validates the private catalog but does not check runtime credentials or origin/base-path settings. Bad credentials produce a safe 503 after deployment, which still makes the portal unavailable. Add a separate preflight that validates required runtime configuration, reports variable names without values, and confirms the deployment targets `886-studios-perks` with `/perks`. Keep secrets out of the build artifact. Both runtime entry points should use the same validation. **Migration:** retain the current fail-closed request behavior and allow fixture-only/local builds without production credentials.

- [ ] **Medium — Align Node versions.** The root requires `>=22.12.0 <23`, `.nvmrc` selects 22, and the portal function declares `nodejs22.x`; the portal package permits every newer Node major. Align its supported range and installation enforcement with Node 22. This session's executable is Node 26.10.0, so its test results do not establish Node 22 compatibility. **Migration:** select Node 22 before reinstalling or running release validation; retain the root lockfile and `npm ci` workflow. The portal currently has no dependencies, so its missing lockfile is not itself a risk.

- [ ] **Medium — Make the portal release gate explicit.** GitHub runs portal tests, but `apps/perks-portal/vercel.json` builds with `npm run build`, and a manually prepared prebuilt artifact can bypass those tests. Require `npm --prefix apps/perks-portal run validate` on the exact release commit, with the securely supplied private catalog, before publishing its artifact. Add an artifact check that only the server function contains `private/catalog.json`, and that `.env*`, development credentials, and source snapshots are absent. Confirm `.vercel/project.json` points to the perks project before a release. **Migration:** keep private data out of public CI artifacts and use synthetic catalog fixtures for ordinary pull requests.

- [ ] **Medium — Expand configuration regression checks.** `scripts/check-security.mjs:7` reads the first CSP rather than validating every effective header rule. Existing proxy tests check no-store and indexing exclusions but do not establish deployed CDN/rewrite behavior. Cover required portal CSP directives, all cache-control layers, rewrite caching, HSTS, and cookie scope. After changes, check both proxy and direct portal responses, including authenticated HTML, errors, and redirects; use synthetic data and credentials for automated checks. Preserve the existing public-site allowance for inline styles unless the dependent styling has been migrated.

## Environment inventory and intended settings

| Setting | Current default / use | Hardening requirement |
| --- | --- | --- |
| `PERKS_ACCESS_CODE` | Blank template; runtime requires at least six characters | Required portal Secret; random code, recommended minimum 16 characters, maximum 256. Share only with approved companies. |
| `PERKS_SESSION_SECRET` | Blank template; runtime requires at least 32 characters | Required portal Secret generated from at least 32 random bytes. Keep it server-side and separate from the access code. |
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

## Validation and limits

Ran the existing configuration/privacy/authentication suites:

```sh
node --test tests/analytics-configuration.test.mjs tests/indexnow-configuration.test.mjs tests/perks-privacy.test.mjs apps/perks-portal/tests/*.test.mjs
```

Result: **27 passed, 0 failed, 1 skipped**, on Node **26.10.0**. The skipped test requires the absent ignored private catalog. Additional dummy-credential probes reproduced the whitespace, overlong-code, and origin-normalization gaps without using production credentials.

Secret review inventoried 417 tracked paths, checked non-binary current files up to 5 MB for common private-key/API-token signatures, and scanned 1,294 selected text blobs reachable from local Git refs. It also checked exact matches for two local credentials without printing their values. No matches were found. This is a bounded local scan; it does not establish the absence of secrets in remote-only history, logs, deployment artifacts, unscanned formats, or other accounts.

Live environment values, firewall settings, branch protection, response headers, deployment aliases, and private release artifacts were not inspected. A fresh production build, Node 22 release validation, and dependency advisory audit were not performed. The private catalog and portal project link are absent from this checkout, so they must be supplied securely before validating a real portal release.
