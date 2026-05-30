export async function auth() {
  return { userId: null as string | null, sessionId: null as string | null }
}

export async function currentUser() {
  return null
}

export function clerkMiddleware(handler: unknown) {
  return handler
}

export function createRouteMatcher(_patterns: string[]) {
  return (_request: unknown) => false
}

export type WebhookEvent = never
