# Repository ownership

User instruction (2026-10-09): all changes must remain in NinaGXie repositories.
Source: NinaGXie/ocupathif_new. Releases: NinaGXie/ocupath-updates.
Never push, publish, change settings or otherwise write to any Yuqian1017 repository.
Never publish to Ivy’s updates.ocupath.ai domain or COS bucket.

`archive/ivy/` and `ivy-import-20261009` preserve imported historical state.
Do not execute the archived publication/rollback scripts against their old targets.
Do not rewrite historical release evidence to pretend it validates Nina’s packages.
Use release-config.json for current ownership. New binaries require fresh testing,
hashes, signing/notarization evidence and own-repository release IDs before release.
Keep Pages inactive until Nina’s real artifacts and update metadata are verified.

Before publishing any platform, run `scripts/verify-candidate.mjs` with the Nina
source checkout, that platform's native acceptance report and expected full source
commit. Review the native evidence, not only the exit code. Pending/failed cases
block publication. After staging accepted assets, verify public downloads and
endpoint responses before activating the production feed or announcing release.
