# Nina’s OcuPathIF releases

Independent release repository: https://github.com/NinaGXie/ocupath-updates

Private application source and builders: https://github.com/NinaGXie/ocupathif_new

The original public release repository was copied with its Git history through
`bf7c62efc40f53c002f912d5cc003458eec9e2c3`. Its files, release records, rollback
snapshots and publication scripts are preserved unchanged under `archive/ivy/`.
That directory is historical reference, not the active publication configuration.
The import snapshot is also retained as branch `ivy-import-20261009`.

## Publication status

No Nina release has been published yet. GitHub Pages is not enabled, and the old
custom domain is not assigned here. Historical GitHub Release attachments and
COS objects are external to Git: they were not copied and must not be described
as Nina’s verified release assets.

Future metadata base: `https://ninagxie.github.io/ocupath-updates/ocupathif`.
Future installers: GitHub Releases in this repository. Before activating the
feed, build from Nina’s source repository, complete clean Windows/Mac acceptance,
upload verified artifacts here, generate Nina-only metadata and then enable Pages.
Never reuse the archived release IDs, signatures, hashes, CI evidence or rollback
authorities as evidence for a newly built package.

`node scripts/check-release-target.mjs` verifies repository ownership and config.
A local pre-push hook additionally rejects other destinations. To install that
hook after cloning this repository: `git config core.hooksPath .githooks`.
