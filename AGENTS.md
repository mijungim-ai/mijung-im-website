<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment / git push policy

Never run `git push` on this repo unless the user explicitly requests it in that turn. Commit freely, but do not push automatically after committing.

**Why:** Netlify auto-deploys production on every push to `main`. Each deploy costs 15 credits, and the free plan caps out at 20 deploys/month — an unrequested push can burn a meaningful chunk of the monthly budget in one action.

**How to apply:**
- Commit-on-request is fine as before; push only when the user separately says so (e.g. "push해", "push it").
- When push is requested and multiple commits are sitting unpushed locally, push them all together in one `git push` rather than pushing after each commit — collapse what could be several deploys into as few as possible.
- If a change seems like it would benefit from being deployed, ask the user first rather than pushing proactively.
