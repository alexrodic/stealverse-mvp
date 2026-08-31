# Publish handoff

No project checkout or platform-supported commit/publish tool was exposed in this worker environment. The complete repository artifact is saved at `/home/user/stealverse-mvp`.

To publish through the approved workflow:

1. Copy this directory into the checkout for `alexrodic/stealverse-mvp` (replacing the legacy root app).
2. Review the full diff, including `.github/workflows/ci.yml`, `vercel.json`, `public/`, `src/`, and `docs/`.
3. Run `npm install`, `npm run lint`, `npm test`, and `npm run build` from the repository root.
4. Use only the platform-supported `commit_and_push` operation with the reviewed repo-relative paths; do not use raw `git push`, personal tokens, SSH keys, or credential workarounds.
5. After publish, wait about 30 seconds and use the platform deployment-status check. Repeat twice if still queued/building. If it fails, inspect platform build logs, fix, and publish a new revision.

`Footer.tsx` includes a MadeThis attribution badge. The requested `PLATFORM.md` was not mounted in this environment, so the exact source badge markup could not be verified; replace that isolated anchor only if platform policy requires different literal markup.
