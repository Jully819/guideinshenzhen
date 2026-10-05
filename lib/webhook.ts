/**
 * One POST to whatever MESSAGES_WEBHOOK_URL / INQUIRY_WEBHOOK_URL points at.
 *
 * ORIGIN AND REFERER ARE SENT ON PURPOSE. FormSubmit (the current email relay)
 * refuses any request without them — "make sure you open this page through a
 * web server" — and a server-side fetch sends neither by default. Slack,
 * Discord and Zapier ignore both, so sending them costs nothing elsewhere.
 *
 * A 200 IS NOT ALWAYS A YES. FormSubmit answers 200 with `success: "false"`
 * when it rejects a message, so the body is checked too. Treating that as
 * delivered would show the visitor a tick for a message nobody receives.
 */
export async function postWebhook(
  url: string,
  payload: Record<string, unknown>,
  request: Request,
): Promise<{ ok: boolean; status: number; detail?: string }> {
  const origin =
    request.headers.get("origin") || new URL(request.url).origin;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      origin,
      referer: `${origin}/`,
    },
    body: JSON.stringify(payload),
    // Without this a hung webhook holds the request open until the platform
    // kills it, and the visitor watches a spinner for the whole timeout.
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) return { ok: false, status: response.status };

  const body = await response.json().catch(() => null);
  if (body && (body.success === false || body.success === "false")) {
    return {
      ok: false,
      status: response.status,
      detail: typeof body.message === "string" ? body.message : undefined,
    };
  }

  return { ok: true, status: response.status };
}
