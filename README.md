# Storefront monorepo

A pnpm + Turborepo monorepo housing two independent Next.js storefronts that share a common base.

## Apps

| App | Path | Theme | Notes |
| --- | --- | --- | --- |
| **framies** | `apps/framies` | Dark automotive (near-black + racing red) | The original die-cast car-frame storefront |
| **aurora** | `apps/aurora` | Lighter charcoal variant | Clone of framies; diverges on theme, sections, and (later) logo + imagery |

Each app is fully self-contained (own `package.json`, `public/`, `src/`, config) and deploys as its own Vercel project.

## Tech stack

- **pnpm workspaces** + **Turborepo** (task orchestration/caching)
- **Next.js 16** (App Router, React 19, TypeScript, React Compiler)
- **Tailwind CSS v4** (CSS-first theming), **Framer Motion**, **shadcn/ui**

## Getting started

Prerequisites: Node 20+, pnpm 9+ (this repo pins pnpm via `packageManager`).

```bash
pnpm install            # install all workspace deps

# run one app
pnpm dev:framies        # -> http://localhost:3000
pnpm dev:aurora

# or run everything via turbo
pnpm dev                # all apps (turbo)
pnpm build              # build all apps
pnpm build:framies      # build one app
pnpm lint
```

## Structure

```
apps/
  framies/        # dark storefront (src/, public/, next.config.ts, ...)
  aurora/         # lighter clone
package.json      # workspace root (turbo scripts)
turbo.json        # task graph
pnpm-workspace.yaml
```

## Deploying two projects from this one repo (Vercel)

Create **two** Vercel projects, both connected to this same GitHub repo, each pointing at a different app directory:

**Project 1 - framies**
- New Project -> import this repo.
- **Root Directory:** `apps/framies`.
- Framework preset: **Next.js** (auto-detected).
- Install command: leave default (Vercel installs at the repo root, workspace-aware). Build: `next build` (default).

**Project 2 - aurora**
- New Project -> import the **same** repo again.
- **Root Directory:** `apps/aurora`.
- Same presets.

Notes:
- Vercel detects the pnpm workspace and installs from the repo root, then builds inside the selected Root Directory - each project ships only its own app.
- To avoid rebuilding an app when only the other changed, set each project's **Ignored Build Step** (Settings -> Git) to a `turbo-ignore`-style check, e.g. `npx turbo-ignore` (optional optimisation).
- Add each app's own env vars / domains per Vercel project.

## License

[MIT](./LICENSE)
