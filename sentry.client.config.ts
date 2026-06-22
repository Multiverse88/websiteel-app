// Sentry client disabled completely to reduce bundle size
// If you need error tracking, use a lighter alternative or enable selectively
if (process.env.NODE_ENV === "production") {
  // Client-side Sentry disabled for performance
  // Errors are still captured on the server side via sentry.server.config.ts
}