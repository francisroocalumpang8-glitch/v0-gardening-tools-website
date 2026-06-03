// Placeholder for v0's "Built with v0" badge-injection step.
//
// v0 normally generates this file inside its own build environment. When this
// repository is deployed directly to Vercel, the configured Build Command
//   node .v0/inject-built-with-v0.mjs && next build
// fails with MODULE_NOT_FOUND because the file isn't present.
//
// This no-op satisfies that command so the real `next build` runs. It injects
// nothing and has no side effects. If you instead change the Vercel Build
// Command back to plain `next build`, this file is no longer needed.
console.log("[v0] inject-built-with-v0: no-op (direct Vercel deploy)");
