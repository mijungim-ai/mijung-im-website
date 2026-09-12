<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment / git push policy

Never run `git push` on this repo unless the user explicitly requests it in that turn. Commit freely, but do not push automatically after committing.

**Why:** Netlify auto-deploys production on every push to `main`, and every deploy spends build credits from the team's monthly allowance. The allowance is small and shared: saving an entry in the CMS commits through DecapBridge and therefore also triggers a deploy, so the site's editors are drawing on the same budget. The plan has moved between tiers, so do not reason from a fixed number — check Netlify's Usage & billing page if the remaining budget matters to a decision.

**How to apply:**
- Commit-on-request is fine as before; push only when the user separately says so (e.g. "push해", "push it").
- When push is requested and multiple commits are sitting unpushed locally, push them all together in one `git push` rather than pushing after each commit — collapse what could be several deploys into as few as possible.
- A commit that cannot change the built site (AGENTS.md, README, comments) does not need a deploy of its own. Leave it committed locally and let it ride along with the next real change.
- If a change seems like it would benefit from being deployed, ask the user first rather than pushing proactively.
- Check `git fetch` and `git log origin/main..HEAD` before pushing: the CMS writes to `main` directly, so the branch is often diverged and the local commits need rebasing onto the remote first.

# Internal notes are not committed

`docs/`, `Mijung_IM_Content_Package_v1.md` and `Mijung_IM_Website_Status_Summary.md` are gitignored on purpose — they hold third-party contact details and the full project work log. Keep writing to them locally, but never `git add -f` them back in.
